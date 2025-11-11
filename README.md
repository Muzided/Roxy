# Roxy Website

A clean, image-led website for a community-run center. Built with Next.js 16, TypeScript, Tailwind CSS, and featuring an interactive pan/zoom gallery and multi-step enquiry modal.

## Features

- **Homepage**: Hero section with featured projects and mission statement
- **Projects**: Filterable project grid with detailed project pages
- **Interactive Gallery**: Pan, zoom, and explore community moments on a virtual canvas
- **Lightbox Viewer**: Full-screen image viewer with keyboard navigation
- **Our Story**: Timeline of community journey with governance & transparency info
- **How We Work**: 6-step process framework with key principles
- **Multi-step Enquiry Modal**: Frontend-only form to capture volunteer/collaboration interest
- **Responsive Design**: Mobile-first, works seamlessly on all devices
- **Accessible**: WCAG AA+ contrast, keyboard navigation, semantic HTML

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography
- **UI Components**: shadcn/ui
- **Gallery**: react-zoom-pan-pinch, yet-another-react-lightbox
- **Icons**: lucide-react
- **Fonts**: next/font (Inter)

## Getting Started

### Installation

\`\`\`bash
# Clone or extract the project
cd roxy

# Install dependencies (or use shadcn CLI)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Customization

#### Edit Sample Data
- **Projects**: `data/projects.ts`
- **Gallery Items**: `data/gallery-items.ts`
- **Process Steps**: `data/process.ts`

#### Update Colors & Theme
Edit the CSS variables in `app/globals.css`:
- Primary accent (currently forest green): `--primary`
- Background: `--background`
- Foreground text: `--foreground`
- Additional neutrals and semantic colors

#### Replace Images
Place your images in `/public` and update references in:
- `app/page.tsx` (home hero, featured projects)
- `data/projects.ts` (project cover images & galleries)
- `data/gallery-items.ts` (gallery canvas items)
- `app/studio/page.tsx` (story timeline)

#### Customize Copy
- **Navigation**: Edit `navLinks` in `components/site-header.tsx`
- **Home page**: Edit `app/page.tsx`
- **Footer info**: Edit `components/site-footer.tsx`

## Project Structure

\`\`\`
app/
  layout.tsx              # Root layout with fonts
  page.tsx                # Homepage
  projects/
    page.tsx              # Projects index
    [slug]/page.tsx       # Project detail
  gallery/page.tsx        # Interactive gallery
  studio/page.tsx         # Our story
  process/page.tsx        # How we work
  globals.css             # Global styles & theme

components/
  site-header.tsx         # Sticky header with nav & enquiry trigger
  site-footer.tsx         # Footer with links & contact
  pan-canvas.tsx          # Pan/zoom gallery canvas
  lightbox.tsx            # Image lightbox modal
  enquiry-modal.tsx       # Multi-step enquiry form

data/
  projects.ts             # Project sample data
  gallery-items.ts        # Gallery sample data
  process.ts              # Process steps

types/
  project.ts
  gallery.ts
  process.ts

public/
  *.jpg, *.png            # Images
\`\`\`

## Key Features Explained

### Interactive Gallery (`/gallery`)
- Click and drag to pan across a 5000×4000px virtual canvas
- Scroll or pinch to zoom (0.5x to 4x)
- Click any image to open fullscreen lightbox
- Use arrow keys to navigate in lightbox, ESC to close
- Help overlay guides users on first visit

### Multi-Step Enquiry Modal
- 6-step form: Contact → Project Type → Location/Timeline → Resources → Experience → Story
- Client-side validation only (no API calls)
- Shows success state and closes automatically
- Accessible with keyboard navigation and ARIA labels
- Triggered from "Get Involved" button in header/footer/CTAs

### Accessibility
- Semantic HTML (main, header, nav, footer, section)
- All images have alt text
- Color contrast meets WCAG AA+ standards
- Keyboard navigation throughout (focus states visible)
- ARIA labels on form elements and buttons
- Reduced motion queries respected

## Performance Optimization

- Images use `next/image` with blur placeholders
- Lazy loading for gallery images on intersection
- Code splitting for lightbox (dynamic import)
- Tailwind CSS purges unused styles
- No external analytics or tracking

## Frontend-Only

This is a **frontend-only application**:
- No backend API routes
- No database connections
- No email integration
- Form submission shows success state locally
- All data is static and imported from local files

## Deploy

### Vercel
\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
# Deploy the `.next` directory
\`\`\`

## License

MIT

## Support

For questions or customization help, refer to the inline code comments and the `CUSTOMIZATION` section above.
