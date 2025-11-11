"use client"

import { useEffect, useRef, useState } from "react"

export function useParallax(offset = 50) {
  const ref = useRef<HTMLElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const rafIdRef = useRef<number | null>(null)
  const pendingScrollYRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      pendingScrollYRef.current = window.scrollY

      if (rafIdRef.current == null) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          rafIdRef.current = null
          // Use the latest queued scrollY and compute parallax offset
          const y = pendingScrollYRef.current * (offset / 100)
          setTranslateY(y)
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initialize on mount
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [])

  return {
    ref,
    style: {
      transform: `translate3d(0, ${translateY}px, 0)`,
      willChange: "transform",
    },
  }
}
