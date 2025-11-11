"use client"

import Link from "next/link"
import Image from "next/image"
import type { MouseEvent } from "react"
import { useEffect, useRef } from "react"
import { Music2, Baby, Sprout, HeartHandshake } from "lucide-react"

const pillars = [
  { icon: Music2, label: "Arts & Culture" },
  { icon: Baby, label: "Youth Support" },
  { icon: Sprout, label: "Sport" },
  { icon: HeartHandshake, label: "Civic Engagement" },
]

export function WhatWeStandFor() {
  const rootRef = useRef<HTMLElement | null>(null)

  // Reveal on view (no extra libs)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
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
      { threshold: 0.18 }
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28">
        {/* Title */}
        <div className="mb-14 flex items-end gap-6">
          <h2 data-reveal className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-center">What we stand for</span>
          </h2>
          <div className="hidden md:block h-px flex-1 bg-foreground/15" />
        </div>

        {/* Ring layout */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-5xl">
          {/* Center media card */}
          <div
            data-reveal
            className="absolute left-1/2 top-1/2 z-10 w-[78%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/roxy-home.jpeg"
                alt="ROXY community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </div>

          {/* Points around the card (absolute on md+, stacked on mobile) */}
          <div className="absolute inset-0 hidden md:block">
            {/* top */}
            <PointCard
              label={pillars[0].label}
              Icon={pillars[0].icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
              setPointerVars={setPointerVars}
              className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            />
            {/* right */}
            <PointCard
              label={pillars[1].label}
              Icon={pillars[1].icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
              setPointerVars={setPointerVars}
              className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
            />
            {/* bottom */}
            <PointCard
              label={pillars[2].label}
              Icon={pillars[2].icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
              setPointerVars={setPointerVars}
              className="left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
            />
            {/* left */}
            <PointCard
              label={pillars[3].label}
              Icon={pillars[3].icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
              setPointerVars={setPointerVars}
              className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            {/* subtle ring */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10" />
          </div>

          {/* Mobile fallback: stack below image */}
          <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div key={i} data-reveal style={{ ["--i" as any]: i } as React.CSSProperties}>
                <div onMouseMove={setPointerVars} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)]">
                  <Glow />
                  <p.icon className="mb-2 h-5 w-5 text-foreground/90" />
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-foreground/90">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy & link */}
        <div className="mx-auto mt-12 max-w-3xl">
          <p data-reveal className="text-lg lg:text-xl text-muted-foreground">
            We operate as a charitable, selfless association; funds are used only for the purposes in our bylaws.
          </p>
          <div className="mt-4">
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Vereinssatzung Roxy
            </Link>
          </div>
        </div>
      </div>

      {/* Reveal transitions */}
      <style jsx>{`
        [data-reveal] { opacity: 0; transform: translateY(10px); filter: blur(6px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1), filter .7s cubic-bezier(.22,1,.36,1); transition-delay: calc(var(--i, 0) * 45ms); }
        [data-reveal="true"] { opacity: 1; transform: none; filter: none; }
        @media (prefers-reduced-motion: reduce) { [data-reveal] { transition: none; opacity: 1; transform: none; filter: none; } }
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

function PointCard({
  label,
  Icon,
  className = "",
  setPointerVars,
}: {
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  className?: string
  setPointerVars: (e: MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <div className={`absolute ${className}`}>
      <div
        data-reveal
        onMouseMove={setPointerVars}
        className="group relative w-[15rem] max-w-[38vw] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
      >
        <Glow />
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-foreground/90" />
          <p className="text-sm md:text-base lg:text-lg font-medium text-foreground/90">{label}</p>
        </div>
      </div>
    </div>
  )
}
