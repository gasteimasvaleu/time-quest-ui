"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface AnimatedDownloadButtonProps {
  href: string
  label?: string
  collapsedSize?: number
  expandedWidth?: number
}

export default function AnimatedDownloadButton({
  href,
  label = "Baixe Agora",
  collapsedSize = 48,
  expandedWidth = 180,
}: AnimatedDownloadButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-block"
    >
      <motion.div
        initial={{ width: collapsedSize, height: collapsedSize }}
        animate={{ width: isHovered ? expandedWidth : collapsedSize }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-black text-white flex items-center justify-center overflow-hidden relative rounded-full shadow-md"
        style={{ height: collapsedSize }}
      >
        <motion.div
          className="absolute"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>

        <motion.div
          className="w-full flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
        >
          <span className="text-sm font-bold whitespace-nowrap">{label}</span>
        </motion.div>
      </motion.div>
    </a>
  )
}
