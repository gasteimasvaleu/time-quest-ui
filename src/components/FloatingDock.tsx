import { useEffect, useRef, useState } from "react";

import { GlassDock, GlassFilter, type DockIcon } from "@/components/ui/glass-dock";

const InstagramImg = (
  <img
    src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/logoinsta.png"
    alt="Instagram"
    className="w-12 h-12 object-contain"
  />
);

const WhatsAppImg = (
  <img
    src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/logowhatsapp.png"
    alt="WhatsApp"
    className="w-12 h-12 object-contain"
  />
);

const FacebookImg = (
  <img
    src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/logoface.png"
    alt="Facebook"
    className="w-12 h-12 object-contain"
  />
);

const YoutubeImg = (
  <img
    src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/logoyoutube.png"
    alt="YouTube"
    className="w-12 h-12 object-contain"
  />
);

const ICONS: DockIcon[] = [
  { icon: InstagramImg, label: "Instagram", href: "https://www.instagram.com/sexandoapp/" },
  { icon: WhatsAppImg, label: "WhatsApp", href: "https://wa.me/5583999187322" },
  { icon: FacebookImg, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590681752833" },
  { icon: YoutubeImg, label: "YouTube", href: "https://youtube.com/@wediet" },
];


const ANCHOR_ID = "floating-dock-anchor";
const DOCK_HEIGHT = 84; // approx dock height (icons 56 + padding)

export const FloatingDockAnchor = () => (
  <div id={ANCHOR_ID} style={{ height: DOCK_HEIGHT }} aria-hidden />
);

export const FloatingDock = () => {
  const [dockedTop, setDockedTop] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const anchor = document.getElementById(ANCHOR_ID);
      if (!anchor) {
        setDockedTop(null);
        return;
      }
      const rect = anchor.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // If the anchor's top is above the bottom of the viewport, dock it there
      if (rect.top + DOCK_HEIGHT <= viewportH) {
        setDockedTop(rect.top + window.scrollY);
      } else {
        setDockedTop(null);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDocked = dockedTop !== null;

  return (
    <>
      <GlassFilter />
      <div
        className="pointer-events-none z-50 flex justify-center"
        style={
          isDocked
            ? {
                position: "absolute",
                top: dockedTop!,
                left: 0,
                right: 0,
              }
            : {
                position: "fixed",
                bottom: "1rem",
                left: 0,
                right: 0,
              }
        }
      >
        <div className="pointer-events-auto">
          <GlassDock icons={ICONS} />
        </div>
      </div>
    </>
  );
};

export default FloatingDock;
