import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedMarqueeHero from "@/components/AnimatedMarqueeHero";
import Footer from "@/components/Footer";

const MARQUEE_IMAGES: string[] = [
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177687971206936582de0ab192f8b1710090b8a2fff5cb2c626_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177739983318768bed1fb63597428c3971f167251da48904295_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177788458989389d42e27515f10b9851ac8a38a24d9cdf8c4b5_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177941480726677dd13f2098096eba9569e39b59e750c26e369_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217794148721125b3fa2cdc51ddff2be86c78e2baff5d7187f42_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217794149068130fff30dca92d5f275a0fb147aaa6e5735c9a5d_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779415006476d45041e92366fce25871fcc31e231b4d807ce0_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779415077643c4d1375e87394ab549407fb4b34ce52ec8862c_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779415096138600f73c29fbe2d8b6aeb9e23538767e761e828_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217794151380972e69d8f77ebb6ff0d882025244d1e9e0af01ba_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177941522327115b33ccaa151d3ed7feaaa761bc71c37a59243_0.jpeg",
  "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217794152338061f48ceb9aa55112abbdf6fec19339eb3ae3b6b_0.jpeg",
];

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
