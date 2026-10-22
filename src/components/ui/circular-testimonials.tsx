"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src?: string;
  icon?: React.ReactNode;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.5rem";

  const STOPWORDS_PT = useMemo(
    () =>
      new Set([
        "a","o","as","os","e","de","do","da","dos","das","em","no","na","nas","nos",
        "com","para","por","um","uma","uns","umas","que","seu","sua","seus","suas",
        "ao","aos","à","às","é","são","ou","se","ser","mais","menos","como","pelo","pela",
        "the","of","and","to","in","on","for","with","an",
      ]),
    []
  );
  const getKeywordIndex = (quote: string): number => {
    const words = quote.split(" ");
    for (let i = 0; i < words.length; i++) {
      const clean = (words[i] ?? "").toLowerCase().replace(/[^\p{L}]/gu, "");
      if (clean.length > 4 && !STOPWORDS_PT.has(clean)) return i;
    }
    return -1;
  };
  

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex] ?? testimonials[0]!,
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="testimonial-grid grid grid-cols-1 gap-12 md:gap-20 items-center">
        {/* Images */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-square max-w-md mx-auto"
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((testimonial, index) =>
            testimonial.icon ? (
              <div
                key={"icon-" + index}
                className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl select-none flex items-center justify-center bg-gradient-to-br from-secondary to-background border border-border"
                style={getImageStyle(index)}
              >
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[hsl(330,100%,50%)]/10 text-[hsl(330,100%,50%)] [&_svg]:h-16 [&_svg]:w-16">
                  {testimonial.icon}
                </div>
              </div>
            ) : (
              <img
                key={(testimonial.src ?? "") + index}
                src={testimonial.src}
                alt={testimonial.name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl select-none"
                style={getImageStyle(index)}
              />
            )
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between min-h-[300px] text-center md:text-left items-center md:items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h3
                className="font-bold mb-1"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="mb-6"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="leading-snug font-light"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => {
                  const isKeyword = i === getKeywordIndex(activeTestimonial.quote);
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.02 * i,
                        ease: "easeOut",
                      }}
                      style={{
                        display: "inline-block",
                        fontStyle: isKeyword ? "italic" : undefined,
                        color: isKeyword ? "hsl(330 100% 50%)" : undefined,
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  );
                })}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons flex gap-4 pt-8 justify-center md:justify-start w-full">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                color: colorArrowFg,
              }}
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                color: colorArrowFg,
              }}
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
