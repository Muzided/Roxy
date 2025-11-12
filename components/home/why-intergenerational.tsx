"use client"

import Link from "next/link"
import type { MouseEvent } from "react"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { AnimatedImage } from "@/components/animations/animated-image"
import { AnimatedHeading } from "@/components/animations/animated-heading"
import { AnimatedText } from "@/components/animations/animated-text"

const benefits = [
  "Emotional security",
  "Life experience is passed on",
  "Reduces age discrimination",
  "Purpose for seniors",
  "Builds social competence",
  "Eases stress (both generations)",
  "Culture & stories stay alive",
  "Strengthens community feeling",
]

export function WhyIntergenerational() {
  const rootRef = useRef<HTMLElement | null>(null)

  // Scroll-reveal without extra libs (respects reduced motion)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.dataset.reveal = "true")
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "true"
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Pointer glow helper
  const setPointerVars = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--x", `${x}px`)
    el.style.setProperty("--y", `${y}px`)
  }

  return (
    <section ref={rootRef} className="relative overflow-hidden border-t border-border bg-background">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_480px_at_90%_-10%,theme(colors.slate.300/18),transparent)] dark:bg-[radial-gradient(1000px_480px_at_90%_-10%,theme(colors.slate.700/12),transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 lg:py-28">
        {/* Title */}
        <div className="mb-8 sm:mb-12 lg:mb-14 flex items-end gap-4 sm:gap-6">
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight">
            <span>Why intergenerational?</span>
          </AnimatedHeading>
          <div className="hidden md:block h-px flex-1 bg-foreground/15" />
        </div>

        {/* Subtitle */}
        <div className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-3xl">
          <AnimatedText delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Discover the meaningful, measurable upsides of connecting generations.
            </p>
          </AnimatedText>
        </div>

        {/* Split layout: Image on left, benefits on right (desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Featured image card */}
          <div
            data-reveal
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
            style={{ ["--i" as any]: 0 } as React.CSSProperties}
          >
            <AnimatedImage
              src="/community-event-gathering.jpg"
              alt="Community event gathering with people of all ages"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                onMouseMove={setPointerVars}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md transition-all duration-500 will-change-transform hover:-translate-y-1 hover:shadow-lg"
                style={{ ["--i" as any]: idx + 1 } as React.CSSProperties}
              >
                <Glow />
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="relative mt-0.5 flex-none">
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/90 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-foreground/90">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <AnimatedText delay={0.4}>
            <Link
              href="#"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-elegant"
            >
              ROXY Flyer
            </Link>
          </AnimatedText>
        </div>
      </div>

      {/* Reveal transitions */}
      <style jsx>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(6px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
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

function Glow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 [mask-image:radial-gradient(160px_160px_at_var(--x)_var(--y),black,transparent)] bg-[radial-gradient(240px_120px_at_var(--x)_var(--y),theme(colors.white/8),transparent)]"
    />
  )
}
