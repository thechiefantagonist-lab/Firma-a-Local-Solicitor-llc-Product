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
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, TrendingUp, Package, Handshake, ExternalLink } from "lucide-react";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import shelfImg1 from "@assets/IMG_6987_1772173477694.jpeg";
import shelfImg2 from "@assets/IMG_6985_1772173477694.jpeg";
import shelfImg3 from "@assets/IMG_6981_1772173477694.jpeg";
import shelfImg4 from "@assets/IMG_6984_1772173477694.jpeg";
import shelfImg5 from "@assets/IMG_6986_1772173477694.jpeg";
import shelfImg6 from "@assets/IMG_6983_1772173477694.jpeg";

export default function Pitch() {
  const { toast } = useToast();
  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      await apiRequest("POST", api.appointments.create.path, data);
    },
    onSuccess: () => {
      toast({
        title: "Pitch Received",
        description: "Forest will review your proposal and reach out personally.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[hsl(150,40%,14%)] via-[hsl(150,35%,18%)] to-[hsl(160,30%,22%)] relative overflow-hidden py-20 sm:py-28 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.06]" style={{ backgroundImage: `url(${shelfImg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Exclusive Access</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            One Source. One Man.<br />
            <span className="text-amber-400">One Opportunity.</span>
          </h1>

          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Forest is the only person in the United States with direct access to the source — at distribution pricing. No middleman. No broker chain. No second key.
          </p>

          <p className="text-white/50 text-sm max-w-xl mx-auto">
            His story, he chooses to tell in person. Non-negotiable.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-20 -mt-12 relative z-10">
          {[shelfImg1, shelfImg2, shelfImg3, shelfImg4, shelfImg5, shelfImg6].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-xl aspect-[4/3]"
            >
              <img
                src={img}
                alt={`Firma Forest products on retail shelves ${i + 1}`}
                className="w-full h-full object-cover"
                data-testid={`img-shelf-${i}`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary via-[hsl(150,35%,24%)] to-[hsl(160,30%,22%)] rounded-2xl p-8 sm:p-12 text-white mb-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <p className="text-amber-400 text-sm uppercase tracking-widest font-bold">The Position</p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-amber-400">
              Demand Is Already Here. Supply Is the Bottleneck.
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Firma Forest products are already moving off shelves in Central Texas retail locations. Partner vendors are reordering. Food trucks are switching their oil mid-season — and their customers are noticing. The product sells itself once it touches a pan.
              </p>
              <p>
                The constraint is not demand. It is supply infrastructure. Every bottle is sourced from a single Tunisian family estate, cold-pressed in traditional stone mills, and processed and sealed in South Texas. One origin. One pipeline. One distributor. Forest controls the entire chain from grove to shelf — and there is no second set of keys.
              </p>
              <p className="text-white/90 font-medium">
                This is not a franchise pitch or a startup looking for runway. This is an established product with proven sell-through, a direct-source relationship that took years to build, and a distribution gap that the right partner can help close before the window does.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: TrendingUp,
              title: "Proven Sell-Through",
              desc: "Retail partners are reordering within weeks. Product is consistently outselling adjacent shelf competitors at multiple locations across Central Texas."
            },
            {
              icon: Package,
              title: "Direct Source Pricing",
              desc: "No importers, no middlemen, no markup chain. Forest has the only direct relationship with the Tunisian estate — distribution pricing passes through one person."
            },
            {
              icon: Handshake,
              title: "Partnership, Not Equity",
              desc: "This is a supply partnership opportunity. Terms are negotiable. Returns are projected based on current sell-through data Forest will share in person."
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i }}
            >
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">How to Move Forward</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6">
              Submit Your Pitch
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
              <p>
                Forest reviews every inquiry personally. If you are serious about investing in or distributing Firma Forest products, reach out with a <span className="font-semibold text-foreground">3 to 6 page pitch</span> covering:
              </p>
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
                <p className="text-sm font-medium text-primary mb-1">
                  The full story — the origin, the family, the operation — Forest tells in person.
                </p>
                <p className="text-xs text-muted-foreground">
                  That is the one thing that is non-negotiable. The product speaks through the bottle. The vision speaks through the man behind it. Both deserve the conversation.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-primary/60 font-bold mb-2">Direct Contact</p>
              <a href="tel:7378815440" className="flex items-center gap-3 text-primary font-bold text-lg" data-testid="link-pitch-phone">
                <Phone className="w-5 h-5 text-amber-600" /> (737) 881-5440
              </a>
              <a href="mailto:Sales@firmaforest.com" className="flex items-center gap-3 text-primary font-semibold" data-testid="link-pitch-email">
                <Mail className="w-5 h-5 text-amber-600" /> Sales@firmaforest.com
              </a>
              <a href="mailto:Forest@localsolicitor.net" className="flex items-center gap-3 text-muted-foreground font-semibold text-sm" data-testid="link-pitch-email-alt">
                <Mail className="w-4 h-4 text-amber-600/60" /> Forest@localsolicitor.net
              </a>
              <a
                href="https://viewmycard.io/solarcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-amber-700 gap-1 pt-1"
                data-testid="link-digital-card"
              >
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} data-testid="input-pitch-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" {...field} data-testid="input-pitch-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company / Entity</FormLabel>
                        <FormControl>
                          <Input placeholder="Business or entity name" {...field} value={field.value || ""} data-testid="input-pitch-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} value={field.value || ""} data-testid="input-pitch-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Pitch (Summary)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly outline your interest, proposed terms, and what you bring to the table. Attach your full 3-6 page pitch via email to Sales@firmaforest.com."
                            className="min-h-[140px]"
                            {...field}
                            data-testid="input-pitch-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-bold"
                    disabled={mutation.isPending}
                    data-testid="button-submit-pitch"
                  >
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

        <div className="text-center py-12 border-t border-primary/10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2">
            The opportunity is real. The window is not permanent.
          </p>
          <p className="font-display text-2xl sm:text-3xl font-bold text-primary">
            FIRMA FOREST.
          </p>
        </div>
      </div>
    </div>
  );
}