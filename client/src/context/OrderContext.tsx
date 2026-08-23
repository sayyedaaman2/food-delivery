import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ── Types ────────────────────────────────────────────────
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  diet: "veg" | "nonveg";
}

export interface Order {
  id: string;
  status: OrderStatus;
  restaurant: string;
  items: OrderItem[];
  total: number;
  address: string;
  payment: string;
  placedAt: Date;
}

interface OrderContextType {
  order: Order | null;
  setOrder: (order: Order) => void;
  updateStatus: (status: OrderStatus) => void;
  clearOrder: () => void;
}

// ── Context ──────────────────────────────────────────────
const OrderContext = createContext<OrderContextType | null>(null);

// ── Provider ─────────────────────────────────────────────
export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrderState] = useState<Order | null>(null);

  function setOrder(newOrder: Order) {
    setOrderState(newOrder);
  }

  function updateStatus(status: OrderStatus) {
    setOrderState((prev) => (prev ? { ...prev, status } : prev));
  }

  function clearOrder() {
    setOrderState(null);
  }

  return (
    <OrderContext.Provider value={{ order, setOrder, updateStatus, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────
export function useOrder(): OrderContextType {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within <OrderProvider>");
  return ctx;
}
