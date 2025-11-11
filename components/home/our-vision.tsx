"use client"

import Link from "next/link"

export function OurVision() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl sm:text-3xl leading-relaxed tracking-tight">
          A lively place where creativity, community, and solidarity grow — a meeting point where youth, adults, and
          seniors learn from each other, create together, and show up for one another.
        </p>
        <div className="mt-6">
          <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
            ROXY Flyer
          </Link>
        </div>
        <p className="mt-12 text-lg text-muted-foreground">
          Design spirit: a modern, funky, punk-inspired cultural center that celebrates diversity and inclusion.
        </p>
        <div className="mt-2">
          <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
            ROXY Flyer
          </Link>
        </div>
      </div>
    </section>
  )
}

