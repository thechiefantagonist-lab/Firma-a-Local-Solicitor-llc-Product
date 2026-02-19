# Firma Forest - Design Guidelines

## Design Approach
**Reference-Based: Premium E-commerce**
Drawing inspiration from Olive & June, Aesop, and Shopify's premium themes. Mediterranean luxury requires sophisticated product presentation with generous whitespace, editorial-quality imagery, and refined typography that conveys artisanal craftsmanship.

## Typography Hierarchy

**SF Regular Throughout** (vary weights/sizes):
- Hero Headlines: 72px (mobile: 48px), weight 600, letter-spacing -0.02em
- Section Headers: 48px (mobile: 32px), weight 500
- Product Titles: 24px, weight 500
- Body Text: 18px (mobile: 16px), weight 400, line-height 1.6
- Labels/Meta: 14px, weight 400, uppercase tracking 0.05em for product tags
- Buttons: 16px, weight 500

## Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24, 32 for consistency
- Section padding: py-24 desktop, py-16 mobile
- Component spacing: gap-8 for grids, gap-6 for cards
- Container: max-w-7xl with px-6 mobile, px-8 desktop
- Product grids: 3 columns desktop (lg:grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile

## Core Components

**Navigation**: Fixed header with logo left, cart/account icons right, centered menu links (Products, Our Story, Regions, Wholesale). Subtle border-bottom, backdrop-blur on scroll.

**Hero Section**: Full-width image (80vh) featuring olive groves/harvest with large centered headline, subheading, primary CTA button with blurred background overlay (backdrop-blur-md, bg-white/30).

**Product Cards**: Vertical layout with square image (aspect-square), product name, origin tag (uppercase label), price, subtle border, hover: slight shadow lift.

**Featured Collection**: 2-column split (image left, content right on desktop, stack mobile). Large image showcasing bottles/production, rich descriptive text with CTA.

**Trust Section**: 4-column grid with icons: "Direct from Producers", "Lab Tested Purity", "Sustainable Farming", "Family Heritage" - icon top, centered text below.

**Product Detail**: Large image carousel left (60%), details right (40%) with breadcrumb, title, price, description, origin story, add-to-cart button, accordion for shipping/ingredients.

**Shopping Cart**: Slide-in overlay from right, product thumbnails with quantities, subtotal, checkout button.

**Footer**: 4-column layout (About, Products, Support, Newsletter signup), social icons, "A Local Solicitor LLC Product" credit in small text.

## Images

**Hero Image**: Mediterranean olive grove at golden hour, wide landscape showing rows of ancient trees with soft sunlight filtering through leaves. 1920x1080px minimum.

**Product Images**: High-quality bottle photography on white/minimal backgrounds, showing label details, oil color/clarity. Square format 800x800px.

**Collection Feature**: Hands harvesting olives or traditional pressing process, editorial style. 1200x800px horizontal.

**Regional Story**: Map-style illustration or aerial photography of Mediterranean regions (Greece, Italy, Spain). 1600x900px.

**About Section**: Family/producer portraits in olive groves, authentic documentary-style photography. 1000x1200px vertical.

**Trust Icons**: Simple line illustrations (custom or from Heroicons) representing quality, sustainability, heritage, testing.

Place images strategically: Hero (full-width), product grids (contained), collection features (alternating left/right), about section (2-column with text).