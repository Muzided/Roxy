import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
          {/* About */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-foreground mb-4">About</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              A community-run center dedicated to transparency, collaboration, and creative impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-base">
              {[
                { href: "/projects", label: "Works" },
                { href: "/gallery", label: "Gallery" },
                { href: "/studio", label: "Studio" },
                { href: "/process", label: "Process" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-elegant">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-foreground mb-4">Contact</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              123 Community Street
              <br />
              City, State 12345
              <br />
              <a href="tel:+15551234567" className="hover:text-foreground transition-elegant">
                +1 (555) 123-4567
              </a>
              <br />
              <a href="mailto:hello@community.org" className="hover:text-foreground transition-elegant">
                hello@community.org
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>&copy; 2025 Roxy. All rights reserved.</p>
          <p className="text-center md:text-right">Honoring land acknowledgment • Transparency in all we do</p>
        </div>
      </div>
    </footer>
  )
}
