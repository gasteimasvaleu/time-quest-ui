"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const SCRAMBLE_SPEED = 10;
const CYCLES_PER_LETTER = 3;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

interface HyperTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

interface WordProps {
  children: string;
  isDimmed: boolean;
  isHighlightable: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Word = ({
  children,
  isDimmed,
  isHighlightable,
  onHoverStart,
  onHoverEnd,
}: WordProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
      }
    }, SCRAMBLE_SPEED);
  }, [children]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const handleMouseEnter = () => {
    if (isHighlightable) {
      setIsHovered(true);
      onHoverStart();
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (isHighlightable) {
      setIsHovered(false);
      onHoverEnd();
      stopScramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-block px-0.5 transition-all duration-300",
        isHighlightable
          ? "cursor-pointer text-[hsl(330_100%_50%)] font-medium"
          : "text-muted-foreground",
        isDimmed && !isHovered ? "opacity-40" : "opacity-100"
      )}
    >
      {/* Background pill */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            layoutId="hyper-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 -mx-1 rounded-md bg-[hsl(330_100%_50%)]/10"
          />
        )}
      </AnimatePresence>

      {/* Text content */}
      <span className="relative z-10 whitespace-nowrap font-mono tracking-tight">
        {isHovered ? displayText : children}
      </span>

      {/* Decorative tech corners */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -left-1 -top-1 h-1.5 w-1.5 border-l border-t border-[hsl(330_100%_50%)]"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 -right-1 h-1.5 w-1.5 border-b border-r border-[hsl(330_100%_50%)]"
            />
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

export default function HyperTextParagraph({
  text,
  className = "",
  highlightWords = [],
}: HyperTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const words = text.split(" ");
  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <p className={cn("leading-relaxed", className)}>
      {words.map((word, i) => {
        const isHighlightable = highlightWords.some(
          (hw) => clean(hw) === clean(word)
        );

        return (
          <React.Fragment key={i}>
            <Word
              isHighlightable={isHighlightable}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {word}
            </Word>{" "}
          </React.Fragment>
        );
      })}
    </p>
  );
}
