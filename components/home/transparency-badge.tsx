"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

export function TransparencyBadge() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 mt-1" />
          <p className="text-base leading-relaxed">
            We are a selfless, charitable association. No private gains; funds are used solely for ROXY's purposes; no undue benefits.
          </p>
        </div>
        <div className="mt-2">
          <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
            Vereinssatzung Roxy
          </Link>
        </div>
      </div>
    </section>
  )
}

