import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Menu, X, ShoppingBag, User, LogOut, Loader2, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="group relative z-50 flex items-center gap-3" data-testid="link-logo-home">
              <img 
                src={firmaLogo} 
                alt="Firma Forest - Olive Oils" 
                className="h-11 md:h-14 w-auto rounded-md object-contain"
                data-testid="img-logo"
              />
              <div className="hidden sm:block">
                <span className="font-display font-bold text-primary tracking-tighter leading-tight block">
                  <span className="text-2xl md:text-3xl">F</span><span className="text-lg md:text-xl">IRMA</span>{" "}
                  <span className="text-2xl md:text-3xl">F</span><span className="text-lg md:text-xl">OREST</span>
                </span>
                <span className="block text-[9px] md:text-[10px] font-medium text-muted-foreground -mt-0.5 tracking-normal normal-case">
                  Rooted in Tradition. Bottled for Texas.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Shop</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/networking">Wholesale & Partners</NavLink>
              
              <div className="h-6 w-px bg-border mx-2" />

              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center gap-4">
                     <Link href="/profile" className="text-sm font-medium transition-colors" data-testid="link-profile">
                      {user.firstName || 'Account'}
                    </Link>
                    <button 
                      onClick={() => logout()} 
                      className="text-muted-foreground transition-colors"
                      title="Log out"
                      data-testid="button-logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/api/login" className="text-sm font-semibold transition-colors" data-testid="link-login">
                    Login
                  </Link>
                )}

                <Link href="/cart" className="relative group p-2" data-testid="link-desktop-cart">
                  <ShoppingBag className="w-6 h-6 text-foreground transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm" data-testid="text-cart-count">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2 z-50">
              <Link href="/cart" className="relative p-2" data-testid="link-mobile-cart">
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
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
                <a href="/api/login" className="text-primary font-bold" data-testid="link-mobile-login">Login / Sign Up</a>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={firmaLogo} alt="Firma Forest" className="h-16 w-auto rounded-md bg-white/10 p-1" data-testid="img-footer-logo" />
                <div>
                  <h3 className="font-display font-bold text-primary-foreground mb-0 uppercase">
                    <span className="text-3xl">F</span><span className="text-xl">IRMA</span>{" "}
                    <span className="text-3xl">F</span><span className="text-xl">OREST</span>
                  </h3>
                  <p className="text-xs font-medium text-primary-foreground/60 tracking-tight">Rooted in Tradition. Bottled for Texas.</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed max-w-sm text-sm">
                Born in 78666. Small-batch olive oils made for Central Texas tables. 
                From our grove to your kitchen - that's the Hill Country way.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-shop">Shop Oils</Link></li>
                <li><Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-about">About Us</Link></li>
                <li><Link href="/networking" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-wholesale">Wholesale Partners</Link></li>
                <li><Link href="/profile" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-account">My Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">Contact</h4>
              <div className="space-y-3">
                <a href="tel:7378815440" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm" data-testid="link-footer-phone">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="font-bold tracking-tight">737.881.5440</span>
                </a>
                <a href="mailto:Thechiefantagonist@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm" data-testid="link-footer-email">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">Thechiefantagonist@gmail.com</span>
                </a>
                <div className="pt-2">
                  <Link href="/pitch">
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white" data-testid="button-footer-pitch">
                      Product Questions?
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Firma Forest. All rights reserved.</p>
            <p className="mt-1 text-xs">Proudly based in San Marcos, TX (78666) - Heart of the Hill Country</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  const testId = `link-nav-${href.replace(/\//g, '') || 'shop'}`;
  
  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors relative",
      isActive ? "text-primary" : "text-muted-foreground"
    )} data-testid={testId}>
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full" />
      )}
    </Link>
  );
}

function MobileLink({ href, children, testId }: { href: string; children: React.ReactNode; testId?: string }) {
  return (
    <Link href={href} className="block py-2 border-b border-border/50 text-foreground transition-colors" data-testid={testId}>
      {children}
    </Link>
  );
}
