"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EnquiryModal } from "@/components/enquiry-modal"
import { projects } from "@/data/projects"
import { useState } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { WhatWeStandFor } from "@/components/home/what-we-stand-for"
import { OurVision } from "@/components/home/our-vision"
import { WhyIntergenerational } from "@/components/home/why-intergenerational"
import { WhatsHappening } from "@/components/home/whats-happening"
import { RenovationAtGlance } from "@/components/home/renovation-at-glance"
import { GetInvolved } from "@/components/home/get-involved"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { TransparencyBadge } from "@/components/home/transparency-badge"
import { FooterFacts } from "@/components/home/footer-facts"

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const [involvedOpen, setInvolvedOpen] = useState(false)

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection onGetInvolvedClick={() => setInvolvedOpen(true)} />
        <WhatWeStandFor />
        <OurVision />
        <WhyIntergenerational />
        <WhatsHappening />
        {/* <RenovationAtGlance /> */}
        {/* <GetInvolved onOpenModal={() => setInvolvedOpen(true)} /> */}
        <FeaturedProjects projects={featuredProjects} />
        <TransparencyBadge />
        <FooterFacts />
      </main>
      <SiteFooter />
      <EnquiryModal open={involvedOpen} onOpenChange={setInvolvedOpen} />
    </>
  )
}
