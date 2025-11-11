"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function StudioPage() {
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation()
  const { ref: governanceRef, isVisible: governanceVisible } = useScrollAnimation()
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation()

  return (
    <>
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="py-24 px-4 sm:px-6 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-bold mb-6 tracking-tight animate-slide-up">Our Studio</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-slide-up animation-delay-100">
              How a community came together to reclaim agency, build trust, and create lasting change.
            </p>
          </div>
        </section>

        {/* Story Timeline */}
        <section ref={timelineRef} className="py-32 px-4 sm:px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-20 tracking-tight animate-fade-in">Our Journey</h2>

            <div className="space-y-24">
              {[
                {
                  year: "2020",
                  title: "The Beginning",
                  description:
                    "A group of neighbors recognized the need for a space where community members could have agency in decisions affecting their lives. We started with listening sessions and trust-building.",
                  image: "/volunteer-hands-working-together.jpg",
                },
                {
                  year: "2021",
                  title: "Foundation & First Projects",
                  description:
                    "We officially incorporated and launched our first projects: community gardens and youth workshops. Early wins built momentum and trust.",
                  image: "/community-garden.png",
                },
                {
                  year: "2022",
                  title: "Expansion & Partnerships",
                  description:
                    "Successful pilots led to expansion. We formalized partnerships with local organizations and secured grant funding to scale impact.",
                  image: "/community-celebration-outdoor.jpg",
                },
                {
                  year: "2023-2024",
                  title: "Sustainable Systems",
                  description:
                    "We shifted focus to sustainability: training community leaders, building feedback systems, and ensuring locally-led decision-making.",
                  image: "/mentor-mentee-relationship.jpg",
                },
              ].map((milestone, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-elegant ${
                    timelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transitionDelay: timelineVisible ? `${idx * 100}ms` : "0ms",
                    transform: timelineVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className={idx % 2 === 0 ? "order-1" : "order-2"}>
                    <div className="relative h-80 overflow-hidden bg-muted group">
                      <Image
                        src={milestone.image || "/placeholder.svg"}
                        alt={milestone.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-elegant duration-500"
                      />
                    </div>
                  </div>
                  <div className={idx % 2 === 0 ? "order-2" : "order-1"}>
                    <p className="text-sm font-bold text-foreground mb-3 tracking-widest">{milestone.year}</p>
                    <h3 className="text-3xl font-bold mb-4">{milestone.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Governance & Transparency */}
        <section ref={governanceRef} className="py-32 px-4 sm:px-6 bg-secondary">
          <div
            className={`max-w-4xl mx-auto transition-elegant ${
              governanceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDuration: "0.8s",
              transform: governanceVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h2 className="text-5xl font-bold mb-8 tracking-tight">Governance & Transparency</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              We believe transparency builds trust. Our board is composed of community members, and all major decisions
              are made collaboratively. We publish annual reports on our impact, spending, and learnings.
            </p>
            <ul className="space-y-4 text-lg">
              {[
                "Majority community-led board",
                "Monthly open community meetings",
                "Annual impact & financial reports published publicly",
                "Feedback mechanisms in every program",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-4 transition-elegant ${
                    governanceVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-10px]"
                  }`}
                  style={{
                    transitionDuration: "0.6s",
                    transitionDelay: governanceVisible ? `${idx * 50}ms` : "0ms",
                    transform: governanceVisible ? "translateX(0)" : "translateX(-10px)",
                  }}
                >
                  <span className="text-foreground font-bold mt-1">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator />

        {/* Team */}
        <section ref={teamRef} className="py-32 px-4 sm:px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 tracking-tight">Core Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Sarah Chen", role: "Executive Director" },
                { name: "Marcus Johnson", role: "Community Engagement Lead" },
                { name: "Priya Patel", role: "Programs Director" },
                { name: "David Rodriguez", role: "Partnerships Coordinator" },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className={`p-8 bg-secondary border border-border hover:border-foreground transition-elegant ${
                    teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transitionDelay: teamVisible ? `${idx * 75}ms` : "0ms",
                    transform: teamVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <p className="font-bold text-lg text-foreground">{member.name}</p>
                  <p className="text-muted-foreground mt-2">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
