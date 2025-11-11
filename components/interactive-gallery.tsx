"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface GalleryItem {
  id: string
  src: string
  alt: string
  title?: string
}

interface InteractiveGalleryProps {
  items: GalleryItem[]
}

export function InteractiveGallery({ items }: InteractiveGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: galleryRef, isVisible } = useScrollAnimation()

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const dragDistance = e.clientX - dragStart
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
      } else {
        setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
      }
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const dragDistance = e.changedTouches[0].clientX - dragStart
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
      } else {
        setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
      }
    }
  }

  return (
    <div ref={galleryRef} className={`w-full transition-elegant ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div
        ref={containerRef}
        className="relative w-full h-screen bg-black overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Gallery Image */}
        <div className="relative w-full h-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === selectedIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover"
                priority={index === selectedIndex}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute top-8 right-8 text-white text-sm font-medium z-10">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>

        {/* Drag Hint */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className={`text-white/40 text-sm transition-opacity duration-300 ${
              isDragging ? "opacity-0" : "opacity-100"
            }`}
          >
            DRAG TO NAVIGATE
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Title */}
        {items[selectedIndex]?.title && (
          <div className="absolute bottom-16 left-8 text-white z-10">
            <h3 className="text-lg font-medium">{items[selectedIndex].title}</h3>
          </div>
        )}
      </div>
    </div>
  )
}
