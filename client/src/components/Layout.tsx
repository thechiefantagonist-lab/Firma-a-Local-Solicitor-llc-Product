import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Menu, X, ShoppingBag, User, LogOut, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
            <Link href="/" className="group relative z-50">
              <span className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tighter uppercase">
                FIRMA Olive Oils
              </span>
              <span className="block text-[10px] md:text-xs font-medium text-muted-foreground -mt-1 tracking-normal normal-case">
                A 'Local Solicitor llc.' Product
              </span>
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
                     <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                      {user.firstName || 'Account'}
                    </Link>
                    <button 
                      onClick={() => logout()} 
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Log out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/api/login" className="text-sm font-semibold hover:text-primary transition-colors">
                    Login
                  </Link>
                )}

                <Link href="/cart" className="relative group p-2">
                  <ShoppingBag className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden z-50 p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
            <div className="flex flex-col space-y-6 text-lg font-display font-medium">
              <MobileLink href="/">Shop</MobileLink>
              <MobileLink href="/about">About</MobileLink>
              <MobileLink href="/networking">Wholesale & Partners</MobileLink>
              <MobileLink href="/cart">Cart ({itemCount})</MobileLink>
              {user ? (
                <>
                  <MobileLink href="/profile">My Profile</MobileLink>
                  <button onClick={() => logout()} className="text-left text-destructive font-medium">
                    Log Out
                  </button>
                </>
              ) : (
                <a href="/api/login" className="text-primary font-bold">Login / Sign Up</a>
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
              <h3 className="font-display text-2xl font-bold mb-1 uppercase">FIRMA Olive Oils</h3>
              <p className="text-xs font-medium text-primary-foreground/60 mb-4 tracking-tight">A 'Local Solicitor llc.' Product</p>
              <p className="text-primary-foreground/80 leading-relaxed max-w-sm">
                Born in 78666. Small-batch olive oils made for Central Texas tables. 
                From our grove to your kitchen - that's the Hill Country way.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-accent transition-colors">Shop Oils</Link></li>
                <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/networking" className="hover:text-accent transition-colors">Wholesale Partners</Link></li>
                <li><Link href="/profile" className="hover:text-accent transition-colors">My Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-4">
                <p className="text-primary-foreground/80">
                  <span className="flex items-center gap-2">
                    <span role="img" aria-label="phone">📞</span>
                    <a href="tel:7378815440" className="hover:text-accent transition-colors font-bold tracking-tight">737.881.5440</a>
                  </span>
                  <span className="flex items-center gap-2 mt-1">
                    <span role="img" aria-label="email">📧</span>
                    <a href="mailto:Thechiefantagonist@gmail.com" className="hover:text-accent transition-colors">Thechiefantagonist@gmail.com</a>
                  </span>
                </p>
                <div className="pt-2">
                  <Link href="/pitch">
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Product Questions?
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} FIRMA Olive Oils. All rights reserved.</p>
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
  
  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors relative hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground"
    )}>
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full" />
      )}
    </Link>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-2 border-b border-border/50 text-foreground hover:text-primary transition-colors">
      {children}
    </Link>
  );
}
