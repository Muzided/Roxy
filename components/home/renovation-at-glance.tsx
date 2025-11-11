"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield } from "lucide-react"

export function RenovationAtGlance() {
  return (
    <section id="plan" className="py-24 px-4 sm:px-6 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Renovation at a glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            "Facade, windows, doors",
            "Roof repair (felt, sealing, insulation)",
            "Interior drywall",
            "Heating system & radiators",
            "Modern LED lighting",
            "Painting, electrics, floors",
            "Room outfitting for culture, education & leisure",
          ].map((line, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-1" />
              <p className="text-base leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant font-medium">
            <Link href="#plan">See our plan</Link>
          </Button>
        </div>
        <div className="mt-6">
          <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
            ROXY Flyer
          </Link>
        </div>
      </div>
    </section>
  )
}

