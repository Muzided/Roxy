"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface AnimatedHeadingProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function AnimatedHeading({ children, className = "", delay = 0, as: Component = "h2" }: AnimatedHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const motionProps = {
    ref,
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: {
      duration: 1.0,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
    className,
  }

  switch (Component) {
    case "h1":
      return <motion.h1 {...motionProps}>{children}</motion.h1>
    case "h2":
      return <motion.h2 {...motionProps}>{children}</motion.h2>
    case "h3":
      return <motion.h3 {...motionProps}>{children}</motion.h3>
    case "h4":
      return <motion.h4 {...motionProps}>{children}</motion.h4>
    case "h5":
      return <motion.h5 {...motionProps}>{children}</motion.h5>
    case "h6":
      return <motion.h6 {...motionProps}>{children}</motion.h6>
    default:
      return <motion.h2 {...motionProps}>{children}</motion.h2>
  }
}

