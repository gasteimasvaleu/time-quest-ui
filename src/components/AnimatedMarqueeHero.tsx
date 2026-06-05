import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  images: string[];
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  images,
  className,
}) => {
  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative z-10 mt-4 md:-mt-40 px-4 pb-8 md:pb-12",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-6">
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="h-80 w-[180px] shrink-0 overflow-hidden rounded-2xl bg-muted shadow-lg md:h-[480px] md:w-[270px]"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedMarqueeHero;
