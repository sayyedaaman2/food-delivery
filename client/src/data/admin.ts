// ── Types ────────────────────────────────────────────────
export type AdminOrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface AdminOrder {
  id: string;
  customer: string;
  itemCount: number;
  itemType: "items" | "meal";
  amount: number;
  status: AdminOrderStatus;
  time: string;
}

export interface PopularItem {
  name: string;
  orders: number;
  diet: "veg" | "nonveg";
}

// ── Today's summary stats ────────────────────────────────
export const todayStats = {
  totalOrders:      24,
  activeOrders:      7,
  completedOrders:  17,
  revenue:       12450,
  revenueChangePct:  8,   // +8% vs yesterday
  ordersChangeAbs:   3,   // +3 more than yesterday
};

// ── Recent orders ────────────────────────────────────────
export const recentOrders: AdminOrder[] = [
  { id: "#1024", customer: "Aaman",  itemCount: 3, itemType: "items", amount: 375, status: "preparing",       time: "10 min ago" },
  { id: "#1025", customer: "Rahul",  itemCount: 2, itemType: "items", amount: 240, status: "new",             time: "5 min ago"  },
  { id: "#1026", customer: "Priya",  itemCount: 1, itemType: "meal",  amount: 420, status: "ready",           time: "18 min ago" },
  { id: "#1027", customer: "Neha",   itemCount: 4, itemType: "items", amount: 510, status: "delivered",       time: "32 min ago" },
  { id: "#1028", customer: "Arjun",  itemCount: 2, itemType: "items", amount: 310, status: "new",             time: "2 min ago"  },
];

// ── Popular items today ───────────────────────────────────
export const popularItems: PopularItem[] = [
  { name: "Roti",          orders: 42, diet: "veg" },
  { name: "Veg Thali",     orders: 31, diet: "veg" },
  { name: "Dal Tadka",     orders: 27, diet: "veg" },
  { name: "Paneer Masala", orders: 19, diet: "veg" },
];
