"use client"

import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export function TextReveal({ children, className = "", delay = 0, stagger = false }: TextRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-elegant ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transitionDuration: "0.8s",
          transitionDelay: `${delay}ms`,
          transform: isVisible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
