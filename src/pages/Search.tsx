import { FormEvent, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Building2, ExternalLink, Loader2, MapPin, Navigation, Phone, Search as SearchIcon, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

type SearchResult = {
  name: string;
  category: string;
  address?: string;
  website?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  source: string;
  sourceUrl: string;
  whyMatched: string;
  confidence: "alta" | "média" | "baixa";
};

type SearchResponse = {
  city: string;
  summary: string;
  nextSteps: string[];
  sourceNote: string;
  results: SearchResult[];
};

const SEARCH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wediet-chat?mode=search-venues`;
const CITY_SUGGESTIONS = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Brasília"];

const confidenceClass: Record<SearchResult["confidence"], string> = {
  alta: "border-accent/30 bg-accent/10 text-accent",
  média: "border-border bg-secondary text-secondary-foreground",
  baixa: "border-border bg-muted text-muted-foreground",
};

const MATCH_REGEX = "swing|liberal|priv[eê]|casais|adult[oa]|sensual|fetiche|fetish|lifestyle";

const buildAddress = (tags: Record<string, string>) =>
  [tags["addr:street"], tags["addr:housenumber"], tags["addr:suburb"], tags["addr:city"], tags["addr:state"]]
    .filter(Boolean)
    .join(", ");

const searchPublicData = async (city: string, state: string): Promise<SearchResponse> => {
  const geocodeUrl = new URL("https://nominatim.openstreetmap.org/search");
  geocodeUrl.searchParams.set("format", "jsonv2");
  geocodeUrl.searchParams.set("addressdetails", "1");
  geocodeUrl.searchParams.set("countrycodes", "br");
  geocodeUrl.searchParams.set("limit", "1");
  geocodeUrl.searchParams.set("q", `${city}${state ? `, ${state}` : ""}, Brasil`);

  const geocodeResponse = await fetch(geocodeUrl, { headers: { "Accept-Language": "pt-BR,pt;q=0.9" } });
  if (!geocodeResponse.ok) throw new Error("Não foi possível localizar a cidade.");
  const place = (await geocodeResponse.json())?.[0];
  if (!place?.boundingbox || !place?.lat || !place?.lon) throw new Error("Cidade não encontrada no Brasil.");

  let [south, north, west, east] = place.boundingbox.map((value: string) => Number(value));
  const lat = Number(place.lat);
  const lon = Number(place.lon);
  if (Math.abs(north - south) > 2.5 || Math.abs(east - west) > 2.5) {
    south = lat - 0.7;
    north = lat + 0.7;
    west = lon - 0.7;
    east = lon + 0.7;
  }

  const bbox = `${south},${west},${north},${east}`;
  const query = `[out:json][timeout:18];
(
  nwr["name"~"${MATCH_REGEX}",i](${bbox});
  nwr["brand"~"${MATCH_REGEX}",i](${bbox});
  nwr["description"~"${MATCH_REGEX}",i](${bbox});
  nwr["club"~"swing|liberal",i](${bbox});
);
out center tags 30;`;

  const overpassResponse = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!overpassResponse.ok) throw new Error("Busca pública indisponível no momento.");
  const elements = ((await overpassResponse.json()).elements ?? []) as Array<{
    type: "node" | "way" | "relation";
    id: number;
    lat?: number;
    lon?: number;
    center?: { lat?: number; lon?: number };
    tags?: Record<string, string>;
  }>;

  const seen = new Set<string>();
  const results = elements.flatMap((element): SearchResult[] => {
    const tags = element.tags ?? {};
    const name = tags.name?.trim();
    if (!name) return [];
    const address = buildAddress(tags);
    const key = `${name.toLowerCase()}-${address.toLowerCase()}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      name,
      category: tags.amenity ?? tags.leisure ?? tags.club ?? tags.tourism ?? "local",
      address,
      website: tags.website ?? tags["contact:website"],
      phone: tags.phone ?? tags["contact:phone"],
      lat: element.lat ?? element.center?.lat,
      lon: element.lon ?? element.center?.lon,
      source: "OpenStreetMap",
      sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      whyMatched: "O nome ou a descrição pública contém termos relacionados à busca.",
      confidence: "baixa",
    }];
  }).slice(0, 8);

  return {
    city: place.display_name,
    summary: results.length ? `Encontrei ${results.length} resultado(s) público(s) possivelmente relacionado(s) a ${city}.` : `Não encontrei resultados públicos compatíveis para ${city}.`,
    nextSteps: ["Confirme horários, regras e avaliações antes de visitar.", "Use apenas locais para maiores de 18 anos."],
    sourceNote: "Busca em dados públicos do OpenStreetMap/Overpass.",
    results,
  };
};

const Search = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SearchResponse | null>(null);

  const runSearch = async (event?: FormEvent) => {
    event?.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ city: trimmedCity, state: state.trim() }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error ?? "Não foi possível concluir a busca.");
      setData(payload);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado na busca.");
    } finally {
      setIsLoading(false);
    }
  };

  const chooseCity = (suggestion: string) => {
    setCity(suggestion);
    setData(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Busca com IA para adultos 18+
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal text-foreground md:text-6xl">
                Encontre casas de swing por cidade
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                A IA consulta dados públicos, organiza possíveis locais liberais no Brasil e mostra fontes para você conferir antes de visitar.
              </p>
            </div>

            <form onSubmit={runSearch} className="rounded-2xl border border-border bg-card/80 p-4 shadow-card backdrop-blur-xl md:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_120px_auto]">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Cidade</span>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Ex: São Paulo"
                      className="h-12 rounded-full pl-10"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">UF</span>
                  <Input
                    value={state}
                    onChange={(event) => setState(event.target.value.toUpperCase().slice(0, 2))}
                    placeholder="SP"
                    className="h-12 rounded-full text-center uppercase"
                    maxLength={2}
                  />
                </label>

                <div className="flex items-end">
                  <Button type="submit" disabled={!city.trim() || isLoading} className="h-12 w-full rounded-full px-6 md:w-auto">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
                    Buscar
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {CITY_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => chooseCity(suggestion)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </form>

            <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/70 p-4 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p>
                Resultados vêm de fontes públicas e podem estar incompletos. Confirme endereço, horários, regras da casa e avaliações oficiais.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-card backdrop-blur-xl md:p-6">
            {isLoading ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
                <p className="text-lg font-semibold text-foreground">Buscando dados públicos e organizando com IA...</p>
              </div>
            ) : data ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent">{data.results.length} resultado(s)</p>
                  <h2 className="text-2xl font-bold text-foreground">{data.city}</h2>
                  <p className="text-sm leading-6 text-muted-foreground">{data.summary}</p>
                </div>

                {data.results.length > 0 ? (
                  <div className="space-y-3">
                    {data.results.map((result) => {
                      const mapsUrl = result.lat && result.lon ? `https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lon}` : undefined;
                      return (
                        <article key={`${result.name}-${result.sourceUrl}`} className="rounded-2xl border border-border bg-background p-4 shadow-sm">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{result.category}</span>
                              </div>
                              <h3 className="text-xl font-bold text-foreground">{result.name}</h3>
                            </div>
                            <span className={cn("w-fit rounded-full border px-3 py-1 text-xs font-semibold", confidenceClass[result.confidence])}>
                              confiança {result.confidence}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-muted-foreground">{result.whyMatched}</p>

                          {result.address && (
                            <div className="mt-3 flex items-start gap-2 text-sm text-foreground">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{result.address}</span>
                            </div>
                          )}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {mapsUrl && (
                              <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                                <Navigation className="h-4 w-4" />
                                Mapa
                              </a>
                            )}
                            {result.website && (
                              <a href={result.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                                <ExternalLink className="h-4 w-4" />
                                Site
                              </a>
                            )}
                            {result.phone && (
                              <a href={`tel:${result.phone}`} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                                <Phone className="h-4 w-4" />
                                Ligar
                              </a>
                            )}
                            <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                              Fonte
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-secondary/70 p-6 text-center">
                    <p className="font-semibold text-foreground">Nenhum local público encontrado nessa cidade.</p>
                    <p className="mt-2 text-sm text-muted-foreground">Tente uma cidade maior próxima ou pesquise pelo nome de clubes conhecidos.</p>
                  </div>
                )}

                <div className="rounded-2xl border border-border bg-secondary/70 p-4">
                  <p className="text-sm font-semibold text-foreground">Próximos passos</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {data.nextSteps.map((step) => (
                      <li key={step}>• {step}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">{data.sourceNote}</p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <div className="rounded-full bg-accent/10 p-5 text-accent">
                  <SearchIcon className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Escolha uma cidade</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    A busca retorna locais encontrados em dados públicos e usa IA para organizar os resultados mais relevantes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Search;