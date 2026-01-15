import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema } from "@shared/schema";
import { useCreateAppointment } from "@/hooks/use-appointments";
import { z } from "zod";
import { Loader2, CalendarCheck, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-5 h-5 mr-3 text-accent" />
                  hello@oleaauthentic.com
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-3 text-accent" />
                  +1 (555) 123-4567
                </div>
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

              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg",
                  isPending 
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:shadow-xl hover:-translate-y-0.5"
                )}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </div>

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
