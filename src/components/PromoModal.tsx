import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "promo_premium_1000_seen";
const PROMO_IMAGE =
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1781534343140_bab57d59.jpg";

const PromoModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
    return undefined;
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
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[480px] overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-0 shadow-2xl backdrop-blur-xl">
        <img
          src={PROMO_IMAGE}
          alt="Oferta de lançamento: 1 ano de Premium grátis"
          className="h-auto w-full object-cover"
        />

        <div className="px-6 pb-6 pt-4">
          <p className="mb-4 text-center text-sm font-medium text-foreground">
            Os primeiros{" "}
            <span className="font-bold text-[hsl(330,100%,50%)]">1.000 cadastros</span>{" "}
            ganham assinatura{" "}
            <span className="font-bold text-[hsl(330,100%,50%)]">Premium grátis</span>!
          </p>

          <Button
            size="lg"
            onClick={handleCta}
            className="w-full rounded-full bg-[hsl(330,100%,50%)] text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[hsl(330,100%,45%)]"
          >
            Quero Conhecer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoModal;
