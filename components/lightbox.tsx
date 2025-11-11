"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryItem } from "@/types/gallery"
import { galleryItems } from "@/data/gallery-items"

interface LightboxProps {
  item: GalleryItem
  onClose: () => void
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(galleryItems.findIndex((i) => i.id === item.id))
  const [isAnimating, setIsAnimating] = useState(false)

  const currentItem = galleryItems[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, onClose])

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const goToPrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full max-w-4xl max-h-[85vh] flex items-center justify-center px-4">
        <div className={`relative w-full h-full animate-in fade-in duration-300 ${isAnimating ? "fade-out" : ""}`}>
          <Image
            src={currentItem.src || "/placeholder.svg"}
            alt={currentItem.alt || "Gallery item"}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        disabled={isAnimating}
        className="absolute left-4 p-3 hover:bg-white/10 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        disabled={isAnimating}
        className="absolute right-4 p-3 hover:bg-white/10 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Caption & Counter */}
      <div className="absolute bottom-6 left-6 right-6 text-white z-10">
        {currentItem.caption && <p className="text-sm mb-2 opacity-90">{currentItem.caption}</p>}
        <p className="text-xs opacity-70">
          {currentIndex + 1} / {galleryItems.length}
        </p>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 right-6 text-white/50 text-xs hidden md:block">
        Use arrow keys to navigate • ESC to close
      </div>
    </div>
  )
}
