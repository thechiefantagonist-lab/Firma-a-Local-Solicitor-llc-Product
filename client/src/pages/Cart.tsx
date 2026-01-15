import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { user } = useAuth();

  const handleCheckout = () => {
    const orderItems = items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));
    
    createOrder({ items: orderItems }, {
      onSuccess: () => clearCart()
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any authentic oils yet.</p>
        <Link href="/shop" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
           <Link href="/shop" className="p-2 hover:bg-muted rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </Link>
           <h1 className="font-display text-4xl font-bold text-primary">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl p-4 sm:p-6 border border-border/50 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-display text-xl font-bold text-foreground">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.category} • {item.description.substring(0, 30)}...</p>
                  <p className="font-bold text-primary">${Number(item.price).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 bg-muted/50 rounded-xl p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg sticky top-24">
              <h3 className="font-display text-2xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handleCheckout}
                  disabled={isPending}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20",
                    isPending 
                      ? "bg-muted text-muted-foreground" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5"
                  )}
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Checkout"}
                </button>
              ) : (
                <div className="space-y-4">
                  <Link href="/api/login">
                    <button className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg">
                      Log in to Checkout
                    </button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground">
                    You must be logged in to complete your purchase.
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
