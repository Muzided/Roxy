"use client"

import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ColorSectionTransitionProps {
  children: ReactNode
  className?: string
  backgroundColor?: string
  delay?: number
}

export function ColorSectionTransition({
  children,
  className = "",
  backgroundColor = "bg-background",
  delay = 0,
}: ColorSectionTransitionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${backgroundColor} ${className} ${
        isVisible ? "opacity-100" : "opacity-80"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
