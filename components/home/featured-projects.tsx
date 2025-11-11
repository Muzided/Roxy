"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { Project } from "@/types/project"

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation()

  return (
    <section ref={projectsRef} className="py-32 px-4 sm:px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-24 transition-elegant ${
            projectsVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transform: projectsVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">Featured Works</h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            From thoughtful renovations to innovative community spaces, each project reflects our commitment to
            design excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group cursor-pointer transition-elegant ${
                projectsVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: projectsVisible ? `${index * 100}ms` : "0ms",
                transform: projectsVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                willChange: "transform, opacity",
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
                <h3 className="text-2xl font-bold group-hover:text-accent transition-elegant tracking-tight">
                  {project.title}
                </h3>
                {project.year && <p className="text-sm text-muted-foreground font-medium">{project.year}</p>}
                <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">{project.summary}</p>
                <div className="pt-4">
                  <div className="text-sm font-medium text-foreground group-hover:text-accent transition-elegant">
                    View project →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-elegant font-medium bg-transparent"
          >
            <Link href="/projects">See All Works</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

