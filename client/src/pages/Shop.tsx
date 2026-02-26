import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@shared/schema";
import { Plus, Check, Loader2, ShoppingCart, Store, MapPin, ShieldCheck, Zap } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import ingredientOrange from "@assets/ingredient-orange.jpg";
import ingredientLemon from "@assets/ingredient-lemon.jpg";
import ingredientChili from "@assets/ingredient-chili.jpg";
import ingredientRosemary from "@assets/ingredient-rosemary.jpg";

const FUSED_LINK = "https://olivefreshoils.com/fused-vs-infused/";

function renderWithFused(text: string) {
  const fusedRegex = /\bFused\b/gi;
  if (!fusedRegex.test(text)) return <>{text}</>;
  
  const parts = text.split(/\b(Fused)\b/gi);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === 'fused' ? (
          <a
            key={i}
            href={FUSED_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-[1.15em] text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors"
            data-testid="link-fused-definition"
          >
            FUSED
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function getIngredientImage(productName: string): { src: string; alt: string } | null {
  const name = productName.toLowerCase();
  if (name.includes('orange')) return { src: ingredientOrange, alt: 'Orange' };
  if (name.includes('lemon')) return { src: ingredientLemon, alt: 'Lemon' };
  if (name.includes('chili') || name.includes('pepper')) return { src: ingredientChili, alt: 'Green Chili Pepper' };
  if (name.includes('rosemary')) return { src: ingredientRosemary, alt: 'Rosemary' };
  return null;
}

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = products?.filter(p => 
    filter === "all" ? true : p.category === filter
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary pt-16 pb-12 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-1">
            <img src={firmaLogo} alt="Firma Forest" className="h-20 md:h-24 w-auto rounded-md bg-white/10 p-1" data-testid="img-shop-hero-logo" />
            <div className="text-left">
              <h1 className="font-display font-bold text-primary-foreground uppercase leading-none">
                <span className="text-4xl md:text-5xl">F</span><span className="text-2xl md:text-3xl">IRMA</span>{" "}
                <span className="text-4xl md:text-5xl">F</span><span className="text-2xl md:text-3xl">OREST</span>
              </h1>
              <p className="text-sm md:text-base font-medium text-primary-foreground/60 tracking-tight mt-1" style={{ fontStyle: 'italic' }}>Rooted in Tradition. Bottled for Texas.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex bg-card rounded-full p-1.5 shadow-lg border border-border flex-nowrap">
            {['all', 'oil', 'vinegar', 'set'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`button-filter-${cat}`}
                className={cn(
                  "px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all capitalize whitespace-nowrap",
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {cat === 'all' ? 'All Products' : cat + 's'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-red-600/10 border-2 border-red-600/30 rounded-2xl p-4 mb-10 text-center" data-testid="banner-market-sale">
          <p className="text-lg font-bold text-red-700">
            Farmers Market Special — Y'all Ain't Gonna Find This Price Anywhere Else!
          </p>
          <p className="text-sm text-red-600/80 mt-1">
            Limited-time pricing for our Central Texas neighbors. Grab a bottle (or three) before it's gone.
          </p>
          <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-red-700 hover:text-red-900 transition-colors" data-testid="link-shop-instagram">
            <SiInstagram className="w-4 h-4" /> Follow @forestparker for drops & deals
          </a>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm" data-testid="banner-halal-certified">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Halal Verified & Fully Documented</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every Firma Forest product is backed by complete Halal certification paperwork, verified from grove to bottle. Our Tunisian olive oils meet the highest standards of Islamic dietary compliance — because trust isn't optional, it's the whole point.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm" data-testid="banner-bottled-local">
            <div className="p-3 rounded-xl bg-amber-500/10 shrink-0">
              <MapPin className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Processed & Bottled Right Here in South Texas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ALL processing and bottling happens right here in South Texas — not overseas, not out of state. Firma Forest is the sole U.S. distributor of these Tunisian oils, and the man behind every bottle is a proud San Martian. From grove to your kitchen, this is as local as imported olive oil gets.
              </p>
            </div>
          </div>
        </div>

        {/* Local Partners Section */}
        <section className="mt-24 py-16 border-t-2 border-primary/20">
          <div className="text-center mb-12">
            <p className="text-accent text-sm uppercase tracking-widest font-semibold mb-2">Keepin' It Local</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Store className="w-8 h-8 text-accent" />
              Local Partners & Local Shelves
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're proud to partner with folks who believe in community, quality, and keepin' it real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PartnerCard 
              name="African Eats & Market"
              location="San Marcos"
              description="Specialty foods & international flavors for our diverse community"
            />
            <PartnerCard 
              name="Cornucopia Market"
              location="78666 - San Marcos"
              description="Your neighborhood grocery for local & organic goods"
            />
            <PartnerCard 
              name="15+ Farmers Markets"
              location="Georgetown to San Antonio"
              description="Find us every weekend along the I-35 corridor"
            />
            <PartnerCard 
              name="San Marcos Square Boutiques"
              location="Downtown on the Square"
              description="Shop local at the heart of our Hill Country town"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground italic">
              "From our grove to your table - that's the Hill Country way."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function PartnerCard({ name, location, description }: { name: string; location?: string; description: string }) {
  return (
    <div className="bg-card rounded-lg p-6 border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-md bg-accent/20">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{name}</h3>
          {location && (
            <p className="text-xs text-primary font-bold uppercase tracking-wide">{location}</p>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [, navigate] = useLocation();
  const [isAdded, setIsAdded] = useState(false);

  const isFlight = product.name.toLowerCase().includes('flight');
  const productPrice = Number(product.price);
  const ingredient = getIngredientImage(product.name);
  const originalPrice = isFlight ? null : 20.00;
  const savings = originalPrice ? ((1 - productPrice / originalPrice) * 100).toFixed(0) : null;

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product);
    setTimeout(() => navigate("/checkout"), 0);
  };

  return (
    <div className="bg-card group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 flex flex-col h-full relative">
      {isFlight ? (
        <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
          Best Value
        </div>
      ) : savings ? (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md animate-pulse">
          Market Sale!
        </div>
      ) : null}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        {ingredient && (
          <div className="absolute bottom-3 right-3 z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white" data-testid={`img-ingredient-${product.id}`}>
            <img src={ingredient.src} alt={ingredient.alt} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-bold tracking-wider text-accent uppercase mb-1 block">
            {product.category}
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {renderWithFused(product.name)}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {renderWithFused(product.description)}
          </p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/50 space-y-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through" data-testid={`text-product-original-price-${product.id}`}>
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                  ${productPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-xs font-bold text-red-600" data-testid={`text-product-savings-${product.id}`}>
                    Save ${(originalPrice - productPrice).toFixed(2)} — Texas Market Deal!
                  </span>
                )}
              </div>
            
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                data-testid={`button-add-to-cart-${product.id}`}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
                  isAdded 
                    ? "bg-green-600 text-white cursor-default" 
                    : "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              data-testid={`button-buy-now-${product.id}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
            >
              <Zap className="w-4 h-4" /> Buy Now
            </button>
          </div>
          
          {!isFlight && (
            <div className="bg-secondary/50 rounded-lg p-3 text-xs">
              <p className="font-semibold text-foreground mb-1">Business Owner Pricing</p>
              <p className="text-muted-foreground italic mb-1">Upon direct request & vetting</p>
              <p className="text-muted-foreground">
                1-2 cases: <span className="font-bold text-primary">TBD</span>
              </p>
              <p className="text-muted-foreground">
                3+ cases: <span className="font-bold text-accent">TBD</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
