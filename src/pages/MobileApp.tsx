import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const MobileApp = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const enterFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (e) {
        setIsFullscreen(true);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4 relative"
      onClick={!isFullscreen ? enterFullscreen : undefined}
    >
      <div className="w-full max-w-md">
        <Card className="w-full aspect-[9/16] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021775500722877f6ba3ba09f8d739ff3017972d8947b2e885ecb_0.jpeg')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, white 0%, white 10%, rgba(255,255,255,0.6) 25%, transparent 40%)"
            }}
          />
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 px-6">
            <a href="https://apps.apple.com/app/we-diet/id6761124021" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-black text-white hover:bg-black/90 rounded-full py-6 text-base font-semibold">
                Baixar na AppleStore
              </Button>
            </a>
            <Button
              className="w-full bg-black text-white hover:bg-black/90 rounded-full py-6 text-base font-semibold"
              onClick={() => setVideoOpen(true)}
            >
              Assista ao Vídeo
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black border-none">
          <div className="aspect-video w-full">
            {videoOpen && (
              <video
                src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0406%20(1).mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileApp;
