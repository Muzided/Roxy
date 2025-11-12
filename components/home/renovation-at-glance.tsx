"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield } from "lucide-react"
import { AnimatedHeading } from "@/components/animations/animated-heading"
import { AnimatedText } from "@/components/animations/animated-text"

export function RenovationAtGlance() {
  return (
    <section id="plan" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8" delay={0.2}>
          Renovation at a glance
        </AnimatedHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            "Facade, windows, doors",
            "Roof repair (felt, sealing, insulation)",
            "Interior drywall",
            "Heating system & radiators",
            "Modern LED lighting",
            "Painting, electrics, floors",
            "Room outfitting for culture, education & leisure",
          ].map((line, idx) => (
            <AnimatedText key={idx} delay={0.3 + idx * 0.1}>
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base leading-relaxed">{line}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
        <AnimatedText delay={1.0}>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant font-medium">
              <Link href="#plan">See our plan</Link>
            </Button>
          </div>
        </AnimatedText>
        <AnimatedText delay={1.2}>
          <div className="mt-6">
            <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
              ROXY Flyer
            </Link>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}

