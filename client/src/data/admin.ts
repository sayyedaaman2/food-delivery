// ── Types ────────────────────────────────────────────────
export type AdminOrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

/** Compact order — used by Dashboard recent-orders list */
export interface AdminOrder {
  id: string;
  customer: string;
  itemCount: number;
  itemType: "items" | "meal";
  amount: number;
  status: AdminOrderStatus;
  time: string;
}

/** Single line item inside a detailed order */
export interface AdminOrderItem {
  name: string;
  quantity: number;
  price: number;
  diet: "veg" | "nonveg";
}

/** Full order — used by the Orders management page */
export interface DetailedAdminOrder extends AdminOrder {
  phone: string;
  address: string;
  items: AdminOrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  payment: string;
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

// ── Recent orders (compact — Dashboard) ──────────────────
export const recentOrders: AdminOrder[] = [
  { id: "#1024", customer: "Aaman",  itemCount: 3, itemType: "items", amount: 375, status: "preparing",       time: "10 min ago" },
  { id: "#1025", customer: "Rahul",  itemCount: 2, itemType: "items", amount: 240, status: "new",             time: "5 min ago"  },
  { id: "#1026", customer: "Priya",  itemCount: 1, itemType: "meal",  amount: 420, status: "ready",           time: "18 min ago" },
  { id: "#1027", customer: "Neha",   itemCount: 4, itemType: "items", amount: 510, status: "delivered",       time: "32 min ago" },
  { id: "#1028", customer: "Arjun",  itemCount: 2, itemType: "items", amount: 310, status: "new",             time: "2 min ago"  },
];

// ── Detailed orders (Orders management page) ─────────────
export const adminOrders: DetailedAdminOrder[] = [
  {
    id: "#1024",
    customer: "Aaman",
    phone: "+91 98765 43210",
    address: "123 Main Street, Lalbag Colony, Solapur 413001",
    itemCount: 3,
    itemType: "items",
    items: [
      { name: "Roti",           quantity: 2, price: 15,  diet: "veg" },
      { name: "Dal Tadka",      quantity: 1, price: 120, diet: "veg" },
      { name: "Paneer Masala",  quantity: 1, price: 200, diet: "veg" },
    ],
    subtotal:    330,
    deliveryFee:  30,
    tax:          15,
    amount:      375,
    status: "preparing",
    time:   "10 min ago",
    payment: "UPI",
  },
  {
    id: "#1025",
    customer: "Rahul",
    phone: "+91 97654 32109",
    address: "456 Station Road, Vijapur, Solapur 413001",
    itemCount: 2,
    itemType: "items",
    items: [
      { name: "Butter Naan",  quantity: 3, price: 30,  diet: "veg" },
      { name: "Aloo Jeera",   quantity: 1, price: 120, diet: "veg" },
    ],
    subtotal:    210,
    deliveryFee:  30,
    tax:          10,
    amount:      250,
    status: "new",
    time:   "5 min ago",
    payment: "Cash on Delivery",
  },
  {
    id: "#1026",
    customer: "Priya",
    phone: "+91 96543 21098",
    address: "789 Gandhi Nagar, Akkalkot, Solapur 413216",
    itemCount: 1,
    itemType: "meal",
    items: [
      { name: "Veg Thali",    quantity: 1, price: 180, diet: "veg" },
      { name: "Gulab Jamun",  quantity: 2, price: 60,  diet: "veg" },
    ],
    subtotal:    300,
    deliveryFee:  30,
    tax:          15,
    amount:      345,
    status: "ready",
    time:   "18 min ago",
    payment: "UPI",
  },
  {
    id: "#1027",
    customer: "Neha",
    phone: "+91 95432 10987",
    address: "12 Shivaji Peth, Solapur 413001",
    itemCount: 4,
    itemType: "items",
    items: [
      { name: "Roti",               quantity: 4, price: 15,  diet: "veg"    },
      { name: "Paneer Butter Masala",quantity: 1, price: 220, diet: "veg"   },
      { name: "Fried Rice",         quantity: 1, price: 150, diet: "veg"    },
      { name: "Mango Lassi",        quantity: 1, price: 80,  diet: "veg"    },
    ],
    subtotal:    510,
    deliveryFee:   0,
    tax:          25,
    amount:      535,
    status: "delivered",
    time:   "32 min ago",
    payment: "Card",
  },
  {
    id: "#1028",
    customer: "Arjun",
    phone: "+91 94321 09876",
    address: "34 Hotgi Road, Solapur 413003",
    itemCount: 2,
    itemType: "items",
    items: [
      { name: "Veg Biryani",  quantity: 1, price: 250, diet: "veg" },
      { name: "Raita",        quantity: 1, price: 60,  diet: "veg" },
    ],
    subtotal:    310,
    deliveryFee:  30,
    tax:          16,
    amount:      356,
    status: "confirmed",
    time:   "2 min ago",
    payment: "UPI",
  },
  {
    id: "#1029",
    customer: "Sanya",
    phone: "+91 93210 98765",
    address: "56 Ashoka Nagar, Solapur 413004",
    itemCount: 2,
    itemType: "items",
    items: [
      { name: "Dal Tadka",   quantity: 1, price: 120, diet: "veg" },
      { name: "Roti",        quantity: 4, price: 15,  diet: "veg" },
    ],
    subtotal:    180,
    deliveryFee:  30,
    tax:           9,
    amount:      219,
    status: "out_for_delivery",
    time:   "25 min ago",
    payment: "Cash on Delivery",
  },
  {
    id: "#1030",
    customer: "Vikram",
    phone: "+91 92109 87654",
    address: "78 Osmanabad Road, Solapur 413005",
    itemCount: 3,
    itemType: "items",
    items: [
      { name: "Malai Kofta",   quantity: 1, price: 210, diet: "veg" },
      { name: "Butter Naan",   quantity: 2, price: 30,  diet: "veg" },
      { name: "Mango Lassi",   quantity: 1, price: 80,  diet: "veg" },
    ],
    subtotal:    350,
    deliveryFee:  30,
    tax:          18,
    amount:      398,
    status: "new",
    time:   "Just now",
    payment: "UPI",
  },
];

// ── Popular items today ───────────────────────────────────
export const popularItems: PopularItem[] = [
  { name: "Roti",          orders: 42, diet: "veg" },
  { name: "Veg Thali",     orders: 31, diet: "veg" },
  { name: "Dal Tadka",     orders: 27, diet: "veg" },
  { name: "Paneer Masala", orders: 19, diet: "veg" },
];
