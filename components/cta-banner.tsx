import { Button } from "@/components/ui/button"

interface CTABannerProps {
  className?: string
}

export function CTABanner({ className = "" }: CTABannerProps) {
  return (
    <section className={`py-16 px-4 sm:px-6 bg-primary text-primary-foreground ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="text-lg mb-8 opacity-95">Join our community of builders, volunteers, and collaborators.</p>
        <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          Get Involved Today
        </Button>
      </div>
    </section>
  )
}
