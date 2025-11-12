"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedImage } from "@/components/animations/animated-image"
import { X } from "lucide-react"

type GalleryItem = {
  id: string
  src: string
  alt: string
  title?: string
  subtitle?: string
  date?: string
  description?: string
}

interface Props {
  items: GalleryItem[]
}

export default function MasonryGallery({ items }: Props) {
  const prefersReduced = useReducedMotion()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [columns, setColumns] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumns(1)
      } else if (width < 1024) {
        setColumns(2)
      } else if (width < 1536) {
        setColumns(3)
      } else {
        setColumns(4)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute items across columns for balanced masonry effect
  const columnsArray = useMemo(() => {
    const cols: GalleryItem[][] = Array.from({ length: columns }, () => [])
    const columnHeights = Array.from({ length: columns }, () => 0)
    
    // Heights for natural variation (in pixels)
    const heights = [240, 280, 320, 360, 300, 260, 340, 380, 290, 310, 350, 270]
    
    items.forEach((item, index) => {
      // Find column with minimum height
      const minHeight = Math.min(...columnHeights)
      const targetColumn = columnHeights.indexOf(minHeight)
      
      cols[targetColumn].push(item)
      // Update column height (using a height pattern for visual variety)
      columnHeights[targetColumn] += heights[index % heights.length]
    })
    
    return cols
  }, [items, columns])

  // Get height for item based on its position in column
  const getItemHeight = (colIndex: number, itemIndex: number) => {
    const heights = [240, 280, 320, 360, 300, 260, 340, 380, 290, 310, 350, 270]
    // Use a combination of column and item index for variety
    const heightIndex = (colIndex * 3 + itemIndex) % heights.length
    return heights[heightIndex]
  }

  return (
    <>
      <section ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {columnsArray.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
              {column.map((item, itemIndex) => {
                const height = getItemHeight(colIndex, itemIndex)

                return (
                  <motion.div
                    key={item.id}
                    initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: (colIndex + itemIndex) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ height: `${height}px` }}
                      >
                        <AnimatedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Caption overlay */}
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-xs sm:text-sm font-medium leading-tight">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1">{item.subtitle}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-8 sm:-top-12 right-0 p-2 hover:bg-white/10 rounded-full transition-colors z-10 text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/50">
              <AnimatedImage
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {(selectedItem.title || selectedItem.description) && (
              <div className="mt-3 sm:mt-4 text-center text-white px-2">
                {selectedItem.title && (
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{selectedItem.title}</h3>
                )}
                {selectedItem.description && (
                  <p className="text-xs sm:text-sm text-white/80">{selectedItem.description}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

