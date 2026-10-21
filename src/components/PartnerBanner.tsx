import banner from "@/assets/banner-monetisexy.png.asset.json";

const PartnerBanner = () => (
  <section className="bg-background px-4 pt-4 md:px-8 md:pt-10">
    <div className="mx-auto max-w-7xl">
      <a
        href="https://monetisexy.com"
        target="_blank"
        rel="noopener sponsored"
        className="block overflow-hidden rounded-[40px] shadow-lg"
      >
        <img src={banner.url} alt="Monetisexy - site parceiro" loading="eager" className="h-auto w-full" />
      </a>
    </div>
  </section>
);

export default PartnerBanner;
