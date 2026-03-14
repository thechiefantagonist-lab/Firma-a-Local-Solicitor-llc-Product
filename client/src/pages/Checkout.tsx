import { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/hooks/use-cart";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Loader2, ShieldCheck, CreditCard, CheckCircle2, Truck, Phone, Mail, MapPin, Printer, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import firmaLogo from "@assets/IMG_6649_1771460595729.jpeg";

type CartItem = { id: number; name: string; price: string | number; quantity: number; imageUrl: string };
type DeliveryInfo = { fullName: string; address: string; city: string; state: string; zip: string; phone: string; email: string };
type ReceiptData = { items: CartItem[]; total: number; orderId: number; paymentId?: string; delivery?: DeliveryInfo | null; date: string };

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
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [receiptEmail, setReceiptEmail] = useState("");
  const [receiptPhone, setReceiptPhone] = useState("");
  const [sendingReceipt, setSendingReceipt] = useState(false);
  const [receiptSent, setReceiptSent] = useState<"email" | "phone" | null>(null);
  const [wantsDelivery, setWantsDelivery] = useState(false);
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
        setReceiptData({
          items: [...items],
          total,
          orderId: result.orderId,
          paymentId: result.paymentId,
          delivery: wantsDelivery ? { ...deliveryInfo } : null,
          date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        });
        if (wantsDelivery && deliveryInfo.email) setReceiptEmail(deliveryInfo.email);
        if (wantsDelivery && deliveryInfo.phone) setReceiptPhone(deliveryInfo.phone);
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

  const sendReceipt = async (type: "email" | "phone") => {
    if (!receiptData) return;
    const target = type === "email" ? receiptEmail.trim() : receiptPhone.trim();
    if (!target) {
      toast({ title: type === "email" ? "Enter an email address" : "Enter a phone number", variant: "destructive" });
      return;
    }
    setSendingReceipt(true);
    try {
      const receiptLines = receiptData.items
        .map(i => `${i.name} x${i.quantity} — $${(Number(i.price) * i.quantity).toFixed(2)}`)
        .join("\n");
      const receiptText = `Firma Forest Order #${receiptData.orderId}\nDate: ${receiptData.date}\n\n${receiptLines}\n\nTotal: $${receiptData.total.toFixed(2)}\n\nThank you for supporting a Texas-locally owned company!`;
      await apiRequest("POST", "/api/receipt/send", {
        orderId: receiptData.orderId,
        ...(type === "email" ? { email: receiptEmail.trim() } : { phone: receiptPhone.trim() }),
        receiptText,
      });
      setReceiptSent(type);
      toast({ title: type === "email" ? "Receipt sent to your email!" : "Receipt sent via text!", description: `Sent to ${target}` });
    } catch {
      toast({ title: "Could not send receipt", description: "Please screenshot this page as your record.", variant: "destructive" });
    } finally {
      setSendingReceipt(false);
    }
  };

  if (paymentSuccess && receiptData) {
    return (
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <h2 className="font-display text-3xl font-bold text-primary">Order Confirmed!</h2>
            <p className="text-muted-foreground text-sm mt-1">Thank you for supporting a Texas-locally owned company.</p>
          </div>

          {/* Receipt Card */}
          <div id="receipt-print-area" className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden mb-6">
            {/* Receipt Header */}
            <div className="bg-primary px-6 py-5 flex items-center gap-4">
              <img src={firmaLogo} alt="Firma Forest" className="h-14 w-14 rounded-xl object-contain bg-white/10 p-1 ring-2 ring-white/20" />
              <div>
                <h3 className="font-display font-bold text-primary-foreground text-xl uppercase tracking-tight">Firma Forest</h3>
                <p className="text-primary-foreground/70 text-xs font-medium">Rooted in Tradition. Bottled for Texas.</p>
                <p className="text-primary-foreground/60 text-[10px] mt-0.5">Forest@localsolicitor.net · 737.881.5440</p>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Order Meta */}
              <div className="flex justify-between text-sm flex-wrap gap-2">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Order</p>
                  <p className="font-bold text-foreground text-lg" data-testid="text-receipt-order-id">#{receiptData.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Date</p>
                  <p className="font-medium text-foreground" data-testid="text-receipt-date">{receiptData.date}</p>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Items */}
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-3">Items Purchased</p>
                <div className="space-y-3">
                  {receiptData.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3" data-testid={`text-receipt-item-${item.id}`}>
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${Number(item.price).toFixed(2)} × {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm shrink-0">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground text-lg">Total Paid</span>
                <span className="font-bold text-primary text-2xl" data-testid="text-receipt-total">${receiptData.total.toFixed(2)}</span>
              </div>

              {/* Delivery Info */}
              {receiptData.delivery && (
                <>
                  <div className="h-px bg-border" />
                  <div>
                    <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-2 flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Delivery To</p>
                    <p className="text-sm font-medium text-foreground">{receiptData.delivery.fullName}</p>
                    <p className="text-sm text-muted-foreground">{receiptData.delivery.address}</p>
                    <p className="text-sm text-muted-foreground">{receiptData.delivery.city}, {receiptData.delivery.state} {receiptData.delivery.zip}</p>
                    <p className="text-sm text-muted-foreground">{receiptData.delivery.phone}</p>
                  </div>
                </>
              )}

              {/* Payment ID */}
              {receiptData.paymentId && (
                <p className="text-[10px] text-muted-foreground/60 font-mono break-all">Ref: {receiptData.paymentId}</p>
              )}
            </div>
          </div>

          {/* Send Receipt Section */}
          <div className="bg-card rounded-3xl border border-border shadow-lg px-6 py-5 mb-6">
            <p className="font-semibold text-foreground mb-4 flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> Send Receipt (optional)</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={receiptEmail}
                    onChange={(e) => setReceiptEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    data-testid="input-receipt-email"
                  />
                  <button
                    onClick={() => sendReceipt("email")}
                    disabled={sendingReceipt || receiptSent === "email"}
                    className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 hover:bg-primary/90 transition-all shrink-0"
                    data-testid="button-send-receipt-email"
                  >
                    {sendingReceipt ? <Loader2 className="w-4 h-4 animate-spin" /> : receiptSent === "email" ? "✓ Sent" : "Send"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1"><Phone className="w-3 h-3" /> Text / SMS</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={receiptPhone}
                    onChange={(e) => setReceiptPhone(e.target.value)}
                    placeholder="(512) 555-0123"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    data-testid="input-receipt-phone"
                  />
                  <button
                    onClick={() => sendReceipt("phone")}
                    disabled={sendingReceipt || receiptSent === "phone"}
                    className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 hover:bg-primary/90 transition-all shrink-0"
                    data-testid="button-send-receipt-phone"
                  >
                    {sendingReceipt ? <Loader2 className="w-4 h-4 animate-spin" /> : receiptSent === "phone" ? "✓ Sent" : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-xl font-semibold border border-border bg-muted text-foreground hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
              data-testid="button-print-receipt"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
            <Link href="/profile">
              <button className="w-full py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all" data-testid="button-view-orders">
                View My Orders
              </button>
            </Link>
            <Link href="/">
              <button className="w-full py-3 rounded-xl font-semibold bg-muted text-foreground hover:bg-muted/80 transition-all" data-testid="button-continue-shopping">
                Continue Shopping
              </button>
            </Link>
          </div>

          {/* Print styles */}
          <style>{`
            @media print {
              body > *:not(#root) { display: none; }
              nav, footer, .floating-checkout-bar { display: none !important; }
              #receipt-print-area { box-shadow: none !important; border: 1px solid #ccc !important; }
            }
          `}</style>
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
        <Link href="/">
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
