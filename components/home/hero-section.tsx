"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useParallax } from "@/hooks/use-parallax"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

interface HeroSectionProps {
  onGetInvolvedClick: () => void
}

export function HeroSection({ onGetInvolvedClick }: HeroSectionProps) {
  const { style: parallaxStyle } = useParallax(20)
  const heroDarken = useScrollProgress(0.7)
  const overlayOpacity = Math.min(0.55, heroDarken * 0.55)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background gpu-accelerated" style={parallaxStyle}>
        <Image
          src="/heroimaage1.jpeg"
          alt="Community gathering"
          fill
          className="object-cover"
          priority
        />
        {/* Base darkening overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Dynamic darkening overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in text-white">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 text-balance leading-tight animate-slide-up text-white">
          ROXY — a community-run culture & meeting space for all generations.
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-10 text-balance leading-relaxed max-w-3xl mx-auto animate-slide-up animation-delay-100">
          Founded on 18 September 2025 in Wolfen (Bitterfeld-Wolfen, 06766), ROXY promotes arts & culture, youth
          support, sport, and civic engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-slide-up animation-delay-200">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 transition-elegant font-medium">
            <Link href="#plan">See our plan</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 transition-elegant font-medium bg-transparent"
            onClick={onGetInvolvedClick}
          >
            Get involved
          </Button>
        </div>
        <div className="mt-6 animate-slide-up animation-delay-300">
          <Link href="#" className="underline underline-offset-4 text-sm text-white/80 hover:text-white transition-elegant">
            Vereinssatzung Roxy
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-xs font-medium text-white/70">SCROLL DOWN</div>
      </div>
    </section>
  )
}

