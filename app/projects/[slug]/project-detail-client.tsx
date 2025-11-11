"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types/project"
import { Users, MapPin, Calendar } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useParallax } from "@/hooks/use-parallax"

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation()
  const { ref: collaboratorsRef, isVisible: collaboratorsVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()
  const { style: parallaxStyle } = useParallax(15)

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero with Cover Image */}
        <section className="relative h-96 md:h-[500px] overflow-hidden bg-muted" style={parallaxStyle}>
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </section>

        <section className="py-16 px-4 sm:px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className={
                    project.status === "in-progress"
                      ? "bg-blue-100 text-blue-900"
                      : project.status === "open"
                        ? "bg-green-100 text-green-900"
                        : "bg-gray-100 text-gray-900"
                  }
                >
                  {project.status === "in-progress" && "In Progress"}
                  {project.status === "open" && "Open for Volunteers"}
                  {project.status === "completed" && "Completed"}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold mb-4 tracking-tight animate-text-reveal">{project.title}</h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground text-sm animate-slide-up animation-delay-100">
                {project.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                )}
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            {project.summary && (
              <div className="mb-12 pb-12 border-b border-border animate-slide-up animation-delay-200">
                <p className="text-xl text-muted-foreground leading-relaxed">{project.summary}</p>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div ref={galleryRef} className="mb-12">
                <h2
                  className={`text-3xl font-bold mb-8 transition-elegant ${
                    galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transform: galleryVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className={`space-y-3 transition-elegant ${
                        galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      }`}
                      style={{
                        transitionDuration: "0.8s",
                        transitionDelay: galleryVisible ? `${idx * 100}ms` : "0ms",
                        transform: galleryVisible ? "translateY(0)" : "translateY(20px)",
                      }}
                    >
                      <div className="relative aspect-video overflow-hidden bg-muted group cursor-pointer">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt || "Project image"}
                          fill
                          className="object-cover group-hover:scale-105 transition-elegant duration-500"
                        />
                      </div>
                      {item.caption && <p className="text-sm text-muted-foreground italic">{item.caption}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
              <div ref={collaboratorsRef} className="mb-12">
                <h2
                  className={`text-3xl font-bold mb-8 flex items-center gap-2 transition-elegant ${
                    collaboratorsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transform: collaboratorsVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <Users className="w-5 h-5" />
                  Partners & Collaborators
                </h2>
                <div className="space-y-3">
                  {project.collaborators.map((collab, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 bg-secondary border border-border hover:border-foreground transition-elegant ${
                        collaboratorsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-10px]"
                      }`}
                      style={{
                        transitionDuration: "0.8s",
                        transitionDelay: collaboratorsVisible ? `${idx * 75}ms` : "0ms",
                        transform: collaboratorsVisible ? "translateX(0)" : "translateX(-10px)",
                      }}
                    >
                      <div>
                        <p className="font-semibold text-foreground">{collab.name}</p>
                        {collab.role && <p className="text-sm text-muted-foreground">{collab.role}</p>}
                      </div>
                      {collab.url && (
                        <Link
                          href={collab.url}
                          target="_blank"
                          className="text-foreground hover:text-accent text-sm font-medium transition-elegant"
                        >
                          Visit →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div
              ref={ctaRef}
              className={`mt-16 p-8 md:p-12 bg-foreground text-background transition-elegant ${
                ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                transitionDuration: "0.8s",
                transform: ctaVisible ? "scale(1)" : "scale(0.95)",
              }}
            >
              <h3 className="text-2xl font-bold mb-3">How You Can Help</h3>
              <p className="mb-8 text-background/80 text-lg leading-relaxed">
                {project.status === "in-progress"
                  ? "This project is actively ongoing. We welcome volunteers, collaborators, and supporters."
                  : project.status === "open"
                    ? "We're actively recruiting volunteers and collaborators for this initiative."
                    : "This project has been completed. Check out our current initiatives."}
              </p>
              <Button className="bg-background text-foreground hover:bg-background/90 transition-elegant font-medium">
                Express Interest
              </Button>
            </div>

            {/* Back to Projects */}
            <div className="mt-12 animate-slide-up">
              <Link
                href="/projects"
                className="text-foreground hover:text-accent transition-elegant font-medium flex items-center gap-1"
              >
                ← Back to Works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
