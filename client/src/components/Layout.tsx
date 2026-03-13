import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Location } from "@shared/schema";
import { Menu, X, ShoppingBag, User, LogOut, Loader2, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Sun, Heart } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";

import collage1 from "@assets/IMG_4858_1768506043778.jpeg";
import collage2 from "@assets/IMG_4864_1768506043778.png";
import collage3 from "@assets/IMG_4874_1768506043778.png";
import collage4 from "@assets/IMG_4879_1768506043778.png";
import collage5 from "@assets/IMG_4881_1768506043778.png";
import collage6 from "@assets/IMG_4939_1768510547154.jpeg";
import collage7 from "@assets/IMG_4877_1768506043778.png";
import collage8 from "@assets/IMG_4865_1768506043778.png";
import collage9 from "@assets/IMG_4872_1768506043778.png";
import collage10 from "@assets/IMG_4873_1768506043778.png";
import collage11 from "@assets/IMG_4945_1768512208048.jpeg";

const collageImages = [
  { src: collage4, alt: "Firma bottles on a cozy blanket" },
  { src: collage3, alt: "Orange olive oil with ice cream" },
  { src: collage5, alt: "All four Firma flavors" },
  { src: collage6, alt: "The Flavor Flight gift box" },
  { src: collage1, alt: "Holiday bottle display" },
  { src: collage7, alt: "Smooth, Organic & Fruity trio" },
  { src: collage2, alt: "Green chili pepper oil" },
  { src: collage8, alt: "Robust in festive setting" },
  { src: collage9, alt: "Organic on silver tray" },
  { src: collage10, alt: "Robust with purple glove" },
  { src: collage11, alt: "Firma - Olive oil with a personality" },
];

const funPhrases = [
  "Small-batch goodness from the Hill Country",
  "Your neighbor's new favorite olive oil",
  "Made with love in 78666",
  "Catch us at the farmers market!",
  "Family recipes deserve family oils",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % funPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-white text-center py-1.5 text-xs sm:text-sm font-semibold tracking-wide overflow-hidden" data-testid="banner-top-marquee" role="status" aria-live="polite">
        <div className="flex items-center justify-center gap-2">
          <Sun className="w-3.5 h-3.5" />
          <span>{funPhrases[phraseIndex]}</span>
          <Sun className="w-3.5 h-3.5" />
        </div>
      </div>

      <nav
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300",
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-amber-200/50 py-2"
            : "bg-white/90 backdrop-blur-sm border-b border-amber-100/60 py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="group relative z-50 flex items-center gap-3" data-testid="link-logo-home">
              <div className="relative">
                <img 
                  src={firmaLogo} 
                  alt="Firma Forest - Olive Oils" 
                  className="h-11 md:h-14 w-auto rounded-lg object-contain ring-2 ring-amber-200/50"
                  data-testid="img-logo"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold tracking-tighter leading-tight block">
                  <span className="text-2xl md:text-3xl text-primary">F</span><span className="text-lg md:text-xl text-primary">IRMA</span>{" "}
                  <span className="text-2xl md:text-3xl text-primary">F</span><span className="text-lg md:text-xl text-primary">OREST</span>
                </span>
                <span className="block text-[9px] md:text-[10px] font-semibold text-amber-600 -mt-0.5 tracking-wide uppercase">
                  Rooted in Tradition. Bottled for Texas.
                </span>
              </div>
            </Link>

            <div className="hidden md:flex flex-col items-center" data-testid="text-texas-owned-label">
              <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest bg-primary px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                Texas-Locally Owned &amp; Backed Company
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Shop</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/networking">Wholesale & Partners</NavLink>
              
              <div className="h-6 w-px bg-amber-200 mx-2" />

              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center gap-4">
                     <Link href="/profile" className="text-sm font-medium transition-colors hover:text-amber-600" data-testid="link-profile">
                      {user.firstName || 'Account'}
                    </Link>
                    <button 
                      onClick={() => logout()} 
                      className="text-muted-foreground hover:text-amber-600 transition-colors"
                      title="Log out"
                      data-testid="button-logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/api/login" className="text-sm font-bold text-primary hover:text-amber-600 transition-colors" data-testid="link-login">
                    Login
                  </Link>
                )}

                <Link href="/cart" className="relative group p-2 hover:bg-amber-50 rounded-full transition-colors" data-testid="link-desktop-cart">
                  <ShoppingBag className="w-6 h-6 text-foreground group-hover:text-amber-600 transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md" data-testid="text-cart-count">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2 z-50">
              <Link href="/cart" className="relative p-2" data-testid="link-mobile-cart">
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                className="p-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-gradient-to-b from-white to-amber-50/50 z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
            <div className="flex flex-col space-y-6 text-lg font-display font-medium">
              <MobileLink href="/" testId="link-mobile-shop">Shop</MobileLink>
              <MobileLink href="/about" testId="link-mobile-about">About</MobileLink>
              <MobileLink href="/networking" testId="link-mobile-wholesale">Wholesale & Partners</MobileLink>
              <MobileLink href="/cart" testId="link-mobile-cart-page">Cart ({itemCount})</MobileLink>
              {user ? (
                <>
                  <MobileLink href="/profile" testId="link-mobile-profile">My Profile</MobileLink>
                  <button onClick={() => logout()} className="text-left text-destructive font-medium" data-testid="button-mobile-logout">
                    Log Out
                  </button>
                </>
              ) : (
                <a href="/api/login" className="text-amber-600 font-bold" data-testid="link-mobile-login">Login / Sign Up</a>
              )}
            </div>
            <div className="mt-8 pt-6 border-t border-amber-200/50">
              <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-600 font-medium text-sm" data-testid="link-mobile-instagram">
                <SiInstagram className="w-5 h-5" />
                Follow @forestparker
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className={cn("flex-grow", itemCount > 0 && location !== "/cart" && location !== "/checkout" ? "pb-20" : "")}>
        {children}
      </main>

      <FloatingCheckoutBar />

      <LifestyleCarousel />

      <footer className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[hsl(150,35%,22%)] via-[hsl(150,35%,28%)] to-[hsl(160,30%,24%)] text-white pt-16 pb-8">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img src={firmaLogo} alt="Firma Forest" className="h-16 w-auto rounded-lg bg-white/10 p-1 ring-2 ring-amber-400/30" data-testid="img-footer-logo" />
                  <div>
                    <h3 className="font-display font-bold text-white mb-0 uppercase">
                      <span className="text-3xl">F</span><span className="text-xl">IRMA</span>{" "}
                      <span className="text-3xl">F</span><span className="text-xl">OREST</span>
                    </h3>
                    <p className="text-xs font-semibold text-amber-300 tracking-wide">Rooted in Tradition. Bottled for Texas.</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed max-w-sm text-sm">
                  Born in 78666. Small-batch olive oils made for Central Texas tables. 
                  From our grove to your kitchen - that's the Hill Country way.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300" data-testid="link-footer-instagram-cta">
                    <SiInstagram className="w-4 h-4" />
                    @forestparker
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-amber-300 mb-4">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/" className="text-white/80 hover:text-amber-300 transition-colors flex items-center gap-2" data-testid="link-footer-shop"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />Shop Oils</Link></li>
                  <li><Link href="/about" className="text-white/80 hover:text-amber-300 transition-colors flex items-center gap-2" data-testid="link-footer-about"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />Our Story</Link></li>
                  <li><Link href="/networking" className="text-white/80 hover:text-amber-300 transition-colors flex items-center gap-2" data-testid="link-footer-wholesale"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />Wholesale Partners</Link></li>
                  <li><Link href="/profile" className="text-white/80 hover:text-amber-300 transition-colors flex items-center gap-2" data-testid="link-footer-account"><span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />My Account</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-amber-300 mb-4">Come Say Howdy</h4>
                <div className="space-y-3">
                  <a href="tel:7378815440" className="flex items-center gap-3 text-white/80 hover:text-amber-300 transition-colors text-sm group" data-testid="link-footer-phone">
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="font-bold tracking-tight">737.881.5440</span>
                  </a>
                  <a href="mailto:Sales@firmaforest.com" className="flex items-center gap-3 text-white/80 hover:text-amber-300 transition-colors text-sm group" data-testid="link-footer-email-sales">
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="break-all">Sales@firmaforest.com</span>
                  </a>
                  <a href="mailto:Forest@localsolicitor.net" className="flex items-center gap-3 text-white/80 hover:text-amber-300 transition-colors text-sm group" data-testid="link-footer-email-forest">
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="break-all">Forest@localsolicitor.net</span>
                  </a>
                  <div className="pt-3">
                    <Link href="/pitch">
                      <Button variant="outline" size="sm" className="bg-white/10 border-amber-400/30 text-white hover:bg-amber-500/20 hover:border-amber-400/50 rounded-full" data-testid="button-footer-pitch">
                        Got Questions? Let's Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <FooterPartners />

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-white/60 text-sm flex items-center justify-center gap-1.5">
                Made with <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> in San Marcos, TX
              </p>
              <p className="mt-1 text-xs text-white/40">&copy; {new Date().getFullYear()} Firma Forest. All rights reserved. Proudly 78666.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FloatingCheckoutBar() {
  const { itemCount, total } = useCart();
  const [location] = useLocation();

  if (itemCount === 0 || location === "/cart" || location === "/checkout") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 animate-in slide-in-from-bottom-4 fade-in duration-300" data-testid="floating-checkout-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-semibold" data-testid="text-floating-item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          <span className="text-primary-foreground/70">|</span>
          <span className="font-bold" data-testid="text-floating-total">${total.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 transition-colors" data-testid="link-floating-cart">
            View Cart
          </Link>
          <Link href="/checkout" className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md transition-colors" data-testid="link-floating-checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

function LifestyleCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -320 : 320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-b from-background via-amber-50/30 to-amber-100/50 py-10 overflow-hidden" data-testid="section-lifestyle-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">
            Life's Better with Good Oil
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">Swipe through - this is how we roll in Central Texas</p>
        </div>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Scroll photos left"
            data-testid="button-carousel-left"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Scroll photos right"
            data-testid="button-carousel-right"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing"
          data-testid="carousel-scroll-container"
        >
          {collageImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-center first:ml-0"
              data-testid={`carousel-item-${i}`}
            >
              <div className="w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors" data-testid="link-carousel-instagram">
          <SiInstagram className="w-4 h-4" />
          More on @forestparker
        </a>
      </div>
    </section>
  );
}

function FooterPartners() {
  const { data: locations } = useQuery<Location[]>({
    queryKey: [api.locations.list.path],
  });

  if (!locations || locations.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-8 pb-8">
      <h4 className="font-display text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Our Partners & Vendors
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2">
        {locations.map((loc) => (
          <div key={loc.id} className="text-sm text-white/60 hover:text-amber-300/80 transition-colors" data-testid={`text-footer-partner-${loc.id}`}>
            {loc.name}
          </div>
        ))}
        <div className="text-sm text-white/60" data-testid="text-footer-partner-farmers-markets">
          15+ Farmers Markets
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  const testId = `link-nav-${href.replace(/\//g, '') || 'shop'}`;
  
  return (
    <Link href={href} className={cn(
      "text-sm font-semibold transition-all relative py-1",
      isActive ? "text-primary" : "text-muted-foreground hover:text-amber-600"
    )} data-testid={testId}>
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
      )}
    </Link>
  );
}

function MobileLink({ href, children, testId }: { href: string; children: React.ReactNode; testId?: string }) {
  return (
    <Link href={href} className="block py-3 border-b border-amber-200/30 text-foreground hover:text-amber-600 transition-colors font-medium" data-testid={testId}>
      {children}
    </Link>
  );
}
