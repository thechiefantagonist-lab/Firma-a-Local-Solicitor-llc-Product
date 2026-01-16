import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@shared/schema";
import { Plus, Check, Loader2, ShoppingCart, Store, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = products?.filter(p => 
    filter === "all" ? true : p.category === filter
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary pt-24 pb-16 px-4 relative">
        <div className="absolute top-20 left-4 text-[10px] text-primary-foreground/60 leading-tight">
          <p>
            <a href="tel:7378815440" className="hover:text-primary-foreground transition-colors">737-881-5440</a>
            {" / "}
            <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">@forestparker</a>
          </p>
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-2">From the Heart of Texas Hill Country</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Shop Local. Taste Real.
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Small-batch olive oils crafted for Central Texas tables. Born in 78666, bottled with care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card rounded-full p-1.5 shadow-lg border border-border">
            {['all', 'oil', 'vinegar', 'set'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all capitalize",
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
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-card group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-bold tracking-wider text-accent uppercase mb-1 block">
            {product.category}
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground line-through">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="text-xl font-bold text-primary">
              ${(Number(product.price) - 8.70).toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
              isAdded 
                ? "bg-green-600 text-white cursor-default" 
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
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
      </div>
    </div>
  );
}
