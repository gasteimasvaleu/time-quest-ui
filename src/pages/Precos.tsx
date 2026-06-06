import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SquishyPricing } from "@/components/ui/squishy-pricing";
import { Typewriter } from "@/components/ui/typewriter";
import { WebGLShader } from "@/components/ui/webgl-shader";

const Precos = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Typewriter Hero */}
      <section className="pt-12 pb-6 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            <Typewriter
              text={[
                "Sexando – Escolha seu plano",
                "Conexões sem limites",
                "Desbloqueie tudo com o Premium",
              ]}
              speed={60}
              waitTime={2000}
              deleteSpeed={30}
              cursorClassName="ml-1 text-accent"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Comece grátis e descubra tudo o que o Sexando oferece. Quando quiser mais, o Premium libera mensagens ilimitadas, visitantes sem blur, modo incógnito e acesso total a Hot or Not, Livecam e AI Avatar.
          </p>
        </div>
      </section>


      {/* Pricing Cards */}
      <section className="relative pt-2 pb-16 px-4 overflow-hidden bg-white">
        <WebGLShader className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SquishyPricing />

          {/* Payment Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              💳 Pagamento 100% seguro • 🔒 Dados criptografados • 🔄 Cancele quando quiser
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Precos;
