"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"

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

// Soft, mature accent hues for hover glows (subtle, not candy-like)
const accents = [
  "from-emerald-400/20 via-teal-400/15 to-transparent",
  "from-sky-400/20 via-cyan-400/15 to-transparent",
  "from-violet-400/20 via-fuchsia-400/15 to-transparent",
  "from-amber-400/20 via-orange-400/15 to-transparent",
  "from-green-400/20 via-emerald-400/15 to-transparent",
  "from-indigo-400/20 via-blue-400/15 to-transparent",
  "from-rose-400/20 via-pink-400/15 to-transparent",
  "from-teal-400/20 via-sky-400/15 to-transparent",
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

  // Pointer glow utility
  const setPointerVars = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--x", `${x}px`)
    el.style.setProperty("--y", `${y}px`)
  }

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-t border-border bg-background py-28 sm:py-32"
    >
      {/* Background image with overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <Image
            src="/community-event-gathering.jpg"
            alt="Community gathering"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,theme(colors.slate.300/15),transparent)] dark:bg-[radial-gradient(1200px_600px_at_80%_-10%,theme(colors.slate.700/10),transparent)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex items-end gap-6">
          <h2 data-reveal className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span>Why intergenerational?</span>
          </h2>
          <div className="hidden md:block h-px flex-1 bg-foreground/15" />
        </div>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p
            data-reveal
            className="mx-auto max-w-xl text-balance text-lg lg:text-xl text-muted-foreground"
            style={{ ["--i" as any]: 1 } as React.CSSProperties}
          >
            Discover the meaningful, measurable upsides of connecting generations.
          </p>
        </div>

        {/* Split layout: Image on left, benefits on right (desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Featured image card */}
          <div
            data-reveal
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
            style={{ ["--i" as any]: 0 } as React.CSSProperties}
          >
            <Image
              src="/community-event-gathering.jpg"
              alt="Community event gathering with people of all ages"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm font-medium opacity-90">Community gathering</p>
              <p className="text-xs opacity-70 mt-1">People of all ages coming together</p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                onMouseMove={setPointerVars}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,.08)] transition-all duration-500 will-change-transform hover:translate-y-[-4px] hover:shadow-xl hover:shadow-foreground/10 dark:bg-white/5 dark:border-white/5"
                style={{ ["--i" as any]: idx + 2 } as React.CSSProperties}
              >
                {/* Interactive glow masked to pointer position */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 [mask-image:radial-gradient(200px_200px_at_var(--x)_var(--y),black,transparent)] bg-gradient-to-br ${accents[idx % accents.length]}`}
                />

                {/* Soft top hairline highlight */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="flex items-start gap-4">
                  <div className="relative mt-1 h-6 w-6 flex-none">
                    <CheckCircle2 className="h-6 w-6 text-foreground transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  </div>
                  <p className="text-base lg:text-lg font-medium leading-relaxed text-foreground">
                    {item}
                  </p>
                </div>

                {/* Subtle bottom indicator line on hover */}
                <div aria-hidden className="absolute inset-x-6 bottom-4 h-px scale-x-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] transition hover:bg-white/7 hover:text-foreground/95 focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            <span className="underline-offset-4 group-hover:underline">ROXY Flyer</span>
            <svg
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Reveal transitions */}
      <style jsx>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(6px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1), filter .7s cubic-bezier(.22,1,.36,1);
          transition-delay: calc(var(--i, 0) * 45ms);
        }
        [data-reveal="true"] {
          opacity: 1;
          transform: none;
          filter: none;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { transition: none; opacity: 1; transform: none; filter: none; }
        }
        .dark .dark\\:bg-white\\/2 { background-color: rgba(255,255,255,0.02); }
        .hover\\:bg-white\\/7:hover { background-color: rgba(255,255,255,0.07); }
      `}</style>
    </section>
  )
}
