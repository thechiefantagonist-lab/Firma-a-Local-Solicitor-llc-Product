import { Link } from "wouter";
import { ArrowRight, Star, Leaf, Users, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { Product } from "@shared/schema";
import { PartnerMap } from "@/components/PartnerMap";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Olive grove landscape with sun rays */}
          <img 
            src="https://images.unsplash.com/photo-1508298716369-07ebf06797f2?q=80&w=2070&auto=format&fit=crop" 
            alt="Sunlit Olive Grove" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/90 text-accent-foreground text-sm font-bold mb-6 backdrop-blur-sm">
              Authentic Mediterranean Flavor
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Liquid Gold from <br/>
              <span className="italic text-accent">Ancient Groves</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-lg drop-shadow-md">
              Hand-harvested, cold-pressed, and bottled at the source. Experience the rich heritage of artisanal olive oil, delivered directly to your kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/30">
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/pitch" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all">
                Business Pitch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features / About Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Rooted in Tradition</h2>
            <p className="text-muted-foreground text-lg">
              We connect you with small-batch producers who have tended their groves for generations, ensuring purity you can taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-accent" />}
              title="100% Organic"
              description="Grown without pesticides, preserving the land and the authentic taste of the olive."
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8 text-accent" />}
              title="Cold Pressed"
              description="Extracted within hours of harvest at low temperatures to maintain antioxidants and flavor."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-accent" />}
              title="Direct Trade"
              description="We partner directly with farmers, ensuring fair wages and sustainable practices."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-2">Curated Selection</h2>
              <p className="text-muted-foreground">Our most loved bottles this season.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCardPreview key={product.id} product={product} />
              ))
            ) : (
              // Loading skeletons
              [1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
              ))
            )}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop" className="inline-flex items-center text-primary font-semibold">
              View Full Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-display text-4xl font-bold text-primary mb-4 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-8 h-8 text-accent" />
                Find Us Nearby
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover our products at premium local markets and authentic Mediterranean restaurants across the region.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-background border rounded-full shadow-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">Markets</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background border rounded-full shadow-sm">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Restaurants</span>
              </div>
            </div>
          </div>
          
          <PartnerMap />
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          {/* Unsplash: Restaurant table setting */}
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
            alt="Restaurant Setting" 
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Partner with OleaAuthentic
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Are you a restaurant, local market, or boutique looking to offer premium Mediterranean products? 
              We offer exclusive wholesale pricing and tasting events.
            </p>
            <Link href="/pitch" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:-translate-y-1">
              Book a Product Pitch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
      <div className="p-4 rounded-full bg-primary/5 mb-6">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ProductCardPreview({ product }: { product: Product }) {
  return (
    <Link href="/shop" className="group block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
        <div className="aspect-[4/5] overflow-hidden relative bg-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
            {product.category === 'set' ? 'Gift Set' : 'Premium Oil'}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-primary">${Number(product.price).toFixed(2)}</span>
            <span className="text-sm font-semibold text-accent group-hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
