import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useCart } from "../../context/CartContext";

// ── Constants ────────────────────────────────────────────
const DELIVERY_FEE = 30;
const TAX_RATE = 0.05;

// ── Icons ────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

// ── Main Component ───────────────────────────────────────
export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    totalItems,
  } = useCart();

  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + tax;

  // ── Empty State ──────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f7f5]">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors shrink-0"
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="font-extrabold text-zinc-900 text-lg">Your Cart</h1>
          </div>
        </header>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 text-center">
          <div className="text-zinc-300 mb-4">
            <ShoppingBagIcon />
          </div>
          <h2 className="text-xl font-extrabold text-zinc-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-xs">
            Looks like you haven't added anything yet. Explore restaurants and
            add items to get started.
          </p>
          <Button
            id="explore-restaurants"
            onClick={() => navigate("/customer")}
            size="lg"
          >
            Explore Restaurants
          </Button>
        </div>
      </div>
    );
  }

  // ── Cart with Items ──────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f7f5]">

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
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-zinc-900 text-lg leading-none">
              Your Cart
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">Sharma's Kitchen</p>
          </div>
          <span className="text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full shrink-0">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4 pb-6">

        {/* ── Cart Items ── */}
        <Card padding="none">
          <div className="divide-y divide-zinc-100">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-4">
                {/* Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Badge variant={item.diet === "veg" ? "veg" : "nonveg"}>
                      {item.diet === "veg" ? "V" : "NV"}
                    </Badge>
                    {item.type === "meal" && (
                      <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                        Meal
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-zinc-900 text-sm leading-snug truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    ₹{item.price} × {item.quantity} ={" "}
                    <span className="font-semibold text-zinc-600">
                      ₹{item.price * item.quantity}
                    </span>
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {/* Quantity control */}
                  <div className="flex items-center gap-0.5 bg-orange-50 border border-orange-200 rounded-lg overflow-hidden">
                    <button
                      id={`decrease-${item.id}`}
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-7 h-7 flex items-center justify-center text-orange-500 font-bold text-lg hover:bg-orange-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-zinc-900">
                      {item.quantity}
                    </span>
                    <button
                      id={`increase-${item.id}`}
                      onClick={() => increaseQuantity(item.id)}
                      className="w-7 h-7 flex items-center justify-center text-orange-500 font-bold text-lg hover:bg-orange-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    id={`remove-${item.id}`}
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-300 hover:text-red-400 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Add More Items ── */}
        <button
          onClick={() => navigate("/customer/restaurant")}
          className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-200 text-sm font-semibold text-zinc-400 hover:border-orange-300 hover:text-orange-400 transition-colors"
        >
          + Add more items
        </button>

        {/* ── Order Summary ── */}
        <Card padding="lg">
          <h2 className="font-extrabold text-zinc-900 text-base mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span className="font-semibold text-zinc-800">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Delivery fee</span>
              {deliveryFee === 0 ? (
                <span className="font-semibold text-green-600">Free</span>
              ) : (
                <span className="font-semibold text-zinc-800">
                  ₹{deliveryFee}
                </span>
              )}
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Taxes & charges (5%)</span>
              <span className="font-semibold text-zinc-800">₹{tax}</span>
            </div>

            <div className="h-px bg-zinc-100 my-1" />

            <div className="flex justify-between">
              <span className="font-extrabold text-zinc-900">
                Total
              </span>
              <span className="font-extrabold text-zinc-900 text-lg">
                ₹{total}
              </span>
            </div>
          </div>

          {/* Savings callout */}
          {deliveryFee === 0 && (
            <p className="text-xs font-semibold text-green-600 mt-3 bg-green-50 rounded-lg px-3 py-2">
              🎉 You're saving ₹30 on free delivery!
            </p>
          )}
        </Card>

        {/* ── Checkout CTA ── */}
        <Button
          id="proceed-to-checkout"
          fullWidth
          size="lg"
          onClick={() => navigate("/customer/checkout")}
        >
          Proceed to Checkout · ₹{total}
        </Button>

        <p className="text-center text-xs text-zinc-400">
          By proceeding, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}
