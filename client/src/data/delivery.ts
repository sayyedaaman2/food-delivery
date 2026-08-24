// ── Types ────────────────────────────────────────────────
export interface DeliveryRequest {
  id: string;
  orderId: string;
  restaurant: string;
  restaurantDistance: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  estimatedTime: string;
  orderAmount: number;
  items: number;
}

export interface ActiveDeliveryInfo {
  orderId: string;
  restaurant: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  status: "heading_to_restaurant" | "picked_up";
}

// ── Today's summary stats ────────────────────────────────
export const deliveryStats = {
  totalDeliveries: 12,
  completed:        9,
  earnings:      1240,
};

// ── Pending delivery requests ────────────────────────────
export const deliveryRequests: DeliveryRequest[] = [
  {
    id: "dr1",
    orderId: "#1024",
    restaurant: "Sharma's Kitchen",
    restaurantDistance: "1.8 km",
    restaurantAddress: "45 M.G. Road, Solapur",
    customerName: "Aaman",
    customerAddress: "123 Main Street, Lalbag Colony",
    estimatedTime: "~25 min",
    orderAmount: 375,
    items: 3,
  },
  {
    id: "dr2",
    orderId: "#1031",
    restaurant: "Coastal Bites",
    restaurantDistance: "2.4 km",
    restaurantAddress: "12 Railway Road, Solapur",
    customerName: "Meera",
    customerAddress: "789 Gandhi Nagar, Akkalkot",
    estimatedTime: "~30 min",
    orderAmount: 240,
    items: 2,
  },
  {
    id: "dr3",
    orderId: "#1032",
    restaurant: "The Wok Box",
    restaurantDistance: "0.9 km",
    restaurantAddress: "78 Station Road, Solapur",
    customerName: "Raju",
    customerAddress: "56 Ashoka Nagar, Solapur",
    estimatedTime: "~20 min",
    orderAmount: 310,
    items: 2,
  },
];

// ── Active delivery in progress ───────────────────────────
export const activeDelivery: ActiveDeliveryInfo = {
  orderId: "#1023",
  restaurant: "Sharma's Kitchen",
  restaurantAddress: "45 M.G. Road, Solapur",
  customerName: "Aaman",
  customerAddress: "123 Main Street, Lalbag Colony, Solapur",
  status: "picked_up",
};
