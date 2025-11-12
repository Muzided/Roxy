"use client"

import { SiteHeader } from "@/components/site-header"
import { galleryItems } from "@/data/gallery-items"
import { useMemo } from "react"
import MasonryGallery from "@/components/masonry-gallery"

export default function InteractiveGalleryClient() {
  type GalleryItem = {
    id: string
    src: string
    alt: string
    title?: string
    subtitle?: string
    date?: string
    description?: string
  }

  // Transform gallery items to the format expected by MasonryGallery
  const galleryItemsData: GalleryItem[] = useMemo(
    () =>
      galleryItems.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt || "Gallery image",
        title: item.caption,
      })),
    [],
  )

  return (
    <>
      <SiteHeader />
      <main className="w-full min-h-screen bg-background">
        <MasonryGallery items={galleryItemsData} />
      </main>
    </>
  )
}
