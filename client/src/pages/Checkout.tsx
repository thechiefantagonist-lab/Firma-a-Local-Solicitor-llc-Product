import { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/hooks/use-cart";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Loader2, ShieldCheck, CreditCard, CheckCircle2, Truck, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";

declare global {
  interface Window {
    Square: any;
  }
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardInstanceRef = useRef<any>(null);
  const [isCardReady, setIsCardReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [wantsDelivery, setWantsDelivery] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "TX",
    zip: "",
    phone: "",
    email: "",
  });

  const { data: squareConfig } = useQuery<{ applicationId: string; locationId: string }>({
    queryKey: ["/api/square/config"],
  });

  const [scriptError, setScriptError] = useState(false);

  const initializeCard = useCallback(async () => {
    if (!squareConfig?.applicationId || !squareConfig?.locationId) return;
    if (cardInstanceRef.current) return;

    if (!window.Square) {
      setScriptError(true);
      return;
    }

    try {
      const payments = window.Square.payments(squareConfig.applicationId, squareConfig.locationId);
      const card = await payments.card();
      await card.attach("#square-card-container");
      cardInstanceRef.current = card;
      setIsCardReady(true);
    } catch (err) {
      console.error("Failed to initialize Square card:", err);
      toast({
        title: "Payment Setup Error",
        description: "Could not load the payment form. Please refresh and try again.",
        variant: "destructive",
      });
    }
  }, [squareConfig, toast]);

  useEffect(() => {
    if (squareConfig && items.length > 0) {
      const timer = setTimeout(initializeCard, 1000);
      return () => clearTimeout(timer);
    }
  }, [squareConfig, items.length, initializeCard]);

  useEffect(() => {
    return () => {
      if (cardInstanceRef.current) {
        try {
          cardInstanceRef.current.destroy();
        } catch (e) {}
        cardInstanceRef.current = null;
      }
    };
  }, []);

  const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);

  const validateDelivery = () => {
    if (!wantsDelivery || totalBottles < 3) return true;
    const { fullName, address, city, state, zip, phone } = deliveryInfo;
    if (!fullName.trim()) { toast({ title: "Name is required for delivery", variant: "destructive" }); return false; }
    if (!address.trim()) { toast({ title: "Street address is required", variant: "destructive" }); return false; }
    if (!city.trim()) { toast({ title: "City is required", variant: "destructive" }); return false; }
    if (!state.trim()) { toast({ title: "State is required", variant: "destructive" }); return false; }
    if (!zip.trim() || !/^\d{5}(-\d{4})?$/.test(zip.trim())) { toast({ title: "Valid ZIP code is required", variant: "destructive" }); return false; }
    if (!phone.trim() || !/^[\d\s\-().+]{7,}$/.test(phone.trim())) { toast({ title: "Valid phone number is required", variant: "destructive" }); return false; }
    return true;
  };

  const handlePayment = async () => {
    if (!cardInstanceRef.current || isProcessing) return;
    if (!validateDelivery()) return;
    setIsProcessing(true);

    try {
      const tokenResult = await cardInstanceRef.current.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message || "Card validation failed");
      }

      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const payload: any = {
        sourceId: tokenResult.token,
        items: orderItems,
      };

      if (wantsDelivery) {
        payload.delivery = {
          fullName: deliveryInfo.fullName.trim(),
          address: deliveryInfo.address.trim(),
          city: deliveryInfo.city.trim(),
          state: deliveryInfo.state.trim(),
          zip: deliveryInfo.zip.trim(),
          phone: deliveryInfo.phone.trim(),
          email: deliveryInfo.email.trim() || undefined,
        };
      }

      const res = await apiRequest("POST", "/api/square/payment", payload);

      const result = await res.json();

      if (result.success) {
        setPaymentSuccess(true);
        setOrderId(result.orderId);
        clearCart();
        toast({
          title: "Payment Successful",
          description: "Your order has been placed. Thank you!",
        });
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-card rounded-3xl p-12 border border-border shadow-lg max-w-md w-full">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Order Confirmed</h2>
          <p className="text-muted-foreground mb-2">
            Your payment was processed successfully.
          </p>
          {orderId && (
            <p className="text-sm text-muted-foreground mb-8">Order #{orderId}</p>
          )}
          <div className="space-y-3">
            <Link href="/profile">
              <button className="w-full py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all" data-testid="button-view-orders">
                View My Orders
              </button>
            </Link>
            <Link href="/shop">
              <button className="w-full py-3 rounded-xl font-semibold bg-muted text-foreground hover:bg-muted/80 transition-all" data-testid="button-continue-shopping">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !paymentSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <img src={firmaLogo} alt="Firma Forest" className="w-24 h-24 rounded-xl object-contain mb-6 opacity-30" />
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Nothing to checkout</h2>
        <p className="text-muted-foreground mb-8">Add some items to your cart first.</p>
        <Link href="/shop">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold" data-testid="button-browse-checkout">
            Browse Collection
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-4xl font-bold text-primary" data-testid="text-checkout-title">Checkout</h1>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg mb-8">
          <h3 className="font-display text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm" data-testid={`text-checkout-item-${item.id}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                </div>
                <span className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="h-px bg-border my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span data-testid="text-checkout-total">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {totalBottles >= 3 && (
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg mb-8">
          <label
            className="flex items-center gap-3 cursor-pointer select-none"
            data-testid="label-delivery-toggle"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={wantsDelivery}
                onChange={(e) => setWantsDelivery(e.target.checked)}
                className="sr-only peer"
                data-testid="checkbox-delivery"
              />
              <div className="w-6 h-6 rounded-md border-2 border-muted-foreground/40 peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
                {wantsDelivery && (
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-display text-xl font-bold">Delivery</span>
          </label>

          {wantsDelivery && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={deliveryInfo.fullName}
                  onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  data-testid="input-delivery-name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />
                  Street Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main St, Apt 4B"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  data-testid="input-delivery-address"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    City <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Austin"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    data-testid="input-delivery-city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    State <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.state}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="TX"
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all uppercase"
                    data-testid="input-delivery-state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    ZIP <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.zip}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, zip: e.target.value }))}
                    placeholder="78701"
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    data-testid="input-delivery-zip"
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(512) 555-0123"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  data-testid="input-delivery-phone"
                />
                <p className="text-xs text-muted-foreground mt-1">Required so we can reach you about your delivery</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <Mail className="w-3.5 h-3.5 inline mr-1" />
                  Email Address <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <input
                  type="email"
                  value={deliveryInfo.email}
                  onChange={(e) => setDeliveryInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  data-testid="input-delivery-email"
                />
                <p className="text-xs text-muted-foreground mt-1">For order confirmation and tracking updates</p>
              </div>
            </div>
          )}
        </div>
        )}

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-bold">Payment Details</h3>
          </div>

          <div className="mb-6">
            <div
              id="square-card-container"
              ref={cardContainerRef}
              className="min-h-[50px]"
            />
            {!isCardReady && !scriptError && (
              <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading payment form...</span>
              </div>
            )}
            {scriptError && (
              <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-sm text-center">
                Payment form could not load. Please refresh the page and try again.
              </div>
            )}
          </div>

          {import.meta.env.MODE !== 'production' && (
            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Sandbox Test Mode</p>
              <p>Use card: <span className="font-mono">4532 0123 4567 8901</span></p>
              <p>Exp: Any future date | CVV: Any 3 digits | ZIP: Any 5 digits</p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={!isCardReady || isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 ${
              !isCardReady || isProcessing
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5"
            }`}
            data-testid="button-pay"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            Payments secured by Square
          </div>
        </div>
      </div>
    </div>
  );
}
