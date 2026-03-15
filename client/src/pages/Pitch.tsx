import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertAppointmentSchema, type InsertAppointment } from "@shared/schema";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, TrendingUp, Package, Handshake, ExternalLink, Star, MapPin, Globe } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import shelfImg1 from "@assets/IMG_6987_1772173477694.jpeg";
import shelfImg2 from "@assets/IMG_6985_1772173477694.jpeg";
import shelfImg3 from "@assets/IMG_6981_1772173477694.jpeg";
import shelfImg4 from "@assets/IMG_6984_1772173477694.jpeg";
import shelfImg5 from "@assets/IMG_6986_1772173477694.jpeg";
import shelfImg6 from "@assets/IMG_6983_1772173477694.jpeg";
import firmaBanner from "@assets/Image_2-25-26_at_10.35_AM_1772128718182.jpeg";
import familyStory from "@assets/Image_2-25-26_at_10.36_AM_(1)_1772128718182.jpeg";
import firmaSignatureGrove from "@assets/Image_2-25-26_at_11.07_AM_(1)_1772128878387.jpeg";
import singleOriginBottles from "@assets/Image_2-25-26_at_11.03_AM_(1)_1772128878387.jpeg";
import halalResearchCentre from "@assets/Image_3-8-26_at_7.44_PM_1773017490702.png";
import euOrganicBadge from "@assets/Image_3-8-26_at_7.56_PM_(2)_1773018171969.jpeg";
import pgiBadge from "@assets/Image_3-8-26_at_7.57_PM_(1)_1773018171969.jpeg";
import pdoBadge from "@assets/Image_3-8-26_at_7.57_PM_1773018171969.jpeg";

const PRODUCTS = [
  { name: "Extra Virgin Smooth", price: "$17", img: "/images/ev-smooth-bottle.png", tag: "Everyday go-to" },
  { name: "Wild Rosemary", price: "$17", img: "/images/rosemary-bottle.png", tag: "Most requested" },
  { name: "Orange Fused", price: "$17", img: "/images/orange-bottle.png", tag: "Top seller" },
  { name: "Lemon Fused", price: "$17", img: "/images/lemon-bottle.png", tag: "Dinner favorite" },
  { name: "Green Chili Pepper", price: "$17", img: "/images/green-chili-bottle.png", tag: "Bold & spicy" },
  { name: "The Flavor Flight", price: "$28", img: "/images/holiday-tree.png", tag: "Gift set" },
];

const TESTIMONIALS = [
  {
    name: "Linda — Cornucopia Market",
    quote: "We brought Firma Forest into the shop on a trial run. It sold out in four days. Forest personally restocked us and even helped set up the display.",
    stars: 5,
  },
  {
    name: "Chef Marco — I-35 Food Truck",
    quote: "Customers started commenting on the flavor within a week. We go through two bottles a weekend now and I have had zero complaints. This is the real deal.",
    stars: 5,
  },
  {
    name: "Omar — The Halal Project",
    quote: "Finding a supplier who understands Halal compliance AND delivers a product this good is rare. Sales on dishes made with his oil are consistently our top sellers.",
    stars: 5,
  },
];

export default function Pitch() {
  const { toast } = useToast();
  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: { name: "", email: "", businessName: "", phone: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      await apiRequest("POST", api.appointments.create.path, data);
    },
    onSuccess: () => {
      toast({ title: "Pitch Received", description: "Forest will review your proposal and reach out personally." });
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message || "Failed to send. Please try again.", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[hsl(150,40%,14%)] via-[hsl(150,35%,18%)] to-[hsl(160,30%,22%)] relative overflow-hidden py-20 sm:py-28 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.08]" style={{ backgroundImage: `url(${firmaBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Exclusive Access</span>
          </div>
          <a href="https://www.instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="block group" data-testid="link-pitch-instagram-hero">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Better Than the Stock Market.<br />
              More Worth Than Pokemon.<br />
              <span className="text-amber-400">Invest in Something Real, Something Original,<br className="hidden sm:block" /> Something New</span> — <span className="text-white/60 italic">for Now, Anyway.</span>
            </h1>
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 rounded-full px-5 py-2 mt-2 group-hover:bg-amber-400/25 transition-colors">
              <SiInstagram className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-bold tracking-wide">DM @forestparker to Start the Conversation</span>
            </div>
          </a>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-4 mt-8 leading-relaxed">
            Forest is the only person in the United States with direct access to the source — at distribution pricing. No middleman. No broker chain. No second key.
          </p>
          <p className="text-white/50 text-sm max-w-xl mx-auto">His story, he chooses to tell in person. Non-negotiable.</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">

        {/* ── Shelf Photos ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-20 -mt-12 relative z-10">
          {[shelfImg1, shelfImg2, shelfImg3, shelfImg4, shelfImg5, shelfImg6].map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={img} alt={`Firma Forest retail shelf ${i + 1}`} className="w-full h-full object-cover" data-testid={`img-shelf-${i}`} />
            </motion.div>
          ))}
        </div>

        {/* ── The Position ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary via-[hsl(150,35%,24%)] to-[hsl(160,30%,22%)] rounded-2xl p-8 sm:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <p className="text-amber-400 text-sm uppercase tracking-widest font-bold">The Position</p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-amber-400">Demand Is Already Here. Supply Is the Bottleneck.</h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>Firma Forest products are already moving off shelves in Central Texas retail locations. Partner vendors are reordering. Food trucks are switching their oil mid-season — and their customers are noticing. The product sells itself once it touches a pan.</p>
              <p>The constraint is not demand. It is supply infrastructure. Every bottle is sourced from a single Tunisian family estate, cold-pressed in traditional stone mills, and processed and sealed in South Texas. One origin. One pipeline. One distributor. Forest controls the entire chain from grove to shelf — and there is no second set of keys.</p>
              <p className="text-white/90 font-medium">This is not a franchise pitch or a startup looking for runway. This is an established product with proven sell-through, a direct-source relationship that took years to build, and a distribution gap that the right partner can help close before the window does.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Live Website Callout ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-16 rounded-2xl border-2 border-amber-400/40 bg-amber-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6" data-testid="banner-live-website">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-amber-400/20 flex items-center justify-center">
            <Globe className="w-7 h-7 text-amber-700" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Live Digital Infrastructure</p>
            <h3 className="font-display text-xl font-bold text-primary mb-1">The Store Is Already Open at <span className="text-amber-700">firmaforest.com</span></h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              A fully operating e-commerce storefront — product catalog, Square-integrated checkout, promo codes, delivery, live customer reviews, and a visitor counter already accumulating traffic. Built and running before this conversation.
            </p>
          </div>
          <a href="https://firmaforest.com" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-bold text-sm transition-colors shadow-md"
            data-testid="link-live-website">
            Visit Site <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* ── Product Lineup ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest font-bold text-amber-700 mb-2">What's on the Shelf</p>
            <h2 className="font-display text-3xl font-bold text-primary">6 SKUs. All Moving.</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">Single-origin Tunisian. Cold-pressed. Processed in South Texas. Priced to move at $17 online — $20 at market.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                className="bg-card rounded-2xl p-4 border border-border text-center shadow-sm hover:shadow-md transition-shadow" data-testid={`card-pitch-product-${i}`}>
                <div className="aspect-[3/4] overflow-hidden rounded-xl mb-3 bg-stone-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <p className="font-display font-bold text-primary text-xs leading-tight mb-1">{p.name}</p>
                <p className="text-amber-700 font-bold text-sm">{p.price}</p>
                <span className="inline-block mt-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{p.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Three Value Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: TrendingUp, title: "Proven Sell-Through", desc: "Retail partners are reordering within weeks. Product is consistently outselling adjacent shelf competitors at multiple locations across Central Texas." },
            { icon: Package, title: "Direct Source Pricing", desc: "No importers, no middlemen, no markup chain. Forest has the only direct relationship with the Tunisian estate — distribution pricing passes through one person." },
            { icon: Handshake, title: "Partnership, Not Equity", desc: "This is a supply partnership opportunity. Terms are negotiable. Returns are projected based on current sell-through data Forest will share in person." },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }}>
              <Card className="h-full border-primary/10 bg-primary/[0.03]">
                <CardContent className="p-6">
                  <card.icon className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="font-display text-lg font-bold text-primary mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Story Photos + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img src={firmaSignatureGrove} alt="Tunisian olive grove" className="rounded-2xl object-cover w-full aspect-square shadow-lg col-span-2" data-testid="img-pitch-grove" />
            <img src={familyStory} alt="Firma Forest story" className="rounded-2xl object-cover w-full aspect-square shadow-md" data-testid="img-pitch-family" />
            <img src={singleOriginBottles} alt="Single-origin bottles" className="rounded-2xl object-cover w-full aspect-square shadow-md" data-testid="img-pitch-bottles" />
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-amber-700 mb-2">By the Numbers</p>
              <h2 className="font-display text-3xl font-bold text-primary mb-4">The Footprint Is Real</h2>
            </div>
            {[
              { stat: "1", label: "U.S. Distributor. Forest. No one else has the key." },
              { stat: "5+", label: "Food trucks switched to Firma Forest mid-season." },
              { stat: "15+", label: "Farmers markets from Georgetown to San Antonio." },
              { stat: "4 days", label: "Time it took Cornucopia Market to sell out on trial run." },
              { stat: "4", label: "Active certifications: Halal, EU Organic, PGI, PDO." },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-start gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <span className="font-display text-3xl font-bold text-amber-600 w-20 shrink-0 leading-none">{stat}</span>
                <p className="text-muted-foreground text-sm leading-relaxed pt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications ── */}
        <div className="mb-16 bg-card rounded-2xl border border-border p-6 sm:p-8">
          <p className="text-xs uppercase tracking-widest font-bold text-primary/60 mb-5 text-center">Verified Certifications — Backed by Documentation</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            <div className="flex flex-col items-center gap-2">
              <img src={halalResearchCentre} alt="Halal Research Centre Certified" className="h-16 w-16 rounded-full object-cover border-2 border-border shadow" data-testid="img-pitch-halal" />
              <span className="text-xs text-muted-foreground font-semibold text-center">Halal Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={euOrganicBadge} alt="EU Organic" className="h-16 w-auto rounded object-contain shadow" data-testid="img-pitch-eu-organic" />
              <span className="text-xs text-muted-foreground font-semibold text-center">EU Organic</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={pgiBadge} alt="PGI Certified" className="h-16 w-16 rounded-full object-cover border-2 border-border shadow" data-testid="img-pitch-pgi" />
              <span className="text-xs text-muted-foreground font-semibold text-center">PGI Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={pdoBadge} alt="PDO Certified" className="h-16 w-16 rounded-full object-cover border-2 border-border shadow" data-testid="img-pitch-pdo" />
              <span className="text-xs text-muted-foreground font-semibold text-center">PDO Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold">Texas DSHS Food License</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold">FDA Compliant Labeling</span>
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest font-bold text-amber-700 mb-2">From the Field</p>
            <h2 className="font-display text-3xl font-bold text-primary">Real Partners. Real Results.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 * i }}>
                <Card className="h-full border-amber-200/60 bg-amber-50/40">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic mb-4">"{t.quote}"</p>
                    <p className="text-xs font-bold text-primary flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-600" />{t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Contact + Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">How to Move Forward</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6">Submit Your Pitch</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
              <p>Forest reviews every inquiry personally. If you are serious about investing in or distributing Firma Forest products, reach out with a <span className="font-semibold text-foreground">3 to 6 page pitch</span> covering:</p>
              <ul className="space-y-3">
                {[
                  "What you would like as a promised return — and over what timeline",
                  "Your proposed terms (negotiable) and the commitment level you are comfortable with",
                  "Why you feel confident enough to invest in a product that is already outpacing its own supply",
                  "Your distribution reach, network, or resources you bring to the table",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
                <p className="text-sm font-medium text-primary mb-1">The full story — the origin, the family, the operation — Forest tells in person.</p>
                <p className="text-xs text-muted-foreground">That is the one thing that is non-negotiable. The product speaks through the bottle. The vision speaks through the man behind it. Both deserve the conversation.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-primary/60 font-bold mb-2">Direct Contact</p>
              <a href="tel:7378815440" className="flex items-center gap-3 text-primary font-bold text-lg" data-testid="link-pitch-phone">
                <Phone className="w-5 h-5 text-amber-600" /> (737) 881-5440
              </a>
              <a href="mailto:Forest@localsolicitor.net" className="flex items-center gap-3 text-primary font-semibold" data-testid="link-pitch-email">
                <Mail className="w-5 h-5 text-amber-600" /> Forest@localsolicitor.net
              </a>
              <a href="https://viewmycard.io/solarcafe" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-amber-700 gap-1 pt-1" data-testid="link-digital-card">
                View Digital Card <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <Card className="shadow-xl border-primary/10 sticky top-24">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <img src={firmaLogo} alt="Firma Forest" className="w-10 h-10 rounded-lg object-contain" />
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">Start the Conversation</h3>
                  <p className="text-xs text-muted-foreground">Pitch inquiries reviewed personally by Forest</p>
                </div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Full name" {...field} data-testid="input-pitch-name" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@company.com" {...field} data-testid="input-pitch-email" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="businessName" render={({ field }) => (
                    <FormItem><FormLabel>Company / Entity</FormLabel><FormControl><Input placeholder="Business or entity name" {...field} value={field.value || ""} data-testid="input-pitch-business" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="(555) 123-4567" {...field} value={field.value || ""} data-testid="input-pitch-phone" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>Your Pitch (Summary)</FormLabel><FormControl>
                      <Textarea placeholder="Briefly outline your interest, proposed terms, and what you bring to the table. Attach your full 3-6 page pitch via email to Forest@localsolicitor.net."
                        className="min-h-[120px]" {...field} data-testid="input-pitch-message" />
                    </FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={mutation.isPending} data-testid="button-submit-pitch">
                    {mutation.isPending ? "Sending..." : "Submit Pitch Inquiry"}
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    By submitting, you agree that Forest may contact you directly to discuss your proposal.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* ── Footer Tagline ── */}
        <div className="text-center py-12 border-t border-primary/10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2">
            The opportunity is real. The window is not permanent.
          </p>
          <p className="font-display text-2xl sm:text-3xl font-bold text-primary">FIRMA FOREST.</p>
        </div>

      </div>
    </div>
  );
}
