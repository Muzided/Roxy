"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "in-progress" | "open" | "completed">("all")

  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation()

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter)

  const filters = [
    { value: "all" as const, label: "All Works" },
    { value: "in-progress" as const, label: "In Progress" },
    { value: "open" as const, label: "Open for Volunteers" },
    { value: "completed" as const, label: "Completed" },
  ]

  return (
    <>
      <SiteHeader />
      <main>
        {/* Page Header */}
        <section className="py-24 px-4 sm:px-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-bold mb-6 tracking-tight animate-slide-up">Our Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-slide-up animation-delay-100">
              A collection of projects spanning community initiatives, renovations, and collaborative spaces we've
              created with our community.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 bg-background border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-6 py-2 text-sm font-medium transition-elegant ${
                    activeFilter === filter.value
                      ? "bg-foreground text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:border-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section ref={projectsRef} className="py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`group cursor-pointer transition-elegant ${
                    projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transitionDelay: projectsVisible ? `${index * 100}ms` : "0ms",
                    transform: projectsVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="mb-8">
                    <div className="text-sm font-medium text-muted-foreground mb-6 tracking-widest">
                      ({String(index).padStart(2, "0")})
                    </div>
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <Image
                        src={project.coverImage || "/placeholder.svg?height=600&width=600"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-elegant duration-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-elegant">{project.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {project.year && <span>{project.year}</span>}
                      <span className="text-xs font-medium">
                        {project.status === "in-progress" && "IN PROGRESS"}
                        {project.status === "open" && "JOIN US"}
                        {project.status === "completed" && "COMPLETED"}
                      </span>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">{project.summary}</p>

                    <div className="pt-4">
                      <div className="text-sm font-medium text-foreground group-hover:text-accent transition-elegant">
                        View project →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No projects found for this filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
