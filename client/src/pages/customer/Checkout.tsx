import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useCart } from "../../context/CartContext";

// ── Constants ────────────────────────────────────────────
const DELIVERY_FEE = 30;
const TAX_RATE = 0.05;

// ── Static data ──────────────────────────────────────────
const addresses = [
  {
    id: "home",
    label: "Home",
    icon: "🏠",
    address: "123 Main Street, Lalbag Colony, Solapur, Maharashtra 413001",
  },
  {
    id: "work",
    label: "Work",
    icon: "🏢",
    address: "456 Business Park, Sector 7, Pune, Maharashtra 411001",
  },
  {
    id: "other",
    label: "Friend's Place",
    icon: "📍",
    address: "789 Park Avenue, Shivaji Nagar, Mumbai, Maharashtra 400001",
  },
];

const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay when your order arrives",
    icon: "💵",
  },
  {
    id: "upi",
    label: "UPI",
    desc: "GPay · PhonePe · Paytm · BHIM",
    icon: "📱",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    desc: "Visa · Mastercard · RuPay",
    icon: "💳",
  },
];

// ── Icons ────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Order Confirmation Overlay ───────────────────────────
function OrderConfirmation({
  orderId,
  total,
  onTrack,
}: {
  orderId: string;
  total: number;
  onTrack: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 text-center">
      {/* Animated checkmark */}
      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-xl shadow-green-200 animate-scale-in">
        <CheckIcon />
      </div>

      <div className="animate-fade-in-up w-full max-w-sm">
        <p className="text-xs font-bold text-green-500 tracking-widest uppercase mb-2">
          ✓ Order Placed Successfully
        </p>
        <h2 className="text-3xl font-extrabold text-zinc-900 mb-1">{orderId}</h2>
        <p className="text-zinc-400 text-sm mt-3">
          Your order has been sent to
        </p>
        <p className="font-extrabold text-zinc-900 text-lg mt-0.5">
          Sharma's Kitchen
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Estimated delivery: 30–40 min
        </p>

        {/* Total bubble */}
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl px-8 py-4 my-6">
          <p className="text-xs text-zinc-400 mb-0.5">Total charged</p>
          <p className="text-2xl font-extrabold text-zinc-900">₹{total}</p>
        </div>

        <Button
          id="track-order-btn"
          size="lg"
          fullWidth
          onClick={onTrack}
        >
          Track My Order
        </Button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────
export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState("");

  const deliveryFee = DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + tax;

  // ── Guard: nothing in cart ───────────────────────────
  if (items.length === 0 && !showConfirmation) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-extrabold text-zinc-900 mb-2">
          Nothing to checkout
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          Add items from a restaurant first.
        </p>
        <Button onClick={() => navigate("/customer")}>
          Explore Restaurants
        </Button>
      </div>
    );
  }

  function handlePlaceOrder() {
    const id = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(id);
    setShowConfirmation(true);
  }

  function handleTrackOrder() {
    clearCart();
    navigate("/customer/order", {
      state: {
        orderId,
        total,
        restaurant: "Sharma's Kitchen",
        address: addresses[selectedAddress].address,
        payment:
          paymentMethods.find((p) => p.id === selectedPayment)?.label ?? "",
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          diet: i.diet,
        })),
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]">

      {/* ── Confirmation overlay ── */}
      {showConfirmation && (
        <OrderConfirmation
          orderId={orderId}
          total={total}
          onTrack={handleTrackOrder}
        />
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="font-extrabold text-zinc-900 text-lg">Checkout</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-6 pb-10">

        {/* ── Delivery Address ── */}
        <section>
          <h2 className="text-base font-extrabold text-zinc-900 mb-3">
            📍 Delivery Address
          </h2>
          <div className="space-y-2">
            {addresses.map((addr, idx) => (
              <button
                key={addr.id}
                id={`address-${addr.id}`}
                onClick={() => setSelectedAddress(idx)}
                className={[
                  "w-full text-left rounded-2xl border p-4 transition-all duration-150",
                  selectedAddress === idx
                    ? "border-orange-400 bg-orange-50"
                    : "border-zinc-200 bg-white hover:border-zinc-300",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">
                      {addr.icon}
                    </span>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm">
                        {addr.label}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {addr.address}
                      </p>
                    </div>
                  </div>
                  {/* Radio indicator */}
                  <div
                    className={[
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                      selectedAddress === idx
                        ? "border-orange-500"
                        : "border-zinc-300",
                    ].join(" ")}
                  >
                    {selectedAddress === idx && (
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Order Summary ── */}
        <section>
          <h2 className="text-base font-extrabold text-zinc-900 mb-3">
            🧾 Order Summary
          </h2>
          <Card padding="none">
            <div className="divide-y divide-zinc-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant={item.diet === "veg" ? "veg" : "nonveg"}>
                      {item.diet === "veg" ? "V" : "NV"}
                    </Badge>
                    <span className="text-sm font-semibold text-zinc-800 truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-zinc-400 shrink-0">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-zinc-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── Payment Method ── */}
        <section>
          <h2 className="text-base font-extrabold text-zinc-900 mb-3">
            💳 Payment Method
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                id={`payment-${method.id}`}
                onClick={() => setSelectedPayment(method.id)}
                className={[
                  "w-full text-left rounded-2xl border p-4 flex items-center gap-4 transition-all duration-150",
                  selectedPayment === method.id
                    ? "border-orange-400 bg-orange-50"
                    : "border-zinc-200 bg-white hover:border-zinc-300",
                ].join(" ")}
              >
                <span className="text-2xl leading-none">{method.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 text-sm">
                    {method.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{method.desc}</p>
                </div>
                {/* Radio indicator */}
                <div
                  className={[
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                    selectedPayment === method.id
                      ? "border-orange-500"
                      : "border-zinc-300",
                  ].join(" ")}
                >
                  {selectedPayment === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Price Details ── */}
        <Card padding="lg">
          <h2 className="text-base font-extrabold text-zinc-900 mb-4">
            Price Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="font-semibold text-zinc-800">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Delivery fee</span>
              <span className="font-semibold text-zinc-800">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Taxes & charges (5%)</span>
              <span className="font-semibold text-zinc-800">₹{tax}</span>
            </div>
            <div className="h-px bg-zinc-100" />
            <div className="flex justify-between">
              <span className="font-extrabold text-zinc-900">Total</span>
              <span className="font-extrabold text-zinc-900 text-lg">
                ₹{total}
              </span>
            </div>
          </div>
        </Card>

        {/* ── Place Order CTA ── */}
        <Button
          id="place-order-btn"
          fullWidth
          size="lg"
          onClick={handlePlaceOrder}
        >
          Place Order · ₹{total}
        </Button>

        <p className="text-center text-xs text-zinc-400 pb-2">
          By placing your order, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
