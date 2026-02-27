import { Link } from "wouter";
import { cn } from "@/lib/utils";
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
import singleOriginBottles from "@assets/Image_2-25-26_at_11.03_AM_(1)_1772128878387.jpeg";
import infusedVsFused from "@assets/Image_2-25-26_at_11.04_AM_(1)_1772128878387.jpeg";
import firmaSignatureGrove from "@assets/Image_2-25-26_at_11.07_AM_(1)_1772128878387.jpeg";

const MANTRAS = [
  "Our oils are born from a way of life, not an industrial plan.",
  "Every decision we make is guided by the same care we'd give our own table.",
  "Every bottle celebrates Tunisia's rich terroir and traditions.",
  "Respecting the earth isn't a trend. It's our baseline.",
  "From harvest dates to polyphenol counts, you know exactly what's in your bottle.",
  "We pay fairly, support local growers, and empower family farms.",
  "Naturally high in antioxidants and heart-healthy fats: let the science and flavor speak.",
  "Every drop of water is filtered and returned to nourish the land, while the organic olive solids are repurposed to feed animals — closing the cycle and giving back to nature.",
];

function MantraBanner({ quotes, className }: { quotes: number[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden py-4", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex gap-6 justify-center flex-wrap max-w-6xl mx-auto px-4"
      >
        {quotes.map((i) => (
          <div
            key={i}
            className="bg-[#c8973e] text-white rounded-2xl px-6 py-8 text-center font-light text-lg md:text-xl leading-relaxed max-w-xs shadow-md"
            style={{ fontFamily: "'Georgia', serif" }}
            data-testid={`mantra-card-${i}`}
          >
            {MANTRAS[i]}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

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
            className="w-full h-auto max-h-[55vh] object-contain mx-auto"
            data-testid="img-hero-banner"
          />
        </motion.div>
      </section>

      {/* About Us — Name Origin */}
      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary text-center mb-8 uppercase tracking-tight"
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

      <MantraBanner quotes={[0, 1]} className="bg-background" />

      {/* Family Story */}
      <section className="py-10 md:py-14 bg-card">
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
      <section className="py-10 md:py-14 bg-[#f5f0e8]">
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
            className="mt-8 max-w-3xl mx-auto text-center"
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

      <MantraBanner quotes={[2, 4]} className="bg-card" />

      {/* Picked in the Morning. Pressed by Night. */}
      <section className="py-10 md:py-14 bg-card">
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
            className="mt-8 max-w-3xl mx-auto text-center"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-3xl mx-auto bg-amber-50 border-2 border-amber-300/50 rounded-2xl p-6 sm:p-8 text-center"
            data-testid="banner-about-bottled-local"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-6 h-6 text-amber-600" />
              <h4 className="font-display text-xl font-bold text-foreground">Bottled in South Texas by a San Martian</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every single bottle is processed and bottled right here in South Texas — not in some warehouse overseas. Firma Forest is the one and only U.S. distributor of these Tunisian oils, and the person behind it all is a proud local from San Marcos. From the groves of Tunisia to your table in Texas, this operation is as real and as local as it gets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nothing Wasted. Everything Honored. */}
      <section className="py-10 md:py-14 bg-[#f5f0e8]">
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
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
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

      <MantraBanner quotes={[3, 5]} className="bg-card" />

      {/* Olive Oil Education — Single Origin vs. Blended */}
      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4" data-testid="badge-olive-oil-101">
              Olive Oil 101
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4" data-testid="heading-oil-education">
              Not All Olive Oil Is Created Equal
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you think olive oil is just olive oil, buckle up. What's sitting in most Texas pantries right now might as well be motor oil compared to the real thing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <img
              src={singleOriginBottles}
              alt="FIRMA Single Origin — No Blends, No Shortcuts"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl"
              data-testid="img-single-origin-bottles"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
            >
              <h3 className="font-display text-2xl font-bold text-red-700 mb-4">
                Blended Oils: The Grocery Store Gamble
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  That bottle marked "Imported from Italy" on the shelf at H-E-B? There's a good chance it's a cocktail of oils from Spain, Greece, Tunisia, and who-knows-where-else, blended together in a warehouse to taste the same every year.
                </p>
                <p>
                  Blending smooths everything out — the terroir, the character, the soul. You get consistency, sure. But you lose the story. You lose the <span className="font-bold text-red-700">flavor that tells you exactly where it came from</span>.
                </p>
                <p className="text-sm italic">
                  It's like comparing Buc-ee's brisket to your neighbor's smoker. One's fine. The other one changes your life.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8"
            >
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Single Origin: One Grove. One Story. One Taste.
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Single-origin means every olive in that bottle came from one specific region — one grove, one harvest, one family's hands. The soil, the rain, the Tunisian sun — you can taste all of it.
                </p>
                <p>
                  The robust <span className="font-bold text-primary">Chetoui</span> olive hits with bold fruitiness and a peppery kick that wakes up your brisket. The smoother <span className="font-bold text-primary">Chemlali</span> is silky enough to drizzle on warm bread and make a grown man weep.
                </p>
                <p className="font-semibold text-primary italic">
                  Every drop is traceable, meaningful, and unmistakably Tunisian.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={infusedVsFused}
                alt="Infused vs. FUSED olive oils — the difference matters"
                className="w-full h-auto object-cover"
                data-testid="img-infused-vs-fused"
              />
            </div>
            <div>
              <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Know the Difference
              </span>
              <h3 className="font-display text-3xl font-bold text-primary mb-4">
                "Infused" Is Lazy. <a href="https://olivefreshoils.com/fused-vs-infused/" target="_blank" rel="noopener noreferrer" className="underline decoration-accent/40 hover:decoration-accent">FUSED</a> Is the Real Deal.
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Most flavored oils you've tried? They take a generic oil and dump in some extract after the fact. That's <span className="font-bold">infusion</span> — flavor sprayed on like cologne at a department store.
                </p>
                <p>
                  <span className="font-bold text-primary">FUSED</span> oils are different. The fruit — real orange, lemon, rosemary, chili — is <span className="italic">crushed together with the olives</span> at the mill. The flavor is born in the press, not added in a factory. It's married at the molecular level.
                </p>
                <p className="font-semibold text-accent">
                  Once you taste FUSED, infused just feels like a lie.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f5f0e8] rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  Beyond the Kitchen
                </span>
                <h3 className="font-display text-3xl font-bold text-primary mb-4">
                  5 Ways to Use It (That'll Make You Ditch Butter)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="font-bold text-foreground">Finish Your Steak</p>
                      <p className="text-sm text-muted-foreground">Drizzle our Rosemary FUSED oil over a hot-off-the-grill ribeye. Thank us later.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="font-bold text-foreground">Bread Dip, Reimagined</p>
                      <p className="text-sm text-muted-foreground">EV Smooth + sea salt + warm sourdough. That's it. That's the recipe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="font-bold text-foreground">Pasta Without the Guilt</p>
                      <p className="text-sm text-muted-foreground">Skip the butter. A drizzle of Lemon FUSED on warm pasta with herbs and parmesan? Chef's kiss.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="font-bold text-foreground">Dressings & Spreads</p>
                      <p className="text-sm text-muted-foreground">Whisk with vinegar for a dressing that puts ranch to shame. Or blend into hummus for richness that mayo can only dream about.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="font-bold text-foreground">Grill Everything</p>
                      <p className="text-sm text-muted-foreground">Brush Green Chili Pepper oil on veggies or chicken before grilling. Locks in moisture, crisps the edges, and adds heat that sneaks up on you.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={firmaSignatureGrove}
                  alt="Taste the Difference of True Origin — Firma Organic Signature"
                  className="w-full h-auto object-cover"
                  data-testid="img-firma-signature"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-muted-foreground mb-2">
                Nutrition experts say olive oil is loaded with monounsaturated fats and antioxidants that support heart health. But here's the kicker —
              </p>
              <p className="text-xl font-bold text-primary">
                single-origin oils have <span className="text-accent">higher concentrations</span> of polyphenols than blends. More flavor. More health. No compromise.
              </p>
              <p className="mt-4 italic text-accent font-semibold text-lg">
                Stop cooking with mystery oil. Start cooking with a story.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <MantraBanner quotes={[6, 7]} className="bg-background" />

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
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
      <section className="py-12 md:py-16 bg-background">
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
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
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
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Setting"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 text-center max-w-4xl mx-auto">
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
        <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
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
