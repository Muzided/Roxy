"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  onLoad?: () => void
  aspectRatio?: string
  width?: number
  height?: number
}

export function AnimatedImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  sizes,
  onLoad,
  aspectRatio,
  width,
  height,
}: AnimatedImageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const imageContent = fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      onLoad={onLoad}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onLoad={onLoad}
    />
  )

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 1.15, filter: "blur(10px)" }}
      animate={isInView ? { scale: 1, filter: "blur(0px)" } : { scale: 1.15, filter: "blur(10px)" }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        filter: { duration: 1.0 },
      }}
      className={fill ? "relative w-full h-full" : ""}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {imageContent}
    </motion.div>
  )
}

