import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

// ── Types ────────────────────────────────────────────────
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  diet: "veg" | "nonveg";
}

interface OrderState {
  orderId: string;
  total: number;
  restaurant: string;
  address: string;
  payment: string;
  items: OrderItem[];
}

// ── Tracking steps (hardcoded demo — "Preparing" is active) ──
const trackingSteps = [
  { id: "placed",    label: "Order Placed",    sub: "We received your order",          done: true,  active: false },
  { id: "confirmed", label: "Order Confirmed", sub: "Restaurant accepted the order",   done: true,  active: false },
  { id: "preparing", label: "Being Prepared",  sub: "Chef is working on your food",    done: false, active: true  },
  { id: "pickup",    label: "Out for Delivery", sub: "Rider will pick up shortly",     done: false, active: false },
  { id: "delivered", label: "Delivered",        sub: "Enjoy your meal!",               done: false, active: false },
];

// ── Main Component ───────────────────────────────────────
export default function OrderTracking() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state as OrderState | null;

  // ── No order state guard ─────────────────────────────
  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="text-xl font-extrabold text-zinc-900 mb-2">
          No active order
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          Place an order first to track it here.
        </p>
        <Button onClick={() => navigate("/customer")}>
          Explore Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]">

      {/* ── Header ── */}
      <header className="bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-extrabold text-zinc-900 text-lg">
            Order Tracking
          </h1>
          <span className="text-xs font-bold text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Live
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4 pb-10">

        {/* ── Order ID banner ── */}
        <div className="text-center py-2">
          <p className="text-xs text-zinc-400 font-semibold tracking-widest uppercase mb-1">
            Order ID
          </p>
          <p className="text-2xl font-extrabold text-zinc-900">
            {order.orderId}
          </p>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            {order.restaurant}
          </p>
        </div>

        {/* ── Live status tracker ── */}
        <Card padding="lg">
          <h3 className="font-extrabold text-zinc-900 text-sm mb-5">
            Order Status
          </h3>
          <div className="space-y-0">
            {trackingSteps.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-4">
                {/* Dot + connector line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                      step.done
                        ? "bg-green-500 text-white"
                        : step.active
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-100 text-zinc-400",
                    ].join(" ")}
                  >
                    {step.done ? "✓" : step.active ? "●" : "○"}
                  </div>
                  {idx < trackingSteps.length - 1 && (
                    <div
                      className={[
                        "w-0.5 h-8 mt-0.5",
                        step.done ? "bg-green-300" : "bg-zinc-100",
                      ].join(" ")}
                    />
                  )}
                </div>

                {/* Label */}
                <div className="pt-1 pb-5">
                  <p
                    className={[
                      "text-sm font-bold leading-none",
                      step.done || step.active
                        ? "text-zinc-900"
                        : "text-zinc-400",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                  <p
                    className={[
                      "text-xs mt-0.5",
                      step.active
                        ? "text-orange-500 font-semibold"
                        : step.done
                        ? "text-zinc-400"
                        : "text-zinc-300",
                    ].join(" ")}
                  >
                    {step.active ? `${step.sub} ⏳` : step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Estimated time */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mt-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-400 font-semibold">
                Estimated arrival
              </p>
              <p className="text-base font-extrabold text-orange-600 mt-0.5">
                30–40 min
              </p>
            </div>
            <span className="text-3xl">🛵</span>
          </div>
        </Card>

        {/* ── Delivery details ── */}
        <Card padding="md">
          <h3 className="font-extrabold text-zinc-900 text-sm mb-3">
            Delivery Details
          </h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-zinc-400 shrink-0">Address</span>
              <span className="text-zinc-700 font-medium text-right">
                {order.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Payment</span>
              <span className="text-zinc-700 font-medium">{order.payment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Total paid</span>
              <span className="text-zinc-900 font-extrabold">
                ₹{order.total}
              </span>
            </div>
          </div>
        </Card>

        {/* ── Items ordered ── */}
        <Card padding="md">
          <h3 className="font-extrabold text-zinc-900 text-sm mb-3">
            Items Ordered
          </h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge variant={item.diet === "veg" ? "veg" : "nonveg"}>
                    {item.diet === "veg" ? "V" : "NV"}
                  </Badge>
                  <span className="text-sm text-zinc-600 truncate">
                    {item.name} × {item.quantity}
                  </span>
                </div>
                <span className="text-sm font-semibold text-zinc-800 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Back to home ── */}
        <Button
          id="back-to-home-from-tracking"
          variant="secondary"
          fullWidth
          onClick={() => navigate("/customer")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
