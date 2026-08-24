import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

// ── Icons ────────────────────────────────────────────────
function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function MealsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" /><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function RestaurantIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Nav item config ──────────────────────────────────────
const navItems = [
  { path: "/admin",            label: "Dashboard",  end: true,  Icon: DashboardIcon  },
  { path: "/admin/order",      label: "Orders",     end: false, Icon: OrdersIcon     },
  { path: "/admin/menu",       label: "Menu",       end: false, Icon: MenuIcon       },
  { path: "/admin/meals",      label: "Meals",      end: false, Icon: MealsIcon      },
  { path: "/admin/restaurant", label: "Restaurant", end: false, Icon: RestaurantIcon },
  { path: "/admin/settings",   label: "Settings",   end: false, Icon: SettingsIcon   },
];

// ── Sidebar content (shared between desktop + drawer) ────
function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-base shrink-0">
            🍴
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-900 text-sm leading-none">FoodDash</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 font-semibold">Restaurant Admin</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold",
                "transition-all duration-150 focus:outline-none group",
                isActive
                  ? "bg-orange-50 text-orange-500"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              ].join(" ")
            }
          >
            <span className="shrink-0">
              <item.Icon />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Section label */}
      <div className="px-5 pt-2 pb-1 shrink-0">
        <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
          Account
        </p>
      </div>

      {/* User card */}
      <div className="px-3 pb-4 shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
            S
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-zinc-900 truncate">Sharma's Kitchen</p>
            <p className="text-[11px] text-zinc-400 truncate">admin@fooddash.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Layout ───────────────────────────────────────────────
export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f4f4f6]">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-zinc-100 h-screen sticky top-0 shadow-[2px_0_8px_rgba(0,0,0,0.04)]">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs">
              🍴
            </div>
            <span className="font-extrabold text-zinc-900 text-sm">FoodDash Admin</span>
          </div>
          <button
            id="admin-menu-btn"
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-xl hover:bg-zinc-100 flex items-center justify-center transition-colors text-zinc-600"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* ── Mobile Drawer ── */}
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden transition-all duration-300",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Drawer panel */}
        <aside
          className={[
            "absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl",
            "transition-transform duration-300 ease-in-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          {/* Close button */}
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center transition-colors text-zinc-500"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>

          <SidebarContent onNavigate={() => setDrawerOpen(false)} />
        </aside>
      </div>
    </div>
  );
}
