"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { AnimatedImage } from "@/components/animations/animated-image"
import { AnimatedHeading } from "@/components/animations/animated-heading"
import { AnimatedText } from "@/components/animations/animated-text"

export function WhatsHappening() {
  const rootRef = useRef<HTMLElement | null>(null)

  // Scroll-reveal without extra libs (respects reduced motion)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => (el.dataset.reveal = "true"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.reveal = "true"
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-secondary border-t border-border overflow-hidden border-t border-border bg-background py-12 sm:py-20 lg:py-32">
      {/* Background image with overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <AnimatedImage
            src="/community-celebration-outdoor.jpg"
            alt="Community celebration outdoor"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div className="mb-8 sm:mb-12 lg:mb-14 flex items-end gap-4 sm:gap-6">
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight">
            <span>What's happening here</span>
          </AnimatedHeading>
          <div className="hidden md:block h-px flex-1 bg-foreground/15" />
        </div>

        {/* Content with image card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div>
            <AnimatedText delay={0.2}>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                From art & music events, talks & discussions, and learning circles, to youth-led art and sport projects
                and inclusive activities with disadvantaged neighbors.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <div className="mt-6">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-elegant underline underline-offset-4"
                >
                  Vereinssatzung Roxy
                </Link>
              </div>
            </AnimatedText>
          </div>

          {/* Featured image card */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <AnimatedImage
              src="/community-celebration-outdoor.jpg"
              alt="Community event gathering with various activities"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* Reveal transitions */}
      <style jsx>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(6px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i, 0) * 45ms);
        }
        [data-reveal="true"] {
          opacity: 1;
          transform: none;
          filter: none;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] {
            transition: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </section>
  )
}

