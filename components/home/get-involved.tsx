"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GetInvolvedProps {
  onOpenModal: () => void
}

export function GetInvolved({ onOpenModal }: GetInvolvedProps) {
  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Get involved</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant" onClick={onOpenModal}>
            Volunteer
          </Button>
          <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/5 transition-elegant" onClick={onOpenModal}>
            Donate materials
          </Button>
          <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/5 transition-elegant" onClick={onOpenModal}>
            Become a member
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
          Supporting memberships welcome; supporters can attend and submit motions (no vote); honorary members are
          fee-exempt and have voting rights.
        </p>
        <div className="mt-3">
          <Link href="#" className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground transition-elegant">
            Vereinssatzung Roxy
          </Link>
        </div>
      </div>
    </section>
  )
}

