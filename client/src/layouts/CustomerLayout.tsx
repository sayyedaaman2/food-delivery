import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import type { JSX } from "react/jsx-runtime";

// ── Icons ────────────────────────────────────────────────
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function PackageIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ── Nav item config ──────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  path: string | null;
  matchPath?: string;
  Icon: (props: { active: boolean }) => JSX.Element;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", path: "/customer", matchPath: "/customer", Icon: HomeIcon },
  { id: "search", label: "Search", path: "/customer", matchPath: undefined, Icon: SearchIcon },
  { id: "cart", label: "Cart", path: "/customer/cart", matchPath: "/customer/cart", Icon: CartIcon },
  { id: "orders", label: "Orders", path: "/customer/order", matchPath: "/customer/order", Icon: PackageIcon },
  { id: "profile", label: "Profile", path: null, matchPath: undefined, Icon: UserIcon },
];

// ── Layout ───────────────────────────────────────────────
export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { order } = useOrder();

  function isActive(item: NavItem): boolean {
    if (!item.matchPath) return false;
    if (item.matchPath === "/customer") {
      return location.pathname === "/customer";
    }
    return location.pathname.startsWith(item.matchPath);
  }

  function getBadge(item: NavItem): number {
    if (item.id === "cart") return totalItems;
    if (item.id === "orders") return order ? 1 : 0;
    return 0;
  }

  return (
    <>
      {/* Page content — pb-16 on mobile leaves room for bottom nav */}
      <div className="pb-16 sm:pb-0">
        <Outlet />
      </div>

      {/* ── Bottom Navigation (mobile only) ── */}
      <nav
        id="bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-zinc-100"
        style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-stretch justify-around px-1 safe-area-inset-bottom">
          {navItems.map((item) => {
            const active = isActive(item);
            const badge = getBadge(item);
            const disabled = !item.path;

            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                disabled={disabled}
                onClick={() => item.path && navigate(item.path)}
                className={[
                  "relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2",
                  "transition-colors duration-150 focus:outline-none",
                  active ? "text-orange-500" : "text-zinc-400",
                  disabled ? "opacity-35 cursor-not-allowed" : "hover:text-zinc-600",
                ].join(" ")}
              >
                {/* Badge */}
                {badge > 0 && (
                  <span className="absolute top-1.5 left-1/2 translate-x-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none pointer-events-none">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}

                <item.Icon active={active} />

                <span
                  className={[
                    "text-[10px] font-semibold leading-none",
                    active ? "text-orange-500" : "text-zinc-400",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
