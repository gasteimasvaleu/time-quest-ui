import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";

const STORAGE_KEY = "promo_premium_1000_seen";

const PromoModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setOpen(next);
  };

  const handleCta = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
    window.location.href = "https://app.sexando.com/signup";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[480px] overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-0 shadow-2xl backdrop-blur-xl">
        {/* Accent header */}
        <div className="relative bg-[hsl(330,100%,50%)] px-6 py-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Crown className="h-8 w-8" />
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-white/90">
            Oferta de Lançamento
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            1 ano de Premium
            <br />
            <span className="text-white">100% Grátis</span>
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[hsl(330,100%,50%)]/10 px-4 py-2 text-sm font-semibold text-[hsl(330,100%,50%)]">
            <Sparkles className="h-4 w-4" />
            Apenas para os primeiros 1.000 cadastros
          </div>

          <p className="mb-6 text-base leading-relaxed text-muted-foreground">
            Garanta agora sua assinatura{" "}
            <span className="font-semibold text-foreground">Premium por 1 ano</span>{" "}
            sem pagar nada. As vagas são limitadas e estão acabando rápido!
          </p>

          <Button
            size="lg"
            onClick={handleCta}
            className="w-full rounded-full bg-[hsl(330,100%,50%)] text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[hsl(330,100%,45%)]"
          >
            Garantir meu Premium grátis
          </Button>

          <button
            onClick={() => handleOpenChange(false)}
            className="mt-4 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Agora não, obrigado
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoModal;
