import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  adminOrders,
  type DetailedAdminOrder,
  type AdminOrderStatus,
} from "../../data/admin";

// ── Types ────────────────────────────────────────────────
type FilterTab = "all" | "new" | "preparing" | "ready" | "completed";

// ── Filter config ────────────────────────────────────────
const tabs: { id: FilterTab; label: string }[] = [
  { id: "all",       label: "All"       },
  { id: "new",       label: "New"       },
  { id: "preparing", label: "Preparing" },
  { id: "ready",     label: "Ready"     },
  { id: "completed", label: "Completed" },
];

function getStatusesForTab(tab: FilterTab): AdminOrderStatus[] {
  switch (tab) {
    case "new":       return ["new", "confirmed"];
    case "preparing": return ["preparing"];
    case "ready":     return ["ready"];
    case "completed": return ["out_for_delivery", "delivered"];
    default:          return ["new", "confirmed", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"];
  }
}

function filterOrders(tab: FilterTab): DetailedAdminOrder[] {
  if (tab === "all") return adminOrders;
  const statuses = getStatusesForTab(tab);
  return adminOrders.filter((o) => statuses.includes(o.status));
}

// ── Status badge helpers ──────────────────────────────────
function getStatusStyle(status: AdminOrderStatus) {
  switch (status) {
    case "new":              return "bg-blue-50   text-blue-600   border border-blue-200";
    case "confirmed":        return "bg-indigo-50 text-indigo-600 border border-indigo-200";
    case "preparing":        return "bg-orange-50 text-orange-600 border border-orange-200";
    case "ready":            return "bg-amber-50  text-amber-600  border border-amber-200";
    case "out_for_delivery": return "bg-purple-50 text-purple-600 border border-purple-200";
    case "delivered":        return "bg-green-50  text-green-600  border border-green-200";
    case "cancelled":        return "bg-red-50    text-red-500    border border-red-200";
  }
}

function getStatusLabel(status: AdminOrderStatus) {
  switch (status) {
    case "new":              return "New";
    case "confirmed":        return "Confirmed";
    case "preparing":        return "Preparing";
    case "ready":            return "Ready";
    case "out_for_delivery": return "Out for Delivery";
    case "delivered":        return "Delivered";
    case "cancelled":        return "Cancelled";
  }
}

// ── Icons ────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

// ── Empty state ───────────────────────────────────────────
const tabLabels: Record<FilterTab, string> = {
  all:       "orders",
  new:       "new orders",
  preparing: "preparing orders",
  ready:     "ready orders",
  completed: "completed orders",
};

function EmptyState({ tab }: { tab: FilterTab }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-16 text-center">
      <p className="text-5xl mb-4">📋</p>
      <h3 className="text-base font-extrabold text-zinc-900">
        No {tabLabels[tab]}
      </h3>
      <p className="text-sm text-zinc-400 mt-2">
        Orders matching this status will appear here.
      </p>
    </div>
  );
}

// ── Order card (list view) ────────────────────────────────
function OrderCard({
  order,
  onView,
}: {
  order: DetailedAdminOrder;
  onView: () => void;
}) {
  const statusStyle = getStatusStyle(order.status);
  const statusLabel = getStatusLabel(order.status);

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden hover:border-zinc-200 transition-colors">
      {/* Card header */}
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-zinc-900">{order.id}</span>
          {(order.status === "new" || order.status === "confirmed") && (
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
          )}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Customer + meta */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 font-extrabold text-sm flex items-center justify-center shrink-0">
              {order.customer[0]}
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">{order.customer}</p>
              <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                <ClockIcon /> {order.time}
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">{order.payment}</p>
        </div>

        {/* Items */}
        <div className="space-y-1.5">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-sm shrink-0 ${
                    item.diet === "veg" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-zinc-700">
                  {item.name} × {item.quantity}
                </span>
              </div>
              <span className="text-zinc-500 text-xs font-medium">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Divider + total */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="text-sm text-zinc-500">{order.itemCount} {order.itemType}</span>
          <span className="text-base font-extrabold text-zinc-900">₹{order.amount}</span>
        </div>

        {/* CTA */}
        <button
          id={`view-order-${order.id.replace("#", "")}`}
          onClick={onView}
          className="w-full py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 active:scale-[0.98] transition-all duration-150"
        >
          View Order Details →
        </button>
      </div>
    </div>
  );
}

// ── ORDER DETAIL VIEW ─────────────────────────────────────
function OrderDetailView({ order, onBack }: { order: DetailedAdminOrder; onBack: () => void }) {
  const statusStyle = getStatusStyle(order.status);
  const statusLabel = getStatusLabel(order.status);

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shrink-0"
          aria-label="Back to orders"
        >
          <ArrowLeftIcon />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 font-semibold">Order Details</p>
          <h1 className="text-xl font-extrabold text-zinc-900">{order.id}</h1>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      {/* Customer info */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <h2 className="text-sm font-extrabold text-zinc-900 mb-3">Customer</h2>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 font-extrabold text-base flex items-center justify-center shrink-0">
            {order.customer[0]}
          </div>
          <div>
            <p className="font-bold text-zinc-900">{order.customer}</p>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
              <ClockIcon /> Placed {order.time}
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-zinc-600">
            <span className="text-zinc-400 shrink-0"><PhoneIcon /></span>
            {order.phone}
          </div>
          <div className="flex items-start gap-2 text-zinc-600">
            <span className="text-zinc-400 mt-0.5 shrink-0"><MapPinIcon /></span>
            <span className="leading-relaxed">{order.address}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <span className="text-zinc-400 shrink-0"><CardIcon /></span>
            {order.payment}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <h2 className="text-sm font-extrabold text-zinc-900 mb-4">
          Order Items ({order.itemCount} {order.itemType})
        </h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-2.5 h-2.5 rounded-sm shrink-0 ${
                    item.diet === "veg" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm font-semibold text-zinc-800 truncate">
                  {item.name}
                </span>
                <span className="text-xs text-zinc-400 shrink-0">× {item.quantity}</span>
              </div>
              <span className="text-sm font-bold text-zinc-900 shrink-0">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <h2 className="text-sm font-extrabold text-zinc-900 mb-4">Price Details</h2>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Subtotal</span>
            <span className="font-semibold text-zinc-800">₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Delivery Fee</span>
            {order.deliveryFee === 0 ? (
              <span className="font-semibold text-green-600">Free</span>
            ) : (
              <span className="font-semibold text-zinc-800">₹{order.deliveryFee}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Taxes</span>
            <span className="font-semibold text-zinc-800">₹{order.tax}</span>
          </div>
          <div className="h-px bg-zinc-100" />
          <div className="flex justify-between text-base">
            <span className="font-extrabold text-zinc-900">Total</span>
            <span className="font-extrabold text-zinc-900">₹{order.amount}</span>
          </div>
        </div>
      </div>

      {/* Next task notice */}
      <p className="text-xs text-center text-zinc-400 bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
        ⚡ Status management controls coming in the next task
      </p>
    </div>
  );
}

// ── ORDERS LIST (main view) ───────────────────────────────
export default function AdminOrdersPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // ── Detail view ──────────────────────────────────────
  const orderId = searchParams.get("orderId");
  if (orderId) {
    const order = adminOrders.find((o) => o.id === `#${orderId}`);
    if (order) {
      return (
        <OrderDetailView
          order={order}
          onBack={() => setSearchParams({})}
        />
      );
    }
  }

  // ── List view ────────────────────────────────────────
  const filtered = filterOrders(activeTab);

  function countForTab(tab: FilterTab) {
    if (tab === "all") return adminOrders.length;
    const statuses = getStatusesForTab(tab);
    return adminOrders.filter((o) => statuses.includes(o.status)).length;
  }

  function handleViewOrder(order: DetailedAdminOrder) {
    navigate(`/admin/order?orderId=${order.id.replace("#", "")}`);
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage incoming and active orders
        </p>
      </div>

      {/* ── Filter tabs ── */}
      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex gap-2 w-max">
          {tabs.map((tab) => {
            const count = countForTab(tab.id);
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold",
                  "transition-all duration-150 whitespace-nowrap focus:outline-none",
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900",
                ].join(" ")}
              >
                {tab.label}
                <span
                  className={[
                    "text-xs font-extrabold px-1.5 py-0.5 rounded-md leading-none",
                    isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Order grid ── */}
      {filtered.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={() => handleViewOrder(order)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
