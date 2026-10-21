import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AffiliateNotice from "@/components/AffiliateNotice";
import PartnerBanner from "@/components/PartnerBanner";
import AnimatedMarqueeHero from "@/components/AnimatedMarqueeHero";
import Footer from "@/components/Footer";
import PromoModal from "@/components/PromoModal";

const NEW_IMAGES: string[] = [
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_00%20%281%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_00%20%282%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_00.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01%20%281%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_02%20%281%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_02%20%282%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_02.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%281%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%282%29.png",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03.png",
];

const MARQUEE_IMAGES: string[] = [...NEW_IMAGES, ...NEW_IMAGES];

const Index = () => {
  return (
    <main>
      <PromoModal />
      <Navbar />
      <AffiliateNotice />
      <Hero />
      <AnimatedMarqueeHero images={MARQUEE_IMAGES} />
      <PartnerBanner />
      <Footer />
    </main>
  );
};

export default Index;
