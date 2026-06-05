import { useState } from "react";
import { Play, X } from "lucide-react";

const VIDEO_URL =
  "https://zyhmwcsfifdepqnnrguo.supabase.co/storage/v1/object/public/criativos/500reais_storie.mp4";

const ImageShowcase = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-background px-4 py-4 md:px-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
          <div className="relative w-full overflow-hidden rounded-2xl">
            <img
              src="https://zyhmwcsfifdepqnnrguo.supabase.co/storage/v1/object/public/criativos/0217792196146522b8720b6d986e81ce95e9b006de0a2cb27ba73_0.jpeg"
              alt="We Diet — destaque"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
            <div className="hidden md:block absolute inset-x-0 bottom-0 bg-black/75 backdrop-blur-md text-white md:px-6 md:py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-bold tracking-wide uppercase text-[hsl(330_100%_65%)] drop-shadow">
                    🎉 Novidade
                  </p>
                  <p className="text-base font-medium leading-snug text-white drop-shadow">
                    Baixe o app e participe dos quizzes — o 1º lugar leva{" "}
                    <span className="font-bold text-[hsl(330_100%_65%)]">R$ 500</span> em prêmio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Assistir vídeo
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden mt-4 rounded-2xl bg-black/85 text-white px-4 py-4">
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-wide uppercase text-[hsl(330_100%_65%)]">
                🎉 Novidade
              </p>
              <p className="text-sm font-medium leading-snug text-white">
                Baixe o app e participe dos quizzes — o 1º lugar leva{" "}
                <span className="font-bold text-[hsl(330_100%_65%)]">R$ 500</span> em prêmio.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              Assistir vídeo
            </button>
          </div>
        </div>

      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-[min(90vw,calc(85vh*9/16))] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={VIDEO_URL}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageShowcase;
