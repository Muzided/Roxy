import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "community-garden",
    title: "Urban Community Garden",
    year: 2024,
    status: "in-progress",
    location: "Downtown",
    coverImage: "/community-garden-green-space-urban.jpg",
    summary:
      "Transforming vacant lots into thriving green spaces for the community. Join us in planting, maintaining, and harvesting.",
    gallery: [
      {
        src: "/community-garden.png",
        alt: "Garden preparation",
        caption: "Initial site preparation",
      },
      {
        src: "/volunteers-planting-seeds.jpg",
        alt: "Volunteers planting",
        caption: "Community members participating",
      },
    ],
    collaborators: [
      { name: "Local Green Initiative", role: "Partner" },
      { name: "City Parks", role: "Support" },
    ],
  },
  {
    slug: "youth-workshop",
    title: "Youth Creative Workshop",
    year: 2024,
    status: "open",
    location: "Roxy",
    coverImage: "/youth-workshop-creative-arts.jpg",
    summary:
      "A safe space for young people to explore art, music, and digital media. Volunteers needed for mentorship and facilitation.",
    gallery: [
      {
        src: "/young-people-art-workshop.jpg",
        alt: "Art in progress",
        caption: "Students at work",
      },
    ],
    collaborators: [{ name: "Arts Foundation", role: "Grant Partner" }],
  },
  {
    slug: "wellness-program",
    title: "Community Wellness Program",
    year: 2023,
    status: "completed",
    location: "Multiple Locations",
    coverImage: "/wellness-health-community.jpg",
    summary: "Free wellness sessions including yoga, meditation, and health education for all community members.",
    gallery: [
      {
        src: "/yoga-outdoor-class-wellness.jpg",
        alt: "Outdoor yoga session",
        caption: "Morning wellness gathering",
      },
    ],
    collaborators: [{ name: "Health Department", role: "Partner" }],
  },
]
