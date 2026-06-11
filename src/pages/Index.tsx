import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedMarqueeHero from "@/components/AnimatedMarqueeHero";
import Footer from "@/components/Footer";

const NEW_IMAGES: string[] = [
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%284%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%283%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01%20%283%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01%20%282%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_00%20%283%29.png",
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
