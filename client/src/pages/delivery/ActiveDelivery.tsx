import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import { deliveryRequests, activeDelivery as activeDeliveryDefault } from "../../data/delivery";

export type DeliveryStatus =
  | "accepted"
  | "arrived"
  | "picked_up"
  | "on_the_way"
  | "delivered";

const STATUS_STEPS: { id: DeliveryStatus; label: string }[] = [
  { id: "accepted",   label: "Delivery Accepted" },
  { id: "arrived",    label: "Arrived at Restaurant" },
  { id: "picked_up",  label: "Picked Up" },
  { id: "on_the_way", label: "On The Way" },
  { id: "delivered",  label: "Delivered" },
];

function getBadgeVariant(status: DeliveryStatus) {
  switch (status) {
    case "accepted":   return "default";
    case "arrived":    return "preparing";
    case "picked_up":  return "preparing";
    case "on_the_way": return "out-for-delivery";
    case "delivered":  return "delivered";
  }
}

function getStatusLabel(status: DeliveryStatus) {
  switch (status) {
    case "accepted":   return "ACCEPTED";
    case "arrived":    return "ARRIVED AT RESTAURANT";
    case "picked_up":  return "PICKED UP";
    case "on_the_way": return "ON THE WAY";
    case "delivered":  return "DELIVERED";
  }
}

// ── Icons ────────────────────────────────────────────────
function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function NavigationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
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

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mx-auto">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function ActiveDelivery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawOrderId = searchParams.get("orderId");

  // Determine order info based on query param or default
  const orderId = rawOrderId ? `#${rawOrderId.replace("#", "")}` : activeDeliveryDefault.orderId;
  const reqMatch = deliveryRequests.find((r) => r.orderId === orderId);

  const restaurantName = reqMatch ? reqMatch.restaurant : activeDeliveryDefault.restaurant;
  const restaurantAddress = reqMatch ? reqMatch.restaurantAddress : activeDeliveryDefault.restaurantAddress;
  const customerName = reqMatch ? reqMatch.customerName : activeDeliveryDefault.customerName;
  const customerAddress = reqMatch ? reqMatch.customerAddress : activeDeliveryDefault.customerAddress;

  // Active delivery workflow state
  const [status, setStatus] = useState<DeliveryStatus>("accepted");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const currentStepIdx = STATUS_STEPS.findIndex((s) => s.id === status);

  // Handle primary action button click
  function handleNextState() {
    switch (status) {
      case "accepted":
        setStatus("arrived");
        break;
      case "arrived":
        setStatus("picked_up");
        break;
      case "picked_up":
        setStatus("on_the_way");
        break;
      case "on_the_way":
        setStatus("delivered");
        break;
      case "delivered":
        navigate("/delivery");
        break;
    }
  }

  function handleTriggerAction(msg: string) {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  }

  // Get primary button configuration
  function getPrimaryActionConfig() {
    switch (status) {
      case "accepted":
        return { label: "Confirm Arrival at Restaurant", style: "bg-blue-600 hover:bg-blue-700 text-white" };
      case "arrived":
        return { label: "Confirm Pickup", style: "bg-orange-500 hover:bg-orange-600 text-white" };
      case "picked_up":
        return { label: "Start Delivery", style: "bg-orange-500 hover:bg-orange-600 text-white" };
      case "on_the_way":
        return { label: "Mark As Delivered", style: "bg-green-600 hover:bg-green-700 text-white" };
      case "delivered":
        return { label: "Back to Dashboard", style: "bg-zinc-900 hover:bg-zinc-800 text-white" };
    }
  }

  const actionConfig = getPrimaryActionConfig();

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-5 pb-24">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/delivery")}
          className="w-9 h-9 rounded-xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors shrink-0"
          aria-label="Back to dashboard"
        >
          <ArrowLeftIcon />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-zinc-400">Active Delivery</p>
          <h1 className="text-xl font-extrabold text-zinc-900 leading-tight">
            {orderId}
          </h1>
        </div>
        <Badge variant={getBadgeVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      </div>

      {/* ── Route Overview Pill ── */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm flex items-center justify-between gap-3 text-sm">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-400 font-semibold">Pickup</p>
          <p className="font-bold text-zinc-900 truncate">{restaurantName}</p>
        </div>
        <div className="text-orange-500 font-bold shrink-0">→</div>
        <div className="min-w-0 flex-1 text-right">
          <p className="text-xs text-zinc-400 font-semibold">Dropoff</p>
          <p className="font-bold text-zinc-900 truncate">{customerName}</p>
        </div>
      </div>

      {/* ── Interactive Action Toast ── */}
      {actionMessage && (
        <div className="bg-zinc-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg animate-fade-in-up text-center">
          {actionMessage}
        </div>
      )}

      {/* ── Status Timeline Workflow ── */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-4">
        <h2 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
          Delivery Progress
        </h2>

        <div className="space-y-3">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIdx;
            const isCurrent   = idx === currentStepIdx;

            return (
              <div key={step.id} className="flex items-center gap-3">
                {/* Dot indicator */}
                <div className="relative flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-extrabold flex items-center justify-center">
                      ✓
                    </span>
                  ) : isCurrent ? (
                    <span className="relative flex items-center justify-center w-6 h-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white" />
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border-2 border-zinc-200 bg-zinc-50" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={[
                    "text-sm font-bold leading-tight",
                    isCompleted
                      ? "text-zinc-400 line-through"
                      : isCurrent
                      ? "text-zinc-900"
                      : "text-zinc-300",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Completion View (when delivered) ── */}
      {status === "delivered" ? (
        <div className="bg-white rounded-2xl border border-green-100 p-8 text-center space-y-3 shadow-sm">
          <CheckCircleIcon />
          <h2 className="text-xl font-extrabold text-zinc-900">Delivery Completed!</h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            Order {orderId} has been successfully delivered to {customerName}. Great job!
          </p>
        </div>
      ) : (
        /* ── Pickup & Customer Cards ── */
        <div className="space-y-4">
          {/* Pickup Information */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <StoreIcon />
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Pickup</p>
                  <p className="font-extrabold text-zinc-900 text-sm">{restaurantName}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                Store
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {restaurantAddress}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPinIcon /> 1.8 km
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon /> ~7 min away
              </span>
            </div>

            <button
              id="open-navigation-btn"
              onClick={() => handleTriggerAction(`Opening GPS Navigation to ${restaurantName}...`)}
              className="w-full py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <NavigationIcon /> Open Navigation
            </button>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UserIcon />
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Deliver To</p>
                  <p className="font-extrabold text-zinc-900 text-sm">{customerName}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Customer
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {customerAddress}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPinIcon /> 2.4 km
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon /> ~12 min away
              </span>
            </div>

            <button
              id="call-customer-btn"
              onClick={() => handleTriggerAction(`Calling ${customerName} (+91 98765 43210)...`)}
              className="w-full py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <PhoneIcon /> Call Customer
            </button>
          </div>
        </div>
      )}

      {/* ── Primary Action Bar ── */}
      <div className="fixed bottom-16 sm:bottom-4 left-0 right-0 z-30 p-4 bg-gradient-to-t from-[#f8f7f5] via-[#f8f7f5]/90 to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <button
            id="active-delivery-primary-btn"
            onClick={handleNextState}
            className={[
              "w-full py-3.5 rounded-2xl text-sm font-extrabold shadow-lg",
              "transition-all duration-150 active:scale-[0.98] focus:outline-none",
              actionConfig.style,
            ].join(" ")}
          >
            {actionConfig.label} →
          </button>
        </div>
      </div>

    </div>
  );
}
