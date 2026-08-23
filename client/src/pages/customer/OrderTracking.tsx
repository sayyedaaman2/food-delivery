import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useOrder, type OrderStatus } from "../../context/OrderContext";

// ── Status helpers ───────────────────────────────────────
const STATUS_ORDER: OrderStatus[] = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
];

type BadgeVariant =
  | "veg" | "nonveg" | "open" | "closed"
  | "preparing" | "out-for-delivery" | "delivered" | "cancelled" | "default";

function statusToBadgeVariant(status: OrderStatus): BadgeVariant {
  switch (status) {
    case "placed":           return "default";
    case "confirmed":        return "open";
    case "preparing":        return "preparing";
    case "ready":            return "default";
    case "out_for_delivery": return "out-for-delivery";
    case "delivered":        return "delivered";
    default:                 return "default";
  }
}

function statusToLabel(status: OrderStatus): string {
  switch (status) {
    case "placed":           return "Order Placed";
    case "confirmed":        return "Restaurant Confirmed";
    case "preparing":        return "Preparing";
    case "ready":            return "Ready for Pickup";
    case "out_for_delivery": return "Out for Delivery";
    case "delivered":        return "Delivered";
    default:                 return status;
  }
}

// ── Timeline step config ─────────────────────────────────
const timelineSteps: { status: OrderStatus; label: string; icon: string }[] = [
  { status: "placed",           label: "Order Placed",          icon: "📋" },
  { status: "confirmed",        label: "Restaurant Confirmed",   icon: "✅" },
  { status: "preparing",        label: "Preparing",              icon: "👨‍🍳" },
  { status: "ready",            label: "Ready for Pickup",       icon: "📦" },
  { status: "out_for_delivery", label: "Out for Delivery",       icon: "🛵" },
  { status: "delivered",        label: "Delivered",              icon: "🎉" },
];

// ── Map placeholder ──────────────────────────────────────
function MapPlaceholder() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-zinc-200"
      style={{
        height: "160px",
        background:
          "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 60%, #fff8e1 100%)",
      }}
    >
      {/* Grid overlay (fake map texture) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #9e9e9e 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #9e9e9e 0px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Road */}
      <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-3 bg-zinc-300/60 rounded-full" />

      {/* Origin pin */}
      <span className="absolute left-[6%] top-1/2 -translate-y-1/2 text-2xl">
        🏠
      </span>

      {/* Destination pin */}
      <span className="absolute right-[6%] top-1/2 -translate-y-1/2 text-2xl">
        📍
      </span>

      {/* Animated scooter */}
      <span className="animate-drive top-[calc(50%-18px)] text-2xl leading-none">
        🛵
      </span>

      {/* Label */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <span className="bg-white/80 backdrop-blur-sm text-xs font-semibold text-zinc-500 px-3 py-1 rounded-full">
          Live tracking coming next
        </span>
      </div>
    </div>
  );
}

// ── Delivery Partner card ────────────────────────────────
function DeliveryPartner() {
  return (
    <Card padding="md">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-3">
        Your Delivery Partner
      </h3>
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-extrabold text-lg shrink-0">
          R
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-zinc-900">Rahul Kumar</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            ⭐ 4.8 &nbsp;·&nbsp; 1,200+ deliveries
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-base hover:bg-green-100 transition-colors"
            aria-label="Call rider"
          >
            📞
          </button>
          <button
            className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-base hover:bg-blue-100 transition-colors"
            aria-label="Message rider"
          >
            💬
          </button>
        </div>
      </div>

      {/* ETA */}
      <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">Estimated delivery</p>
          <p className="font-extrabold text-zinc-900 text-lg leading-tight">
            25–30 min
          </p>
        </div>
        <span className="bg-orange-50 border border-orange-100 text-orange-500 text-xs font-bold px-3 py-1.5 rounded-full">
          On the way
        </span>
      </div>
    </Card>
  );
}

// ── Status Timeline ──────────────────────────────────────
function StatusTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold text-zinc-900">Order Status</h3>
        <Badge variant={statusToBadgeVariant(currentStatus)}>
          {statusToLabel(currentStatus)}
        </Badge>
      </div>

      <div>
        {timelineSteps.map((step, idx) => {
          const stepIdx = STATUS_ORDER.indexOf(step.status);
          const isDone   = stepIdx < currentIdx;
          const isActive = stepIdx === currentIdx;
          const isPending = stepIdx > currentIdx;

          return (
            <div key={step.status} className="flex items-start gap-4">
              {/* Dot + connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all",
                    isDone
                      ? "bg-green-500 text-white shadow-sm shadow-green-200"
                      : isActive
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200 ring-4 ring-orange-100"
                      : "bg-zinc-100 text-zinc-400",
                  ].join(" ")}
                >
                  {isDone ? "✓" : step.icon}
                </div>
                {idx < timelineSteps.length - 1 && (
                  <div
                    className={[
                      "w-0.5 h-7 mt-0.5 rounded-full transition-colors",
                      isDone ? "bg-green-300" : "bg-zinc-100",
                    ].join(" ")}
                  />
                )}
              </div>

              {/* Text */}
              <div className="pt-1.5 pb-5 flex-1">
                <p
                  className={[
                    "text-sm font-bold leading-none",
                    isDone || isActive ? "text-zinc-900" : "text-zinc-400",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-xs text-orange-500 font-semibold mt-0.5">
                    In progress…
                  </p>
                )}
                {isDone && (
                  <p className="text-xs text-green-500 font-medium mt-0.5">
                    Completed
                  </p>
                )}
                {isPending && (
                  <p className="text-xs text-zinc-300 mt-0.5">Pending</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Main Component ───────────────────────────────────────
export default function OrderTracking() {
  const navigate = useNavigate();
  const { order } = useOrder();

  // ── Guard: no active order ───────────────────────────
  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="text-xl font-extrabold text-zinc-900 mb-2">
          No active order
        </h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-xs">
          Place an order from a restaurant to track it here.
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
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-zinc-900 text-lg leading-none">
              Order Tracking
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">{order.restaurant}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-600">Live</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4 pb-10">

        {/* ── Order ID banner ── */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-semibold">Order ID</p>
            <p className="text-xl font-extrabold text-zinc-900">{order.id}</p>
          </div>
          <Badge variant={statusToBadgeVariant(order.status)}>
            {statusToLabel(order.status)}
          </Badge>
        </div>

        {/* ── Map placeholder ── */}
        <MapPlaceholder />

        {/* ── Delivery partner ── */}
        <DeliveryPartner />

        {/* ── Status timeline ── */}
        <StatusTimeline currentStatus={order.status} />

        {/* ── Order items ── */}
        <Card padding="md">
          <h3 className="text-sm font-extrabold text-zinc-900 mb-3">
            Items Ordered
          </h3>
          <div className="space-y-2.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge variant={item.diet === "veg" ? "veg" : "nonveg"}>
                    {item.diet === "veg" ? "V" : "NV"}
                  </Badge>
                  <span className="text-sm text-zinc-700 truncate">
                    {item.quantity} × {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-zinc-800 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between">
            <span className="text-sm font-extrabold text-zinc-900">Total</span>
            <span className="text-sm font-extrabold text-zinc-900">
              ₹{order.total}
            </span>
          </div>
        </Card>

        {/* ── Delivery details ── */}
        <Card padding="md">
          <h3 className="text-sm font-extrabold text-zinc-900 mb-3">
            Delivery Details
          </h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">🏠</span>
              <div>
                <p className="font-semibold text-zinc-800">Delivery Address</p>
                <p className="text-zinc-400 text-xs mt-0.5">{order.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">💳</span>
              <div>
                <p className="font-semibold text-zinc-800">Payment</p>
                <p className="text-zinc-400 text-xs mt-0.5">{order.payment}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">🕐</span>
              <div>
                <p className="font-semibold text-zinc-800">Placed at</p>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {order.placedAt.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
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
