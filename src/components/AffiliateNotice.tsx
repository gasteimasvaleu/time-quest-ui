import { DiaText } from "@/components/ui/dia-text-reveal";

const AffiliateNotice = () => {
  return (
    <section className="bg-background px-4 pt-4 md:px-8 md:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center gap-4 rounded-[40px] border border-border bg-white/70 backdrop-blur-xl shadow-lg px-6 py-5 md:px-10 md:py-6">
          <div className="w-full text-center">
            <h2 className="text-base font-semibold md:text-lg">
              <DiaText
                text="Já faz parte do programa de afiliados"
                textColor="hsl(var(--foreground))"
                duration={1.6}
                triggerOnView
                once
              />
            </h2>
            <p className="mt-1 text-sm md:text-base">
              <DiaText
                text="Se você já se cadastrou, seu acesso ao programa de afiliados começa automaticamente — sem burocracia e sem taxa de adesão. Convide amigos, compartilhe seu link e receba comissão sempre que alguém criar uma conta pelo seu convite."
                textColor="hsl(var(--muted-foreground))"
                duration={1.8}
                delay={0.5}
                triggerOnView
                once
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateNotice;
