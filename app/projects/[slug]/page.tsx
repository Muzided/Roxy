import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import ProjectDetailClient from "./project-detail-client"

interface ProjectDetailPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
