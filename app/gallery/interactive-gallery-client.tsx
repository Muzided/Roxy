"use client"

import { SiteHeader } from "@/components/site-header"
import { InteractiveGallery } from "@/components/interactive-gallery"
import { galleryItems } from "@/data/gallery-items"

export default function InteractiveGalleryClient() {
  // <CHANGE> Transform gallery items to work with new interactive component
  const interactiveItems = galleryItems.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    title: item.caption,
  }))

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        {/* <CHANGE> Replaced pan-canvas with new interactive draggable gallery */}
        <InteractiveGallery items={interactiveItems} />
      </main>
    </>
  )
}
