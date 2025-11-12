"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnquiryModal } from "@/components/enquiry-modal"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Works" },
  { href: "/gallery", label: "Gallery" },
  // { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={` top-0 z-40 transition-elegant `
       }
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
          <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-60 transition-elegant">
            <span className="text-foreground">Roxy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-elegant relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => setEnquiryOpen(true)}
              className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant text-sm font-medium"
            >
              Enquiry
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:opacity-60 transition-elegant"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground hover:text-accent transition-elegant"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setEnquiryOpen(true)
                  setMobileOpen(false)
                }}
                className="w-full bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant mt-2"
              >
                Enquiry
              </Button>
            </div>
          </div>
        )}
      </header>

      <EnquiryModal open={enquiryOpen} onOpenChange={setEnquiryOpen} />
    </>
  )
}
