"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = "0px" } = options
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use requestAnimationFrame to batch state updates
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
        
        rafIdRef.current = requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
          rafIdRef.current = null
        })
      },
      { 
        threshold,
        rootMargin,
      },
    )

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [threshold, triggerOnce, rootMargin])

  return { ref, isVisible }
}
