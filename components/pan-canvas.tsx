"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import type { GalleryItem } from "@/types/gallery"
import { Lightbox } from "@/components/lightbox"
import { HelpCircle, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PanCanvasProps {
  items: GalleryItem[]
}

export function PanCanvas({ items }: PanCanvasProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showHelp, setShowHelp] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const canvasWidth = 5000
  const canvasHeight = 4000

  return (
    <>
      <div className="relative w-full h-screen bg-background overflow-hidden" ref={containerRef}>
        {/* Help Overlay */}
        {showHelp && (
          <div className="absolute top-4 right-4 z-30 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg max-w-xs animate-in fade-in slide-in-from-top">
            <p className="text-sm font-medium mb-2">Gallery Tips</p>
            <ul className="text-xs space-y-1 opacity-95">
              <li>• Click & drag to pan</li>
              <li>• Scroll or pinch to zoom</li>
              <li>• Click images to view details</li>
            </ul>
            <button onClick={() => setShowHelp(false)} className="text-xs mt-3 underline opacity-75 hover:opacity-100">
              Got it
            </button>
          </div>
        )}

        {/* Zoom Controls (Desktop) */}
        <div className="absolute bottom-6 left-6 z-30 hidden md:flex flex-col gap-2">
          <TransformWrapper>
            {({ zoomIn, zoomOut }) => (
              <>
                <Button
                  onClick={() => zoomIn()}
                  size="icon"
                  variant="outline"
                  className="bg-background hover:bg-secondary"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => zoomOut()}
                  size="icon"
                  variant="outline"
                  className="bg-background hover:bg-secondary"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* Help Button */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="absolute top-4 left-4 z-30 p-2 rounded-full bg-background hover:bg-secondary transition-colors"
          title="Toggle help"
        >
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Pan/Zoom Canvas */}
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          wheel={{ step: 100 }}
          touchPaddle={{ disabled: false }}
        >
          <TransformComponent
            wrapperProps={{
              style: {
                width: "100%",
                height: "100%",
              },
            }}
          >
            <div
              style={{
                width: canvasWidth,
                height: canvasHeight,
                position: "relative",
              }}
              className="bg-background"
            >
              {/* Gallery Items */}
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    position: "absolute",
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                  }}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative w-64 h-48 md:w-80 md:h-56">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt || "Gallery item"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 256px, 320px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                  </div>

                  {/* Caption on hover */}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-xs font-medium">{item.caption}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  )
}
