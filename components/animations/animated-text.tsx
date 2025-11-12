"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedText({ children, className = "", delay = 0 }: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

