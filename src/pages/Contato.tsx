import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WedietChat from "@/components/WedietChat";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="relative mx-auto mb-3 h-32 md:h-40 w-32 md:w-40">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
              style={{ animationDelay: "1s" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
              style={{ animationDelay: "2s" }}
            />
            <img
              src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/cubo.png"
              alt="Wediet"
              className="relative z-10 h-full w-full object-contain [animation:float_3s_ease-in-out_infinite,pink-pulse_2s_ease-in-out_infinite] transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
          </div>
          <p className="text-muted-foreground">
            Converse com nosso assistente e tire suas dúvidas em segundos.
          </p>
        </div>
        <WedietChat />
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
