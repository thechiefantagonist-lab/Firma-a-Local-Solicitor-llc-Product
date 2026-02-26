# Firma Forest

## Overview

Firma Forest is a full-stack e-commerce application for selling artisanal Mediterranean olive oils and vinegars. Its slogan is "Rooted in Tradition. Bottled for Texas." The platform features a product catalog, shopping cart, order management, wholesale/networking inquiry system, and partner location mapping. Built with a React frontend and Express backend, it uses PostgreSQL for data persistence and Replit Auth for user authentication.

## Recent Changes
- **Color Scheme Update (Feb 2026)**: Updated to dark forest green & blue palette. Primary: dark forest green (150 35% 28%), Accent: slate blue (215 35% 52%), Background: light sage white.
- **New Logo (Feb 2026)**: Added Firma Forest Texas/olive logo (IMG_6649) across all pages. Tagline: "Rooted in Tradition. Bottled for Texas."
- **Brand Rename (Feb 2026)**: Company renamed from "FIRMA Olive Oils" to "Firma Forest". Removed all "Local Solicitor LLC" references.
- **Mobile Improvements (Feb 2026)**: Added mobile cart icon in navbar, scrollable filter pills, improved mobile menu with data-testid attributes.
- **Icon Cleanup (Feb 2026)**: Replaced all emoji icons with Lucide React icons (Phone, Mail).
- **Contact Info**: Updated to real contact details (737.881.5440 / Sales@firmaforest.com / Forest@localsolicitor.net) across all pages. Instagram: @forestparker.
- **About/Origin Page (Feb 2026)**: Rebuilt About page with Tunisian origin story, grandfather Gadour/Abdelkader heritage, family photos, sustainability practices, cold-press process, and Halal certification. Uses 6 brand images from attached_assets.
- **Landing Page**: Shop page is now the landing page ("/"). The original home/story page is accessible at "/about".
- **Partner Locations (Feb 2026)**: Added 16 real Central Texas partner locations (restaurants, wineries, markets, cafes) to the database. Added "Our Partners" grid and interactive map to Wholesale & Partners page. Includes 15+ Farmers Markets card.
- **Square Payment Integration (Feb 2026)**: Added Square Web Payments SDK for checkout. Backend processes payments via Square Payments API. Checkout page at /checkout with card form. Orders table has paymentId field. Currently using sandbox/test mode.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for local state (cart)
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and scroll effects
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared for shared)

The frontend follows a pages-based structure with reusable hooks for data fetching (useProducts, useOrders, useAuth, useCart). Components are organized into UI primitives (shadcn/ui) and feature-specific components.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for validation
- **Authentication**: Replit Auth (OpenID Connect) with session-based authentication stored in PostgreSQL
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: esbuild for production server bundling, Vite for client

The server uses a storage abstraction layer (IStorage interface) to decouple business logic from database operations. Authentication is handled through a dedicated replit_integrations/auth module.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts (main models), shared/models/auth.ts (auth-specific)
- **Migrations**: Drizzle Kit with `db:push` for schema synchronization
- **Session Store**: PostgreSQL via connect-pg-simple

Key tables:
- `users` - User profiles (managed by Replit Auth)
- `sessions` - Session storage for authentication
- `products` - Product catalog (oils, vinegars, sets)
- `orders` / `order_items` - Order management
- `appointments` - Wholesale inquiry requests
- `locations` - Partner/store locations with coordinates

### Authentication Flow
Replit Auth provides OpenID Connect authentication. The flow:
1. User visits /api/login → redirects to Replit OAuth
2. On callback, user is upserted into the users table
3. Session stored in PostgreSQL with 7-day expiry
4. Protected routes use `isAuthenticated` middleware

## External Dependencies

### Third-Party Services
- **Replit Auth**: OpenID Connect authentication provider (configured via ISSUER_URL, REPL_ID environment variables)
- **PostgreSQL**: Database (configured via DATABASE_URL environment variable)
- **Square**: Payment processing (configured via SQUARE_ACCESS_TOKEN, SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID, SQUARE_ENVIRONMENT)

### Key Libraries
- **Database**: drizzle-orm, drizzle-zod, pg (node-postgres)
- **Auth**: openid-client, passport, express-session, connect-pg-simple
- **UI**: @radix-ui/* primitives, shadcn/ui components, lucide-react icons
- **Maps**: react-leaflet, leaflet for partner location display
- **Forms**: react-hook-form with @hookform/resolvers and zod validation

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret for session encryption
- `REPL_ID` - Replit deployment identifier (for auth)
- `ISSUER_URL` - OAuth issuer (defaults to https://replit.com/oidc)