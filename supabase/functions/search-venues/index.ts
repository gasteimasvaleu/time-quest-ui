import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { generateObject } from "npm:ai";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { z } from "npm:zod";

const BodySchema = z.object({
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().max(30).optional(),
});

const AiSchema = z.object({
  summary: z.string(),
  nextSteps: z.array(z.string()).max(4),
  items: z
    .array(
      z.object({
        candidateIndex: z.number(),
        whyMatched: z.string(),
        confidence: z.enum(["alta", "média", "baixa"]),
      }),
    )
    .max(8),
});

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: Record<string, string>;
};

type Candidate = {
  name: string;
  category: string;
  address: string;
  website?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  sourceUrl: string;
  source: string;
};

const MATCH_REGEX = "swing|liberal|priv[eê]|casais|adult[oa]|sensual|fetiche|fetish|lifestyle";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function buildAddress(tags: Record<string, string>) {
  return [
    tags["addr:street"],
    tags["addr:housenumber"],
    tags["addr:suburb"],
    tags["addr:city"],
    tags["addr:state"],
  ]
    .filter(Boolean)
    .join(", ");
}

async function geocodeCity(city: string, state = "") {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "br");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", `${city}${state ? `, ${state}` : ""}, Brasil`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "SexandoSearch/1.0 (contato@sexando.com.br)",
      "Accept-Language": "pt-BR,pt;q=0.9",
    },
  });

  if (!response.ok) throw new Error("Não foi possível localizar a cidade.");
  const places = await response.json();
  const place = places?.[0];
  if (!place?.boundingbox || !place?.lat || !place?.lon) return null;

  let [south, north, west, east] = place.boundingbox.map((value: string) => Number(value));
  const lat = Number(place.lat);
  const lon = Number(place.lon);

  if (Math.abs(north - south) > 2.5 || Math.abs(east - west) > 2.5) {
    south = lat - 0.7;
    north = lat + 0.7;
    west = lon - 0.7;
    east = lon + 0.7;
  }

  return {
    label: place.display_name as string,
    bbox: `${south},${west},${north},${east}`,
  };
}

async function fetchOverpass(bbox: string) {
  const query = `[out:json][timeout:18];
(
  nwr["name"~"${MATCH_REGEX}",i](${bbox});
  nwr["brand"~"${MATCH_REGEX}",i](${bbox});
  nwr["description"~"${MATCH_REGEX}",i](${bbox});
  nwr["club"~"swing|liberal",i](${bbox});
);
out center tags 60;`;

  const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
  let lastError: unknown;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!response.ok) throw new Error(`Overpass ${response.status}`);
      return ((await response.json()).elements ?? []) as OverpassElement[];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Busca pública indisponível.");
}

function toCandidates(elements: OverpassElement[]) {
  const seen = new Set<string>();
  const candidates: Candidate[] = [];

  for (const element of elements) {
    const tags = element.tags ?? {};
    const name = tags.name?.trim();
    if (!name) continue;

    const address = buildAddress(tags);
    const key = `${name.toLowerCase()}-${address.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const lat = element.lat ?? element.center?.lat;
    const lon = element.lon ?? element.center?.lon;
    candidates.push({
      name,
      category: tags.amenity ?? tags.leisure ?? tags.club ?? tags.tourism ?? "local",
      address,
      website: tags.website ?? tags["contact:website"],
      phone: tags.phone ?? tags["contact:phone"],
      lat,
      lon,
      source: "OpenStreetMap",
      sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    });
  }

  return candidates.slice(0, 12);
}

async function rankWithAi(city: string, placeLabel: string, candidates: Candidate[]) {
  if (candidates.length === 0) {
    return {
      summary: `Não encontrei resultados públicos compatíveis para ${city}.`,
      nextSteps: ["Tente buscar por uma cidade maior próxima.", "Confira redes sociais e avaliações antes de visitar."],
      items: [],
    };
  }

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("LOVABLE_API_KEY não configurado");

  const gateway = createOpenAICompatible({
    name: "lovable-ai",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": key },
  });

  const { object } = await generateObject({
    model: gateway("google/gemini-3-flash-preview"),
    schema: AiSchema,
    system:
      "Você organiza resultados de busca públicos para adultos +18. Use somente os candidatos fornecidos, não invente nomes, endereços, telefones nem links. Não escreva conteúdo sexual explícito.",
    prompt: JSON.stringify({
      city,
      placeLabel,
      candidates: candidates.map((candidate, index) => ({
        index,
        name: candidate.name,
        category: candidate.category,
        address: candidate.address,
        hasWebsite: Boolean(candidate.website),
        hasPhone: Boolean(candidate.phone),
      })),
      task: "Selecione e ordene até 8 candidatos mais relevantes para casas de swing, clubes liberais ou locais adultos consensuais. Explique o motivo de cada correspondência em português do Brasil.",
    }),
  });

  return object;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido" }, 405);

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Informe uma cidade válida." }, 400);

    const { city, state } = parsed.data;
    const place = await geocodeCity(city, state);
    if (!place) return json({ error: "Cidade não encontrada no Brasil." }, 404);

    const candidates = toCandidates(await fetchOverpass(place.bbox));
    let ai;
    try {
      ai = await rankWithAi(city, place.label, candidates);
    } catch (error) {
      console.error("search-venues ai fallback", error);
      ai = {
        summary: candidates.length
          ? `Encontrei ${candidates.length} resultado(s) público(s) possivelmente relacionado(s) a ${city}.`
          : `Não encontrei resultados públicos compatíveis para ${city}.`,
        nextSteps: ["Confirme horários, regras e avaliações antes de visitar.", "Use apenas locais para maiores de 18 anos."],
        items: candidates.map((_, candidateIndex) => ({
          candidateIndex,
          whyMatched: "O nome ou a descrição pública contém termos relacionados à busca.",
          confidence: "baixa" as const,
        })),
      };
    }

    const results = ai.items
      .map((item) => {
        const candidate = candidates[item.candidateIndex];
        if (!candidate) return null;
        return { ...candidate, whyMatched: item.whyMatched, confidence: item.confidence };
      })
      .filter(Boolean);

    return json({
      city: place.label,
      summary: ai.summary,
      nextSteps: ai.nextSteps,
      sourceNote: "Busca em dados públicos do OpenStreetMap/Overpass, organizada por Lovable AI.",
      results,
      searchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("search-venues error", error);
    return json({ error: error instanceof Error ? error.message : "Erro inesperado na busca." }, 500);
  }
});