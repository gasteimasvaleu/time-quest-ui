import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="bg-background px-4 py-4 md:min-h-screen md:py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Container with rounded background */}
        <div 
          className="relative overflow-hidden rounded-[40px] px-6 py-8 md:px-12 md:py-12 border border-gray-200"
          style={{
            backgroundImage: 'url(https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Main Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">

            {/* Headline */}
            <h1 className="mb-4 text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up">
              <span className="text-foreground">Analise sua refeição. </span>
              <span className="text-accent">Melhore sua alimentação. </span>
              <span className="text-foreground">Viva sua melhor versão.</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-6 text-lg text-muted-foreground md:text-xl animate-fade-in-up">
              Wediet ajuda você a escanear alimentos, acompanhar macros e conquistar seus objetivos de dieta com inteligência artificial e praticidade. a escanear alimentos, acompanhar macros e conquistar seus objetivos de dieta com inteligência artificial e praticidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
              <Button 
                size="lg" 
                onClick={() => setModalOpen(true)}
                className="bg-[hsl(330,100%,50%)] text-white hover:bg-[hsl(330,100%,45%)] hover:scale-105 transition-all shadow-lg border-2 border-[hsl(330,100%,50%)]"
              >
                Monte sua Dieta Grátis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setVideoModalOpen(true)}
                className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Assistir Demo
              </Button>
            </div>

            {/* Lead Capture Modal */}
            <LeadCaptureModal open={modalOpen} onOpenChange={setModalOpen} />

            {/* Video Demo Modal */}
            <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
              <DialogContent className="sm:max-w-md p-0 bg-black border-none overflow-hidden">
                <div className="aspect-[9/16] w-full max-h-[80vh]">
                  <video
                    src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0409.mp4"
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
