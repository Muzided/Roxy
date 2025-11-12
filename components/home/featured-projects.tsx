"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { Project } from "@/types/project"
import { AnimatedImage } from "@/components/animations/animated-image"
import { AnimatedHeading } from "@/components/animations/animated-heading"
import { AnimatedText } from "@/components/animations/animated-text"

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation()

  return (
    <section ref={projectsRef} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 lg:mb-24">
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight" delay={0.2}>
            Featured Works
          </AnimatedHeading>
          <AnimatedText delay={0.4}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
              From thoughtful renovations to innovative community spaces, each project reflects our commitment to
              design excellence.
            </p>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
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
                  <AnimatedImage
                    src={project.coverImage || "/placeholder.svg?height=600&width=600"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-elegant duration-500"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-elegant tracking-tight">
                  {project.title}
                </h3>
                {project.year && <p className="text-xs sm:text-sm text-muted-foreground font-medium">{project.year}</p>}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">{project.summary}</p>
                <div className="pt-4">
                  <div className="text-sm font-medium text-foreground group-hover:text-accent transition-elegant">
                    View project →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-24 text-center">
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

