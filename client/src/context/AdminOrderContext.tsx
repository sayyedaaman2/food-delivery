import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  adminOrders as initialOrders,
  type DetailedAdminOrder,
  type AdminOrderStatus,
} from "../data/admin";

// ── Context type ─────────────────────────────────────────
interface AdminOrderContextType {
  orders: DetailedAdminOrder[];
  updateStatus: (orderId: string, status: AdminOrderStatus) => void;
}

// ── Context ──────────────────────────────────────────────
const AdminOrderContext = createContext<AdminOrderContextType | null>(null);

// ── Provider ─────────────────────────────────────────────
export function AdminOrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<DetailedAdminOrder[]>(initialOrders);

  function updateStatus(orderId: string, status: AdminOrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }

  return (
    <AdminOrderContext.Provider value={{ orders, updateStatus }}>
      {children}
    </AdminOrderContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────
export function useAdminOrders(): AdminOrderContextType {
  const ctx = useContext(AdminOrderContext);
  if (!ctx)
    throw new Error("useAdminOrders must be used inside <AdminOrderProvider>");
  return ctx;
}
