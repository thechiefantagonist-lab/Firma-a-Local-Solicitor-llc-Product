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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Users, ExternalLink } from "lucide-react";

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
        title: "Success!",
        description: "Your pitch request has been sent. We'll be in touch soon!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Commercial Product Pitch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Partner with FIRMA Olive Oils. We bring artisanal Mediterranean excellence to your business, 
          from restaurants to local markets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-accent" />
              Why Partner with Us?
            </h2>
            <ul className="space-y-4">
              {[
                "High-margin artisanal Mediterranean products",
                "Marketing and storytelling support for your staff",
                "Exclusive flavors fused at the source",
                "Direct trade: support for family-owned groves",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Pitch Options
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold">In-Person Product Pitch</p>
                <p className="text-sm text-muted-foreground">We come to you with samples and our story.</p>
              </div>
              <div>
                <p className="font-bold">Bulk Order Consultation</p>
                <p className="text-sm text-muted-foreground">Custom pricing for high-volume requirements.</p>
              </div>
              <div>
                <p className="font-bold">Staff Tasting Event</p>
                <p className="text-sm text-muted-foreground">Educational sessions for your service team.</p>
              </div>
            </div>
          </section>

          <section className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Users className="w-5 h-5 text-accent" />
              Strategic Partnership
            </h3>
            <div className="space-y-3">
              <p className="text-sm font-medium">
                In partnership with <span className="font-bold">Local Solicitor LLC</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Contact the owner of Local Solicitor LLC for brokerage services of all olive oil purchases, contracts, products, and sales pitches.
              </p>
              <div className="pt-2">
                <p className="text-sm font-bold text-primary">Brokerage Services:</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:7378815440" className="text-accent font-bold text-lg hover:underline transition-all">
                    (737) 881-5440
                  </a>
                  <a 
                    href="https://viewmycard.io/solarcafe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors gap-1"
                  >
                    View Digital Card <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Schedule Your Pitch</CardTitle>
            <CardDescription>
              Fill out the form below and we'll contact you to confirm a time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="The Gourmet Market" {...field} value={field.value || ""} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} value={field.value || ""} />
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
                      <FormLabel>Tell us about your interest</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your business and which pitch type you're interested in..." 
                          className="min-h-[120px]"
                          {...field} 
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
                >
                  {mutation.isPending ? "Sending..." : "Request Booking"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
