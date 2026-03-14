import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, Location } from "@shared/schema";
import { useCreateAppointment } from "@/hooks/use-appointments";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";
import { Loader2, CalendarCheck, Phone, Mail, MapPin, Store, Grape, Coffee, ShoppingBag, Calendar } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { cn } from "@/lib/utils";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";
import { PartnerMap } from "@/components/PartnerMap";

// Make sure businessName is treated as optional string in the form
const formSchema = insertAppointmentSchema.extend({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Networking() {
  const { mutate, isPending } = useCreateAppointment();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      message: "",
      phone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary relative overflow-hidden py-24 px-4">
        {/* Abstract Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <img 
            src={firmaLogo} 
            alt="Firma Forest" 
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl mx-auto mb-6 object-contain bg-white/90 p-2"
            data-testid="img-networking-logo"
          />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Wholesale & Networking
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Join our network of premium retailers, restaurants, and markets. 
            Let's bring authentic Mediterranean flavors to your customers together.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div>
            <h2 className="font-display text-3xl font-bold text-primary mb-8">Why Partner With Us?</h2>
            
            <div className="space-y-8">
              <Benefit 
                title="Exclusive Access" 
                description="Get first pick of our limited seasonal harvest and rare varietals not available to the general public."
              />
              <Benefit 
                title="Marketing Support" 
                description="We provide beautiful point-of-sale materials and digital assets to help tell the story of our oils."
              />
              <Benefit 
                title="Tasting Events" 
                description="Book private tasting sessions for your staff or customers to learn the art of olive oil appreciation."
              />
            </div>

            <div className="mt-12 p-8 bg-secondary/30 rounded-2xl border border-secondary">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Contact Directly</h3>
              <div className="space-y-4">
                <a href="tel:7378815440" className="flex items-center text-muted-foreground hover:text-foreground transition-colors" data-testid="link-network-phone">
                  <Phone className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                  737.881.5440
                </a>
                <a href="mailto:Forest@localsolicitor.net" className="flex items-center text-muted-foreground hover:text-foreground transition-colors" data-testid="link-network-email-sales">
                  <Mail className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                  <span className="break-all">Forest@localsolicitor.net</span>
                </a>
                <a href="https://instagram.com/forestparker" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-foreground transition-colors" data-testid="link-network-instagram">
                  <SiInstagram className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                  @forestparker
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border/50">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Request a Consultation</h3>
            <p className="text-muted-foreground mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  label="Contact Name" 
                  placeholder="John Doe" 
                  error={form.formState.errors.name?.message}
                  {...form.register("name")} 
                />
                <FormInput 
                  label="Business Name (Optional)" 
                  placeholder="Market or Restaurant Name" 
                  error={form.formState.errors.businessName?.message}
                  {...form.register("businessName")} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  label="Email Address" 
                  type="email" 
                  placeholder="john@example.com" 
                  error={form.formState.errors.email?.message}
                  {...form.register("email")} 
                />
                <FormInput 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  error={form.formState.errors.phone?.message}
                  {...form.register("phone")} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Message / Inquiry</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Tell us about your business and what you're looking for..."
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                )}
              </div>

              <div className="relative w-full flex justify-center pt-2">
                <svg
                  className={cn(
                    "absolute -top-1 right-[calc(50%-60px)] w-8 h-8 drop-shadow-sm transition-all duration-300 origin-bottom-right",
                    isPending ? "text-muted-foreground/40" : "text-green-600 group-hover:rotate-[-8deg]"
                  )}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 28C16 28 8 22 6 14C5 10 7 6 11 5C13 4.3 15 5 16 6C17 5 19 4.3 21 5C25 6 27 10 26 14C24 22 16 28 16 28Z"
                    fill="currentColor"
                    opacity="0.25"
                  />
                  <path
                    d="M16 6C16 6 14 12 16 20"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M12 10C12 10 14 12 16 12M20 9C20 9 18 11 16 12"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
                <button
                  type="submit"
                  disabled={isPending}
                  data-testid="button-submit-consultation"
                  className={cn(
                    "group w-full py-4 font-bold text-lg transition-all duration-300 shadow-lg relative overflow-hidden",
                    "olive-button",
                    isPending 
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]"
                  )}
                  style={{
                    borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%",
                  }}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Request
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Book an Appointment Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-4">
              <Calendar className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display text-3xl font-bold text-primary mb-3">Book an Appointment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Schedule a tasting, consultation, or meeting directly. Pick a time that works for you and we'll take care of the rest.
            </p>
          </div>
          <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border/50 p-6 md:p-10">
            <SquareAppointmentsWidget />
          </div>
        </div>
      </div>

      {/* Current Partners Section */}
      <div className="bg-secondary/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-primary mb-3">Our Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find Firma Forest olive oils at these locations across Central Texas, plus 15+ farmers markets throughout the region.
            </p>
          </div>

          <PartnersGrid />

          <div className="mt-12">
            <PartnerMap />
          </div>
        </div>
      </div>
    </div>
  );
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'winery': return Grape;
    case 'cafe': return Coffee;
    case 'market': return ShoppingBag;
    default: return Store;
  }
}

function PartnersGrid() {
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: [api.locations.list.path],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {locations?.map((loc) => {
        const Icon = getTypeIcon(loc.type);
        return (
          <div
            key={loc.id}
            className="flex items-start gap-3 p-4 bg-card rounded-md border border-border/50"
            data-testid={`card-partner-${loc.id}`}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-foreground leading-tight">{loc.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{loc.address}</p>
            </div>
          </div>
        );
      })}
      <div
        className="flex items-start gap-3 p-4 bg-primary/5 rounded-md border border-primary/20"
        data-testid="card-partner-farmers-markets"
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-foreground leading-tight">15+ Farmers Markets</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">Throughout Central Texas, weekly</p>
        </div>
      </div>
    </div>
  );
}

function Benefit({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        <CalendarCheck className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-lg text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SquareAppointmentsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://square.site/appointments/buyer/widget/2r93bpx19xj7eu/LRAV2MZ0XB0HZ.js";
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        const scripts = containerRef.current.querySelectorAll("script");
        scripts.forEach((s) => s.remove());
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="widget-square-appointments" />;
}

function FormInput({ label, error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input 
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all",
          error && "border-destructive focus:border-destructive focus:ring-destructive/10",
          className
        )}
        {...props} 
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
