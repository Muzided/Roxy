"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedImage } from "@/components/animations/animated-image"

type TimelineItem = {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
  date?: string
  description?: string
}

interface Props {
  items: TimelineItem[]
  /** center line color (Tailwind class), e.g. 'bg-neutral-300' */
  lineColorClass?: string
  /** accent color for dots/connectors, e.g. 'bg-black' */
  accentClass?: string
}

export default function BranchGallery({
  items,
  lineColorClass = "bg-neutral-300",
  accentClass = "bg-black",
}: Props) {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0..1 line fill

  // Fill the center spine progressively as the user scrolls through the section
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const containerHeight = rect.height
      
      // Progress calculation:
      // - Progress = 0 when container top reaches viewport bottom (rect.top = vh) - just entering
      // - Progress = 1 when container bottom reaches viewport top (rect.bottom = 0) - just exiting
      // - Total scrollable distance = containerHeight + vh
      
      // When rect.top = vh: container just entering, progress = 0
      // When rect.bottom = 0: container just exiting, progress = 1
      // This means when rect.top = -containerHeight, progress = 1
      
      // Calculate: how far has the container scrolled from entry point?
      // Entry point: rect.top = vh
      // Exit point: rect.top = -containerHeight
      // Range: vh - (-containerHeight) = vh + containerHeight
      const entryPoint = vh
      const exitPoint = -containerHeight
      const totalRange = entryPoint - exitPoint // vh + containerHeight
      
      // Current position relative to entry point
      const currentPosition = entryPoint - rect.top
      
      // Progress: 0 at entry, 1 at exit
      const raw = totalRange > 0 ? currentPosition / totalRange : 0
      const clamped = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-20">
      {/* Center vertical spine */}
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-full w-px md:w-1">
        <div className={`absolute inset-0 ${lineColorClass} opacity-50`} />
        {/* Progressive fill */}
        <div
          className={`absolute left-0 top-0 w-full ${accentClass}`}
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Heading (optional) */}
      {/* <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">ROXY Gallery Timeline</h2>
        <p className="mt-3 text-sm text-neutral-600">
          Scroll to explore moments. Each card connects to our story spine.
        </p>
      </div> */}

      {/* Items */}
      <div className="relative grid grid-cols-1 md:grid-cols-9 gap-y-16 md:gap-y-24">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0
          const colClasses = isLeft
            ? "md:col-span-4 md:col-start-1"
            : "md:col-span-4 md:col-start-6"

          return (
            <div key={item.id} className={`relative ${colClasses}`}>
              {/* connector from spine to card */}
              <span
                className={`absolute top-10 hidden md:block ${isLeft ? "right-[-2.5rem]" : "left-[-2.5rem]"} h-px w-10 ${accentClass}/50`}
              />
              {/* dot on the spine */}
              <span
                className={`absolute top-8 hidden md:block ${isLeft ? "right-[-3.1rem]" : "left-[-3.1rem]"} h-3 w-3 rounded-full ring-4 ring-white ${accentClass}`}
              />

              <motion.article
                initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <AnimatedImage src={item.src} alt={item.alt} fill className="object-cover" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    {item.title && <h3 className="text-base font-medium leading-tight">{item.title}</h3>}
                    {item.subtitle && <p className="text-sm text-neutral-600">{item.subtitle}</p>}
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.description}</p>
                    )}
                  </div>
                  {item.date && (
                    <time className="shrink-0 rounded-full border px-2 py-1 text-xs text-neutral-700">
                      {item.date}
                    </time>
                  )}
                </div>
              </motion.article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
