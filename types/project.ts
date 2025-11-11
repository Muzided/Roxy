export type Project = {
  slug: string
  title: string
  year?: number
  status: "in-progress" | "open" | "completed"
  location?: string
  coverImage: string
  gallery: Array<{
    src: string
    alt?: string
    w?: number
    h?: number
    caption?: string
  }>
  collaborators?: Array<{
    name: string
    url?: string
    role?: string
  }>
  summary?: string
}
