"use client"

import Link from "next/link"
import { AnimatedText } from "@/components/animations/animated-text"

export function OurVision() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-secondary border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedText delay={0.2}>
          <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-tight px-2 sm:px-0">
            A lively place where creativity, community, and solidarity grow — a meeting point where youth, adults, and
            seniors learn from each other, create together, and show up for one another.
          </p>
        </AnimatedText>
        <AnimatedText delay={0.4}>
          <div className="mt-6">
            <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
              ROXY Flyer
            </Link>
          </div>
        </AnimatedText>
        <AnimatedText delay={0.6}>
          <p className="mt-8 sm:mt-12 text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
            Design spirit: a modern, funky, punk-inspired cultural center that celebrates diversity and inclusion.
          </p>
        </AnimatedText>
        <AnimatedText delay={0.8}>
          <div className="mt-2">
            <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
              ROXY Flyer
            </Link>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}

