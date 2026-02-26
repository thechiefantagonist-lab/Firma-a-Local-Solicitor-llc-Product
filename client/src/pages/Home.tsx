import { Link } from "wouter";
import { ArrowRight, Star, Leaf, Users, Award, MapPin, Phone, Mail, CheckCircle2, ShoppingCart } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { Product } from "@shared/schema";
import { PartnerMap } from "@/components/PartnerMap";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import firmaBanner from "@assets/Image_2-25-26_at_10.35_AM_1772128718182.jpeg";
import familyStory from "@assets/Image_2-25-26_at_10.36_AM_(1)_1772128718182.jpeg";
import aboutUsSection from "@assets/Image_2-25-26_at_10.36_AM_1772128718182.jpeg";
import groveLife from "@assets/Image_2-25-26_at_10.37_AM_(1)_1772128718182.jpeg";
import sustainSection from "@assets/Image_2-25-26_at_10.37_AM_(2)_1772128718182.jpeg";
import pressSection from "@assets/Image_2-25-26_at_10.37_AM_1772128718182.jpeg";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#1a2332]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <img
            src={firmaBanner}
            alt="FIRMA — A Tradition of Excellence in Every Drop, Bringing the True Taste of Tunisia to Your Table."
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            data-testid="img-hero-banner"
          />
        </motion.div>
      </section>

      {/* About Us — Name Origin */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary text-center mb-12 uppercase tracking-tight"
            data-testid="heading-about-us"
          >
            About Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={aboutUsSection}
              alt="About Firma — الفيرمة means Farm in Tunisian dialect, in reference to our Grandfather Abdelkader's farm"
              className="w-full rounded-2xl shadow-xl border border-border/50"
              data-testid="img-about-origin"
            />
          </motion.div>
        </div>
      </section>

      {/* Family Story */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                From the Grove to the Table — That's How We Were Raised
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We grew up running through rows of olives, mint, onions, and carrots — just playing, just being kids. Later, at the dinner table, that same food would reappear on our plates. Picked by us. Cooked by our elders. Shared with family.
                </p>
                <p>
                  That's when food became more than food. It became memory, meaning, trust.
                </p>
                <p className="text-foreground font-semibold">
                  That's what <span className="text-primary">Firma</span> <span className="text-primary/70">الفيرمة</span> is to us — a place where flavor has a face, and every ingredient tells the story of where it came from.
                </p>
                <p className="text-sm italic text-accent">
                  From a Tunisian grove to a Texas table — bismillah, y'all.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={familyStory}
                alt="Family in the olive grove"
                className="w-full h-auto object-cover"
                data-testid="img-family-story"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where Olive Oil Is a Way of Life */}
      <section className="py-16 md:py-24 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={groveLife}
              alt="Where Olive Oil Is a Way of Life — Tunisia, over 83 million trees for 10 million souls"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-grove-life"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Tunisia is the heart of the Mediterranean — where olive trees outnumber people nearly 8 to 1. Over 83 million trees for just 10 million souls. Here, olives aren't crops. They're culture.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our story began in 1978, when our grandfather Gadour planted his first grove in Jamel. Decades later, his vision grew into the region's first modern mill. Today, we carry that legacy forward with over 200 small farms across Tunisia, working hand-in-hand with growers who dry-farm and nurture their land with patience and respect.
            </p>
            <p className="font-semibold text-primary italic text-lg">
              Less assembly line. More family line.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Picked in the Morning. Pressed by Night. */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={pressSection}
              alt="Picked in the Morning. Pressed by Night. — Cold-pressed single origin EVOO"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-press-section"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The moment an olive leaves the branch, the clock starts ticking. That's why we harvest by hand and press within hours — never days. Every olive is carefully washed, sorted, and filtered before cold pressing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No heat. No additives. No shortcuts. Just the first, purest expression of single origin EVOO. What flows out isn't oil yet — it's olive juice. Polyphenol-rich, antioxidant-packed, cold-pressed olive oil that tastes exactly as nature intended.
            </p>
            <p className="font-semibold text-accent italic text-lg">
              No heat. No rush. Just the real thing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nothing Wasted. Everything Honored. */}
      <section className="py-16 md:py-24 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={sustainSection}
              alt="Nothing Wasted. Everything Honored. — Sustainable closed-loop farming"
              className="w-full rounded-2xl shadow-xl"
              data-testid="img-sustainability"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our farmers dry-farm their olives, letting the trees drink only the rain. Between harvests, the soil rests, free from irrigation and chemicals. And when the olives are pressed? Nothing goes to waste.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Olive water is filtered and reused for irrigation</p>
              </div>
              <div className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Olive solids return to the earth as natural fertilizer</p>
              </div>
              <div className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Byproducts feed local animals</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground leading-relaxed mb-2">
              This closed-loop cycle is more than sustainability — it's respect. Respect for the land, the farmers, and the generations that will inherit both.
            </p>
            <p className="text-center font-semibold text-accent italic text-lg">
              The land gives. We give back.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Why Firma Forest?</h2>
            <p className="text-muted-foreground text-lg">
              We connect you with small-batch producers who have tended their groves for generations, ensuring purity you can taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Leaf className="w-8 h-8 text-accent" />}
              title="100% Organic & Halal"
              description="Grown without pesticides and fully Halal certified — from grove to bottle, every step is documented and verified."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-accent" />}
              title="Cold Pressed Same Day"
              description="Harvested by hand and pressed within hours at low temperatures to lock in polyphenols, antioxidants, and bold flavor."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-accent" />}
              title="Direct Trade, Fair Wages"
              description="We partner directly with over 200 Tunisian farming families — no middlemen, no shortcuts, just honest work and honest oil."
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
            <Link href="/" className="hidden sm:flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCardPreview key={product.id} product={product} />
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all shadow-lg shadow-primary/30" data-testid="link-about-shop-all">
              <ShoppingCart className="w-5 h-5" /> Shop the Full Collection
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
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Setting"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 text-center max-w-4xl mx-auto">
            <img
              src={firmaLogo}
              alt="Firma Forest"
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl mx-auto mb-6 object-contain bg-white/90 p-2"
              data-testid="img-b2b-logo"
            />
            <h2 className="font-display font-bold text-white mb-6">
              <span className="text-3xl md:text-5xl">Partner with </span>
              <span className="text-4xl md:text-6xl">F</span><span className="text-3xl md:text-4xl">IRMA</span>{" "}
              <span className="text-4xl md:text-6xl">F</span><span className="text-3xl md:text-4xl">OREST</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Are you a restaurant, local market, or boutique looking to offer premium Mediterranean products?
              Contact us now for product purchase and inventory opportunities as a local business.
            </p>

            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 text-white font-bold text-lg md:text-2xl">
                <a href="tel:7378815440" className="flex items-center justify-center gap-2 hover:text-accent transition-colors" data-testid="link-b2b-phone">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" /> 737.881.5440
                </a>
                <a href="mailto:Sales@firmaforest.com" className="flex items-center justify-center gap-2 hover:text-accent transition-colors" data-testid="link-b2b-email-sales">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" /> Sales@firmaforest.com
                </a>
                <a href="mailto:Forest@localsolicitor.net" className="flex items-center justify-center gap-2 hover:text-accent transition-colors" data-testid="link-b2b-email-forest">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" /> Forest@localsolicitor.net
                </a>
                <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-accent transition-colors" data-testid="link-b2b-instagram">
                  <SiInstagram className="w-5 h-5 md:w-6 md:h-6" /> @forestparker
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pitch" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg transition-all shadow-lg" data-testid="link-b2b-inventory">
                Inventory Opportunity
              </Link>
              <Link href="/pitch" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg transition-all shadow-lg" data-testid="link-b2b-questions">
                Product Questions?
              </Link>
            </div>
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
    <Link href="/" className="group block">
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
