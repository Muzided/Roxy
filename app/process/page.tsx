"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { processSteps } from "@/data/process"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ProcessPage() {
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation()
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollAnimation()

  return (
    <>
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="py-24 px-4 sm:px-6 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-bold mb-6 tracking-tight animate-slide-up">How We Work</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-slide-up animation-delay-100">
              Our approach is rooted in listening, co-design, and transparency. Here's how we tackle every challenge.
            </p>
          </div>
        </section>

        <section ref={stepsRef} className="py-32 px-4 sm:px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative transition-elegant ${
                    stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transitionDelay: stepsVisible ? `${idx * 100}ms` : "0ms",
                    transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  {/* Vertical connector line (hidden on mobile) */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-24 h-20 border-l border-border" />
                  )}

                  <div className="flex gap-8 md:gap-12">
                    {/* Step number circle */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-2xl transform transition-transform hover:scale-110">
                        {step.order}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow pt-2 pb-4">
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section ref={principlesRef} className="py-32 px-4 sm:px-6 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 tracking-tight">Key Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Community-Led",
                  description: "The community defines priorities, not external experts or bureaucrats.",
                },
                {
                  title: "Transparent",
                  description: "All data, decisions, and learnings are shared openly and regularly.",
                },
                {
                  title: "Equitable",
                  description: "We actively work to center the voices most impacted by our work.",
                },
                {
                  title: "Sustainable",
                  description: "We build systems and train leaders for long-term local ownership.",
                },
              ].map((principle, idx) => (
                <div
                  key={idx}
                  className={`p-8 bg-background border border-border hover:border-foreground transition-elegant ${
                    principlesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDuration: "0.8s",
                    transitionDelay: principlesVisible ? `${idx * 100}ms` : "0ms",
                    transform: principlesVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
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
