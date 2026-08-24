import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  todayStats,
  recentOrders,
  popularItems,
  type AdminOrderStatus,
  type AdminOrder,
} from "../../data/admin";

// ── Helpers ──────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getStatusStyle(status: AdminOrderStatus) {
  switch (status) {
    case "new":              return "bg-blue-50  text-blue-600  border border-blue-200";
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
    case "preparing":        return "Preparing";
    case "ready":            return "Ready";
    case "out_for_delivery": return "On the way";
    case "delivered":        return "Delivered";
    case "cancelled":        return "Cancelled";
  }
}

// ── Icons ────────────────────────────────────────────────
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

// ── KPI Card ─────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  trend,
  accent,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "neutral";
  accent: string;   // Tailwind bg class for icon circle
  icon: string;     // emoji
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        {trend === "up" && (
          <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            <TrendUpIcon /> +{trend === "up" ? "" : ""}
          </span>
        )}
      </div>

      {/* Value */}
      <div>
        <p className="text-2xl font-extrabold text-zinc-900">{value}</p>
        <p className="text-sm font-semibold text-zinc-500 mt-0.5">{label}</p>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-zinc-400 border-t border-zinc-50 pt-2">{sub}</p>
    </div>
  );
}

// ── Order row (desktop table row) ────────────────────────
function OrderTableRow({ order }: { order: AdminOrder }) {
  const statusStyle = getStatusStyle(order.status);
  const statusLabel = getStatusLabel(order.status);

  return (
    <tr className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors">
      <td className="py-3.5 px-4 text-sm font-bold text-zinc-900 whitespace-nowrap">
        {order.id}
        {order.status === "new" && (
          <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse align-middle" />
        )}
      </td>
      <td className="py-3.5 px-4 text-sm text-zinc-700 font-medium">{order.customer}</td>
      <td className="py-3.5 px-4 text-sm text-zinc-500">
        {order.itemCount} {order.itemType}
      </td>
      <td className="py-3.5 px-4 text-sm font-bold text-zinc-900 text-right">
        ₹{order.amount}
      </td>
      <td className="py-3.5 px-4 text-right">
        <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </td>
      <td className="py-3.5 px-4 text-xs text-zinc-400 text-right whitespace-nowrap">
        {order.time}
      </td>
    </tr>
  );
}

// ── Order card (mobile) ──────────────────────────────────
function OrderMobileCard({ order }: { order: AdminOrder }) {
  const statusStyle = getStatusStyle(order.status);
  const statusLabel = getStatusLabel(order.status);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-zinc-100 last:border-0">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-500 font-bold text-sm flex items-center justify-center shrink-0">
        {order.customer[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-zinc-900">{order.id}</span>
          {order.status === "new" && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
          )}
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          {order.customer} · {order.itemCount} {order.itemType} · {order.time}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-sm font-extrabold text-zinc-900">₹{order.amount}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

// ── Status toggle ────────────────────────────────────────
function RestaurantStatusCard({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
      <h3 className="text-sm font-extrabold text-zinc-900 mb-4">Restaurant Status</h3>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className={[
              "w-2.5 h-2.5 rounded-full shrink-0",
              isOpen ? "bg-green-500 animate-pulse" : "bg-red-400",
            ].join(" ")}
          />
          <span
            className={`text-sm font-bold ${isOpen ? "text-green-600" : "text-red-500"}`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Toggle switch */}
        <button
          id="restaurant-status-toggle"
          onClick={onToggle}
          aria-label="Toggle restaurant status"
          className={[
            "relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus:outline-none",
            isOpen ? "bg-green-500" : "bg-zinc-300",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm",
              "transition-transform duration-200",
              isOpen ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      <p className="text-xs text-zinc-400 mt-3">
        {isOpen
          ? "Customers can order right now."
          : "Your restaurant is hidden from customers."}
      </p>
    </div>
  );
}

// ── Popular items ─────────────────────────────────────────
function PopularItemsCard() {
  const max = popularItems[0].orders;

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
      <h3 className="text-sm font-extrabold text-zinc-900 mb-4">
        Today's Popular Items
      </h3>

      <div className="space-y-3.5">
        {popularItems.map((item, idx) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 w-4 shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-zinc-800">
                  {item.name}
                </span>
                <span
                  className={`w-2 h-2 rounded-sm shrink-0 ${
                    item.diet === "veg" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
              <span className="text-xs font-bold text-zinc-500">
                {item.orders} orders
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(item.orders / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quick actions ─────────────────────────────────────────
function QuickActionsCard({ navigate }: { navigate: (to: string) => void }) {
  const actions = [
    {
      id: "qa-add-food",
      label: "Add Food Item",
      icon: <PlusIcon />,
      path: "/admin/menu",
      accent: "bg-orange-500 text-white hover:bg-orange-600",
    },
    {
      id: "qa-view-orders",
      label: "View New Orders",
      icon: <ClipboardIcon />,
      path: "/admin/order",
      accent: "bg-zinc-900 text-white hover:bg-zinc-800",
    },
    {
      id: "qa-manage-menu",
      label: "Manage Menu",
      icon: <BookIcon />,
      path: "/admin/menu",
      accent: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
      <h3 className="text-sm font-extrabold text-zinc-900 mb-3">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((a) => (
          <button
            key={a.id}
            id={a.id}
            onClick={() => navigate(a.path)}
            className={[
              "w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold",
              "transition-all duration-150 focus:outline-none",
              a.accent,
            ].join(" ")}
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const kpis = [
    {
      label:  "Today's Orders",
      value:  String(todayStats.totalOrders),
      sub:    `+${todayStats.ordersChangeAbs} more than yesterday`,
      accent: "bg-orange-50",
      icon:   "🛒",
      trend:  "up" as const,
    },
    {
      label:  "Active Orders",
      value:  String(todayStats.activeOrders),
      sub:    "Being prepared or out for delivery",
      accent: "bg-amber-50",
      icon:   "⚡",
    },
    {
      label:  "Completed",
      value:  String(todayStats.completedOrders),
      sub:    `${Math.round((todayStats.completedOrders / todayStats.totalOrders) * 100)}% fulfillment rate`,
      accent: "bg-green-50",
      icon:   "✅",
    },
    {
      label:  "Today's Revenue",
      value:  `₹${todayStats.revenue.toLocaleString("en-IN")}`,
      sub:    `+${todayStats.revenueChangePct}% compared to yesterday`,
      accent: "bg-blue-50",
      icon:   "💰",
      trend:  "up" as const,
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
            Restaurant Admin
          </p>
          <h1 className="text-2xl font-extrabold text-zinc-900 leading-tight">
            {getGreeting()}, Sharma's Kitchen
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Bell */}
          <button
            id="admin-notification-btn"
            className="relative w-9 h-9 rounded-xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 bg-white border border-zinc-100 shadow-sm rounded-xl px-3 py-2 cursor-pointer hover:bg-zinc-50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-xs flex items-center justify-center">
              S
            </div>
            <span className="text-xs font-bold text-zinc-700 hidden sm:inline">
              Sharma's Kitchen
            </span>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* ── Recent Orders ── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-zinc-900">Recent Orders</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {recentOrders.filter((o) => o.status === "new").length} new orders need attention
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/order")}
                className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
              >
                View all →
              </button>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="py-3 px-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Order
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Customer
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Items
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <OrderTableRow key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden px-4 py-1">
              {recentOrders.map((order) => (
                <OrderMobileCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar column ── */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <QuickActionsCard navigate={navigate} />
          <RestaurantStatusCard isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
          <PopularItemsCard />
        </div>
      </div>
    </div>
  );
}
