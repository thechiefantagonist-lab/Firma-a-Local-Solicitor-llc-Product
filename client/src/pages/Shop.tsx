import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Product, Review } from "@shared/schema";
import { Plus, Check, Loader2, ShoppingCart, Store, MapPin, ShieldCheck, Zap, Star, Send, MessageSquareQuote, TrendingUp, Lock, ArrowRight, ExternalLink } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import ingredientOrange from "@assets/ingredient-orange.jpg";
import ingredientLemon from "@assets/ingredient-lemon.jpg";
import ingredientChili from "@assets/ingredient-chili.jpg";
import ingredientRosemary from "@assets/ingredient-rosemary.jpg";
import flightRealPhoto from "@assets/IMG_4939_1768510547154.jpeg";

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
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-primary pt-10 pb-8 px-4 relative">
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
        <div className="flex justify-center mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
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

        <div className="bg-red-600/10 border-2 border-red-600/30 rounded-2xl p-5 sm:p-6 mb-10 text-center" data-testid="banner-market-sale">
          <p className="text-xl sm:text-2xl font-bold text-red-700">
            $17 Out the Door — Online Only
          </p>
          <p className="text-sm text-red-600/80 mt-2 max-w-xl mx-auto">
            This weekend at the San Marcos Farmers Market, every 250 ml bottle goes back to <span className="font-bold">$20</span>. Right now, you're looking at <span className="font-bold">$3 off per bottle</span> — no code, no catch. Just the price of clicking before Saturday.
          </p>
          <p className="text-xs text-red-500/70 mt-2 italic">
            Limited-time online pricing. Once market season kicks in, this deal walks.
          </p>
          <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-red-700 hover:text-red-900 transition-colors" data-testid="link-shop-instagram">
            <SiInstagram className="w-4 h-4" /> Follow @forestparker for drops & deals
          </a>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="mt-6 bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm" data-testid="banner-licensing-certificates">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Licensing & Certifications</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Processed in Texas — Verified & Documented</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Firma Forest olive oils are imported as raw product from Tunisia and processed, filtered, infused, and bottled entirely within the state of Texas. "Processed in Texas" means every step from raw oil to finished, sealed bottle — including quality control, flavor infusion, filtering, and labeling — takes place in a licensed Texas facility under full regulatory compliance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Texas DSHS Food License</p>
                <p className="text-xs text-muted-foreground">State-licensed food manufacturing facility</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Halal Certified</p>
                <p className="text-xs text-muted-foreground">Full documentation from grove to bottle</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">FDA Compliant</p>
                <p className="text-xs text-muted-foreground">Proper labeling & food safety standards</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Single-Origin Traceable</p>
                <p className="text-xs text-muted-foreground">Every bottle traced back to Tunisian groves</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-5 italic">
            All certification documents are available upon request. For wholesale or compliance inquiries, contact Sales@firmaforest.com.
          </p>
        </div>

        <div className="mt-10 bg-gradient-to-br from-primary via-[hsl(150,35%,24%)] to-[hsl(160,30%,22%)] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg" data-testid="banner-food-truck-impact">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start" data-testid="chart-impact-bars">
              <p className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4 text-center lg:text-left">After Switching to Firma Forest</p>
              <div className="w-full max-w-xs space-y-3">
                {[
                  { label: "Flavor Rating", before: 34, after: 92, suffix: "%" },
                  { label: "Repeat Customers", before: 28, after: 85, suffix: "%" },
                  { label: "Positive Reviews", before: 40, after: 96, suffix: "%" },
                  { label: "Vendor Reorders", before: 15, after: 88, suffix: "%" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white/70">{stat.label}</span>
                      <span className="text-xs font-bold text-amber-400">{stat.after}{stat.suffix}</span>
                    </div>
                    <div className="relative h-5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white/20"
                        style={{ width: `${stat.before}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                        style={{ width: `${stat.after}%`, animation: `bar-grow 1.2s ease-out forwards` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-white/30">Before: {stat.before}{stat.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/25 mt-3 text-center lg:text-left italic">Based on partner-reported data, 2025–2026</p>
            </div>

            <div className="lg:col-span-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <TrendingUp className="w-7 h-7 text-amber-400" />
                <p className="text-amber-400 text-sm uppercase tracking-widest font-bold">Proof Is in the Product</p>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-snug text-amber-400" data-testid="text-food-truck-headline">
                5+ Food Trucks Switched Their Oil. Their Customers Did the Talking.
              </h3>
              <p className="text-white/80 leading-relaxed mb-3">
                Profit went up — but that wasn't the headline. The real shift was customer feedback. People started asking what changed. Same menu, same hands, same kitchen. The only variable? The olive oil. It turns out most vendors had been working with products that were mislabeled at best and misleading at worst.
              </p>
              <p className="text-white/80 leading-relaxed mb-3">
                The issue was never the cook. It was a lack of access to real, single-origin, Tunisian-grown olive oil — unblended, preservative-free, and cold-pressed the way it's been done for generations. That information simply wasn't available until now.
              </p>
              <p className="text-white/85 leading-relaxed mb-6 font-medium">
                Every bottle is processed and sealed in South Texas. One distributor in the entire country. One man out of San Marcos with the only key to the operation.
              </p>
              <p className="text-xl sm:text-2xl font-display font-bold text-amber-400 mb-6" data-testid="text-firma-forest-tagline">
                FIRMA FOREST.
              </p>
              <div className="bg-white/[0.07] border border-white/10 rounded-xl p-5 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <p className="text-amber-400 text-xs uppercase tracking-widest font-bold">Investor & Distributor Opportunity</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  One source. One man with the only key. Demand is outpacing supply — and the right partner can help close the gap before the window does.
                </p>
                <a
                  href="/pitch"
                  className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm"
                  data-testid="link-pitch-cta"
                >
                  Submit Your Pitch <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <ReviewSection />

        {/* Local Partners Section */}
        <section className="mt-12 py-10 border-t-2 border-primary/20">
          <div className="text-center mb-8">
            <p className="text-accent text-sm uppercase tracking-widest font-semibold mb-2">Keepin' It Local</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Store className="w-8 h-8 text-accent" />
              Local Partners & Local Shelves
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're proud to partner with folks who believe in community, quality, and keepin' it real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
              name="The Culinary Room"
              location="San Marcos"
              description="Fine dining experience with locally sourced ingredients"
              url="https://theculinaryroom.com"
            />
            <PartnerCard 
              name="Yum Yum Gyros And More"
              location="San Marcos"
              description="Mediterranean street food with bold, fresh flavors"
            />
            <PartnerCard 
              name="The Austin Winery"
              location="Austin"
              description="Urban winery crafting Texas wines with local flair"
              url="https://theaustinwinery.com"
            />
            <PartnerCard 
              name="Duchman Family Winery"
              location="Driftwood"
              description="Award-winning Texas wines rooted in Italian tradition"
              url="https://duchmanwinery.com"
            />
            <PartnerCard 
              name="San Marcos Square Boutiques"
              location="Downtown on the Square"
              description="Shop local at the heart of our Hill Country town"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground italic">
              "From our grove to your table - that's the Hill Country way."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5" data-testid="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={cn("transition-colors", interactive ? "cursor-pointer" : "cursor-default")}
          data-testid={`button-star-${star}`}
        >
          <Star
            className={cn(
              "w-5 h-5",
              (hover || rating) >= star
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewSection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const createReview = useMutation({
    mutationFn: async (data: { name: string; rating: number; message: string }) => {
      await apiRequest("POST", "/api/reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      setName("");
      setRating(0);
      setMessage("");
      setSubmitted(true);
      toast({ title: "Thank you!", description: "Your review has been submitted." });
      setTimeout(() => setSubmitted(false), 4000);
    },
    onError: () => {
      toast({ title: "Oops", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) {
      toast({ title: "Hold on", description: "Please fill in your name, a star rating, and a message.", variant: "destructive" });
      return;
    }
    createReview.mutate({ name: name.trim(), rating, message: message.trim() });
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="mt-12 py-10 border-t-2 border-primary/20" data-testid="section-reviews">
      <div className="text-center mb-8">
        <p className="text-amber-600 text-sm uppercase tracking-widest font-semibold mb-2">What Folks Are Saying</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
          <MessageSquareQuote className="w-8 h-8 text-amber-500" />
          Customer Reviews
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground" data-testid="text-review-summary">
            <StarRating rating={Math.round(avgRating)} />
            <span className="font-semibold text-foreground">{avgRating.toFixed(1)}</span>
            <span>from {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm sticky top-28">
            <h3 className="font-display text-xl font-bold text-foreground mb-1">Leave a Review</h3>
            <p className="text-sm text-muted-foreground mb-6">Tried our oils? We'd love to hear from you.</p>

            {submitted ? (
              <div className="text-center py-8" data-testid="review-success">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-semibold text-foreground">Thanks for your review!</p>
                <p className="text-sm text-muted-foreground mt-1">Your feedback means the world to us.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="review-name" className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                  <input
                    id="review-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name or nickname"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    data-testid="input-review-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Rating</label>
                  <StarRating rating={rating} onRate={setRating} interactive />
                </div>

                <div>
                  <label htmlFor="review-message" className="block text-sm font-medium text-foreground mb-1.5">Your Review</label>
                  <textarea
                    id="review-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What did you think? Which flavor was your favorite?"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    data-testid="input-review-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={createReview.isPending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground shadow-md disabled:opacity-60"
                  data-testid="button-submit-review"
                >
                  {createReview.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border" data-testid="text-no-reviews">
              <MessageSquareQuote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No reviews yet — be the first!</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Your words help other neighbors discover Firma Forest.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm" data-testid={`card-review-${review.id}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{review.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm" data-testid={`text-review-name-${review.id}`}>{review.name}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    {review.createdAt && (
                      <span className="text-xs text-muted-foreground/60 shrink-0" data-testid={`text-review-date-${review.id}`}>
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-review-message-${review.id}`}>{review.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ name, location, description, url }: { name: string; location?: string; description: string; url?: string }) {
  const Wrapper = url ? "a" : "div";
  const linkProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Wrapper {...linkProps} className="bg-card rounded-lg p-6 border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 block">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-md bg-accent/20">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            {name}
            {url && <ExternalLink className="w-3.5 h-3.5 text-accent" />}
          </h3>
          {location && (
            <p className="text-xs text-primary font-bold uppercase tracking-wide">{location}</p>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Wrapper>
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
      ) : savings && Number(savings) > 0 ? (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md animate-pulse">
          $17 Online
        </div>
      ) : null}
      {isFlight ? (
        <div className="relative overflow-hidden bg-gray-50">
          <div className="grid grid-cols-2">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                data-testid={`img-product-${product.id}`}
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={flightRealPhoto}
                alt="The Flavor Flight — open gift box with all seven mini bottles"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-testid={`img-product-real-${product.id}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[5/4] overflow-hidden bg-gray-50">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          {ingredient && (
            <div className="absolute bottom-3 right-3 z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white" data-testid={`img-ingredient-${product.id}`}>
              <img src={ingredient.src} alt={ingredient.alt} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
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
                {originalPrice && productPrice < originalPrice && (
                  <span className="text-xs font-bold text-red-600" data-testid={`text-product-savings-${product.id}`}>
                    $3 off — $20 at the market this weekend
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
