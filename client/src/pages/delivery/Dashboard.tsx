import { useOutletContext, useNavigate } from "react-router-dom";
import {
  deliveryStats,
  deliveryRequests,
  activeDelivery,
  type DeliveryRequest,
} from "../../data/delivery";

// ── Icons ────────────────────────────────────────────────
function StoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function OfflineIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 mx-auto">
      <path d="M1 1l22 22" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-3.16" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

export default function DeliveryDashboard() {
  const navigate = useNavigate();
  const context = useOutletContext<{ isOnline?: boolean }>();
  const isOnline = context?.isOnline ?? true;

  function handleViewDelivery(orderId: string) {
    const cleanId = orderId.replace("#", "");
    navigate(`/delivery/active?orderId=${cleanId}`);
  }

  function handleContinueActive() {
    const cleanId = activeDelivery.orderId.replace("#", "");
    navigate(`/delivery/active?orderId=${cleanId}`);
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">

      {/* ── Desktop/Page Header ── */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Good afternoon, Rahul 👋</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-zinc-400"}`} />
            <span className={`text-sm font-bold ${isOnline ? "text-green-600" : "text-zinc-500"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm text-center">
          <p className="text-2xl font-extrabold text-zinc-900">{deliveryStats.totalDeliveries}</p>
          <p className="text-xs font-semibold text-zinc-400 mt-0.5">Today's Deliveries</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm text-center">
          <p className="text-2xl font-extrabold text-green-600">{deliveryStats.completed}</p>
          <p className="text-xs font-semibold text-zinc-400 mt-0.5">Completed</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm text-center">
          <p className="text-2xl font-extrabold text-zinc-900">₹{deliveryStats.earnings}</p>
          <p className="text-xs font-semibold text-zinc-400 mt-0.5">Earnings</p>
        </div>
      </div>

      {/* ── Active Delivery Section ── */}
      {activeDelivery && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Active Delivery
            </h2>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              In Progress
            </span>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-white/10 text-orange-300">
                {activeDelivery.orderId}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Picked Up
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-zinc-400">Pickup</p>
                <p className="font-bold truncate text-white">{activeDelivery.restaurant}</p>
              </div>
              <div className="text-zinc-400 shrink-0">→</div>
              <div className="min-w-0 text-right">
                <p className="text-xs text-zinc-400">Dropoff</p>
                <p className="font-bold truncate text-white">{activeDelivery.customerName}'s Home</p>
              </div>
            </div>

            <button
              id="continue-active-delivery-btn"
              onClick={handleContinueActive}
              className="w-full py-3 rounded-xl bg-orange-500 text-white text-sm font-extrabold hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Continue Delivery <ArrowRightIcon />
            </button>
          </div>
        </section>
      )}

      {/* ── New Delivery Requests or Offline Banner ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">
            New Delivery Requests
          </h2>
          {isOnline && (
            <span className="text-xs font-bold text-zinc-400">
              {deliveryRequests.length} available
            </span>
          )}
        </div>

        {!isOnline ? (
          /* Offline state notice */
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 shadow-sm text-center space-y-3">
            <OfflineIcon />
            <h3 className="font-extrabold text-zinc-900 text-base">You're currently offline</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Go online to receive new delivery requests in your area.
            </p>
          </div>
        ) : (
          /* Online: Delivery Request Cards */
          <div className="space-y-3">
            {deliveryRequests.map((req: DeliveryRequest) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm space-y-4 hover:border-orange-200 transition-colors"
              >
                {/* Top header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-zinc-900">{req.orderId}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                    New Delivery
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-zinc-700">
                    <div className="flex items-center gap-2 font-bold text-sm text-zinc-900">
                      <StoreIcon />
                      {req.restaurant}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400 font-semibold">
                      <MapPinIcon />
                      {req.restaurantDistance} away
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-zinc-500 pt-1">
                    <span>Pickup → {req.customerName}</span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-700">
                      <ClockIcon /> {req.estimatedTime}
                    </span>
                  </div>
                </div>

                {/* Amount & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-400">Order Value: </span>
                    <span className="text-sm font-extrabold text-zinc-900">₹{req.orderAmount}</span>
                    <span className="text-xs text-zinc-400"> ({req.items} items)</span>
                  </div>

                  <button
                    id={`view-delivery-${req.id}`}
                    onClick={() => handleViewDelivery(req.orderId)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 active:scale-[0.98] transition-all"
                  >
                    View Delivery
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
