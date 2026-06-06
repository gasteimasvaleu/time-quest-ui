import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedMarqueeHero from "@/components/AnimatedMarqueeHero";
import Footer from "@/components/Footer";

const NEW_IMAGES: string[] = [
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737102775_a4b4cc65.png",
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737297788_9ae4deb1.png",
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737282298_1295dcd7.png",
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737305187_005ba697.png",
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737403309_e1068cf9.png",
  "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737447556_0510a572.png",
];

const MARQUEE_IMAGES: string[] = [...NEW_IMAGES, ...NEW_IMAGES];

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <AnimatedMarqueeHero images={MARQUEE_IMAGES} />

      <Footer />
    </main>
  );
};

export default Index;
