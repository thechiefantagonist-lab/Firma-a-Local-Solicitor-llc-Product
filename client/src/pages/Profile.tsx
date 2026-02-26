import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { Link } from "wouter";
import { Loader2, Package, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: orders, isLoading: isOrdersLoading } = useOrders();

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
        <Link href="/api/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl p-8 border border-border shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-display font-bold text-primary">
             {user.firstName?.[0] || user.email?.[0] || "U"}
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-3xl font-bold mb-2">Welcome back, {user.firstName || 'Friend'}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Order History */}
        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
          <Package className="w-6 h-6 text-accent" /> Order History
        </h2>

        {isOrdersLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" /></div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-lg">Order #{order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {order.createdAt && format(new Date(order.createdAt), "PPP")}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-primary">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
