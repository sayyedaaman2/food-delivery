import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

// ── Helpers ──────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Icons ─────────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BikeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <path d="M15 6a1 1 0 000-2v2zm0 0v5.5M15 6h1.5M5.5 17.5L9 11l3-5 3 5.5"/>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

// ── Nav config ────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home",    path: "/delivery",         label: "Home",     Icon: HomeIcon },
  { id: "list",    path: "/delivery",         label: "Orders",   Icon: ListIcon },
  { id: "active",  path: "/delivery/active",  label: "Active",   Icon: BikeIcon },
  { id: "history", path: "/delivery/history", label: "History",  Icon: ClockIcon},
  { id: "profile", path: "/delivery/profile", label: "Profile",  Icon: UserIcon },
];

const SIDEBAR_ITEMS = [
  { path: "/delivery",         end: true,  label: "Dashboard",       Icon: HomeIcon  },
  { path: "/delivery",         end: true,  label: "Deliveries",      Icon: ListIcon  },
  { path: "/delivery/active",  end: true,  label: "Active Delivery", Icon: BikeIcon  },
  { path: "/delivery/history", end: true,  label: "History",         Icon: ClockIcon },
  { path: "/delivery/profile", end: true,  label: "Profile",         Icon: UserIcon  },
];

// ── Online toggle pill ────────────────────────────────────
function OnlinePill({
  isOnline,
  onToggle,
  size = "sm",
}: {
  isOnline: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      id="delivery-online-toggle"
      onClick={onToggle}
      className={[
        "flex items-center gap-1.5 rounded-full font-bold border transition-all duration-200",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        isOnline
          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          : "bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200",
      ].join(" ")}
    >
      <span
        className={[
          "rounded-full shrink-0",
          size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5",
          isOnline ? "bg-green-500 animate-pulse" : "bg-zinc-400",
        ].join(" ")}
      />
      {isOnline ? "Online" : "Offline"}
    </button>
  );
}

// ── Sidebar content (shared) ──────────────────────────────
function SidebarContent({
  isOnline,
  onToggle,
  onNavigate,
}: {
  isOnline: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-base shrink-0">
            🛵
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-900 text-sm leading-none">FoodDash</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 font-semibold">Delivery Agent</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item, idx) => (
          <NavLink
            key={`${item.path}-${idx}`}
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold",
                "transition-all duration-150 focus:outline-none",
                isActive
                  ? "bg-orange-50 text-orange-500"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              ].join(" ")
            }
          >
            <span className="shrink-0"><item.Icon /></span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Online status block */}
      <div className="px-3 pb-2 shrink-0">
        <div
          className={[
            "px-4 py-3 rounded-xl border transition-colors",
            isOnline
              ? "bg-green-50 border-green-100"
              : "bg-zinc-50 border-zinc-100",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-sm font-bold ${isOnline ? "text-green-700" : "text-zinc-500"}`}>
              {isOnline ? "You're Online" : "You're Offline"}
            </span>
            <button
              onClick={onToggle}
              className={[
                "relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 focus:outline-none",
                isOnline ? "bg-green-500" : "bg-zinc-300",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm",
                  "transition-transform duration-200",
                  isOnline ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </div>
          <p className="text-xs text-zinc-400">
            {isOnline ? "Ready to receive deliveries" : "You won't receive new orders"}
          </p>
        </div>
      </div>

      {/* Agent card */}
      <div className="px-3 pb-4 shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
            R
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-zinc-900 truncate">Rahul Sharma</p>
            <p className="text-[11px] text-zinc-400 truncate">Agent ID: DA-4821</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Layout ────────────────────────────────────────────────
export default function DeliveryLayout() {
  const [isOnline, setIsOnline]   = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggle() {
    setIsOnline((v) => !v);
  }

  return (
    <div className="flex min-h-screen bg-[#f8f7f5]">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-zinc-100 h-screen sticky top-0 shadow-[2px_0_8px_rgba(0,0,0,0.04)]">
        <SidebarContent isOnline={isOnline} onToggle={toggle} onNavigate={() => {}} />
      </aside>

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* ── Mobile sticky header ── */}
        <header className="md:hidden sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
          {/* Top row */}
          <div className="px-4 h-14 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm shrink-0">
                🛵
              </div>
              <span className="font-extrabold text-zinc-900 text-sm">FoodDash</span>
            </div>

            <div className="flex items-center gap-2">
              <OnlinePill isOnline={isOnline} onToggle={toggle} />
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                R
              </div>
              {/* Drawer trigger */}
              <button
                id="delivery-menu-btn"
                onClick={() => setDrawerOpen(true)}
                className="w-8 h-8 rounded-xl hover:bg-zinc-100 flex items-center justify-center transition-colors text-zinc-500"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>

          {/* Greeting sub-row */}
          <div className="px-4 pb-3">
            <p className="text-sm font-bold text-zinc-900">
              {getGreeting()}, Rahul 👋
            </p>
            <p className="text-xs text-zinc-400">
              {isOnline ? "You're online — ready for deliveries." : "You're offline — go online to receive orders."}
            </p>
          </div>
        </header>

        {/* ── Page content ── */}
        {/* pb-20 gives space above the mobile bottom nav */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <Outlet context={{ isOnline }} />
        </main>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden transition-all duration-300",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setDrawerOpen(false)}
        />
        {/* Panel */}
        <aside
          className={[
            "absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl",
            "transition-transform duration-300 ease-in-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500"
          >
            <CloseIcon />
          </button>
          <SidebarContent
            isOnline={isOnline}
            onToggle={toggle}
            onNavigate={() => setDrawerOpen(false)}
          />
        </aside>
      </div>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        id="delivery-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-zinc-100"
        style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-stretch justify-around px-1">
          {NAV_ITEMS.map((item) => {
            const isActiveDelivery = item.id === "active";

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end
                className={({ isActive: navActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-0.5 flex-1 py-3",
                    "transition-colors duration-150 focus:outline-none",
                    navActive
                      ? isActiveDelivery
                        ? "text-orange-500"
                        : "text-orange-500"
                      : "text-zinc-400 hover:text-zinc-600",
                  ].join(" ")
                }
              >
                {({ isActive: navActive }) => (
                  <>
                    {/* Active delivery gets a highlighted dot */}
                    {isActiveDelivery && (
                      <div className="relative">
                        <item.Icon />
                        {isOnline && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full border border-white" />
                        )}
                      </div>
                    )}
                    {!isActiveDelivery && <item.Icon />}
                    <span className={`text-[10px] font-bold leading-none ${navActive ? "text-orange-500" : "text-zinc-400"}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
