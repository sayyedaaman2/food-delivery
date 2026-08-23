import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useCart } from "../../context/CartContext";
import { restaurants } from "../../data/restaurants";
import {
  menuItems,
  mealCombos,
  type MenuItem,
  type MealCombo,
  type DietType,
  type FoodCategory,
  type MealTime,
} from "../../data/menu";

// Use first restaurant for demo (real app would use useParams + API)
const restaurant = restaurants[0];

// ── Category config ──────────────────────────────────────
const itemCategories: { id: string; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "popular",     label: "🔥 Popular" },
  { id: "breads",      label: "🫓 Breads" },
  { id: "rice",        label: "🍚 Rice" },
  { id: "main-course", label: "🍛 Main Course" },
  { id: "beverages",   label: "☕ Beverages" },
  { id: "desserts",    label: "🍮 Desserts" },
];

// ── Icons ────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

// ── Quantity Control ─────────────────────────────────────
function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center gap-0.5 bg-orange-50 border border-orange-200 rounded-lg overflow-hidden">
      <button
        onClick={(e) => { e.stopPropagation(); onDecrease(); }}
        className="w-7 h-7 flex items-center justify-center text-orange-500 font-bold text-lg hover:bg-orange-100 transition-colors"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-bold text-zinc-900">
        {quantity}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onIncrease(); }}
        className="w-7 h-7 flex items-center justify-center text-orange-500 font-bold text-lg hover:bg-orange-100 transition-colors"
      >
        +
      </button>
    </div>
  );
}

// ── Food Item Card ───────────────────────────────────────
function FoodCard({
  item,
  onAdd,
  onIncrease,
  onDecrease,
  quantity,
}: {
  item: MenuItem;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  quantity: number;
}) {
  return (
    <Card padding="none" className="overflow-hidden flex flex-col">
      <div className="relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={item.diet === "veg" ? "veg" : "nonveg"}>
            {item.diet === "veg" ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
        {item.isPopular && (
          <div className="absolute top-2 right-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              Popular
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="font-bold text-zinc-900 text-sm leading-snug">
            {item.name}
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-zinc-900 text-sm">
            ₹{item.price}
          </span>
          {quantity > 0 ? (
            <QuantityControl
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ) : (
            <Button variant="primary" size="sm" onClick={onAdd}>
              + Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── Meal Combo Card ──────────────────────────────────────
function MealComboCard({
  combo,
  onAdd,
  onIncrease,
  onDecrease,
  quantity,
}: {
  combo: MealCombo;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  quantity: number;
}) {
  const savings = combo.originalPrice - combo.price;

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex">
        <div className="relative shrink-0 w-28 sm:w-36">
          <img
            src={combo.image}
            alt={combo.name}
            className="w-full h-full object-cover min-h-[120px]"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={combo.diet === "veg" ? "veg" : "nonveg"}>
              {combo.diet === "veg" ? "Veg" : "Non-Veg"}
            </Badge>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-zinc-900 text-sm leading-snug">
                {combo.name}
              </h4>
              <span className="shrink-0 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200">
                Save ₹{savings}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {combo.items.join(" · ")}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-zinc-900 text-sm">
                ₹{combo.price}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ₹{combo.originalPrice}
              </span>
            </div>
            {quantity > 0 ? (
              <QuantityControl
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ) : (
              <Button variant="primary" size="sm" onClick={onAdd}>
                Add Meal
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Main Component ───────────────────────────────────────
export default function RestaurantDetails() {
  const navigate = useNavigate();
  const { addToCart, increaseQuantity, decreaseQuantity, items, totalItems, subtotal } =
    useCart();

  const [activeTab, setActiveTab] = useState<"items" | "meals">("items");
  const [activeCategory, setActiveCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState<"all" | DietType>("all");
  const [mealTimeFilter, setMealTimeFilter] = useState<"all" | MealTime>("all");

  // Helper: get quantity of an item in cart
  const getQty = (id: string) =>
    items.find((i) => i.id === id)?.quantity ?? 0;

  // Filtered individual items
  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "popular") return item.isPopular;
    return item.category === (activeCategory as FoodCategory);
  });

  // Filtered meal combos
  const filteredCombos = mealCombos.filter((combo) => {
    const dietMatch = dietFilter === "all" || combo.diet === dietFilter;
    const timeMatch = mealTimeFilter === "all" || combo.mealTime === mealTimeFilter;
    return dietMatch && timeMatch;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f5]">

      {/* ── Hero Image ── */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-52 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

        <button
          id="back-to-home"
          onClick={() => navigate("/customer")}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant={restaurant.isOpen ? "open" : "closed"}>
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </Badge>
            <Badge variant={restaurant.isVeg ? "veg" : "nonveg"}>
              {restaurant.isVeg ? "Pure Veg" : "Non-Veg"}
            </Badge>
          </div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight drop-shadow">
            {restaurant.name}
          </h1>
          <p className="text-white/75 text-sm mt-0.5">
            {restaurant.cuisine.join(" · ")}
          </p>
        </div>
      </div>

      {/* ── Info strip ── */}
      <div className="bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 font-semibold">
              <span
                className={[
                  "text-white text-xs font-bold px-1.5 py-0.5 rounded",
                  restaurant.rating >= 4.5 ? "bg-green-500" : "bg-amber-500",
                ].join(" ")}
              >
                ★ {restaurant.rating}
              </span>
              <span className="text-zinc-400">
                {restaurant.reviews.toLocaleString()} ratings
              </span>
            </span>
            <span className="text-zinc-200">|</span>
            <span className="flex items-center gap-1">
              <ClockIcon />
              {restaurant.deliveryTime}
            </span>
            <span className="text-zinc-200">|</span>
            <span>₹{restaurant.priceForTwo} for two</span>
            {restaurant.deliveryFee === 0 && (
              <>
                <span className="text-zinc-200">|</span>
                <span className="font-semibold text-green-600">
                  🚚 Free delivery
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      {/* Extra bottom padding so floating cart bar doesn't cover content */}
      <div className="max-w-5xl mx-auto px-4 py-6 pb-40 sm:pb-28">

        {/* ── Tab switcher ── */}
        <div className="bg-zinc-100 rounded-xl p-1 flex gap-1 mb-6">
          <button
            id="tab-individual"
            onClick={() => setActiveTab("items")}
            className={[
              "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 focus:outline-none",
              activeTab === "items"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700",
            ].join(" ")}
          >
            🍽 Individual Items
          </button>
          <button
            id="tab-meals"
            onClick={() => setActiveTab("meals")}
            className={[
              "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 focus:outline-none",
              activeTab === "meals"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700",
            ].join(" ")}
          >
            🥘 Meal Combos
          </button>
        </div>

        {/* ══ Individual Items Tab ══ */}
        {activeTab === "items" && (
          <div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-5">
              {itemCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0",
                    "transition-all duration-150 focus:outline-none",
                    activeCategory === cat.id
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-300",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    quantity={getQty(item.id)}
                    onAdd={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        diet: item.diet,
                        type: "item",
                      })
                    }
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-zinc-400">
                <p className="text-4xl mb-3">🍽</p>
                <p className="font-medium">No items in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* ══ Meal Combos Tab ══ */}
        {activeTab === "meals" && (
          <div>
            <div className="mb-5">
              <p className="text-base font-extrabold text-zinc-900">
                Choose your preference
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select diet and meal time to find the perfect combo
              </p>
            </div>

            {/* Diet toggle */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {(
                [
                  { id: "all",    label: "All",     emoji: "✨", activeClass: "bg-zinc-800 text-white" },
                  { id: "veg",    label: "Veg",     emoji: "🥗", activeClass: "bg-green-500 text-white" },
                  { id: "nonveg", label: "Non-Veg", emoji: "🍗", activeClass: "bg-red-500 text-white" },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  id={`diet-${d.id}`}
                  onClick={() => setDietFilter(d.id)}
                  className={[
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                    "transition-all duration-150 focus:outline-none",
                    dietFilter === d.id
                      ? d.activeClass + " shadow-sm"
                      : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300",
                  ].join(" ")}
                >
                  <span>{d.emoji}</span>
                  {d.label}
                </button>
              ))}
            </div>

            {/* Meal time filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-6">
              {(
                [
                  { id: "all",       label: "All Times" },
                  { id: "breakfast", label: "🍳 Breakfast" },
                  { id: "lunch",     label: "🍛 Lunch" },
                  { id: "dinner",    label: "🍽 Dinner" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  id={`time-${t.id}`}
                  onClick={() => setMealTimeFilter(t.id)}
                  className={[
                    "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0",
                    "transition-all duration-150 focus:outline-none",
                    mealTimeFilter === t.id
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-300",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
                Available Combos
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {filteredCombos.length > 0 ? (
              <div className="space-y-4">
                {filteredCombos.map((combo) => (
                  <MealComboCard
                    key={combo.id}
                    combo={combo}
                    quantity={getQty(combo.id)}
                    onAdd={() =>
                      addToCart({
                        id: combo.id,
                        name: combo.name,
                        price: combo.price,
                        image: combo.image,
                        diet: combo.diet,
                        type: "meal",
                      })
                    }
                    onIncrease={() => increaseQuantity(combo.id)}
                    onDecrease={() => decreaseQuantity(combo.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-zinc-400">
                <p className="text-4xl mb-3">🥘</p>
                <p className="font-medium">No combos match your preference.</p>
                <p className="text-xs mt-1">Try changing your diet or meal time filter.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Floating Cart Bar ── */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#f8f7f5] to-transparent pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <button
              id="view-cart-bar"
              onClick={() => navigate("/customer/cart")}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-2xl py-4 px-5 flex items-center justify-between shadow-xl shadow-orange-200 transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="bg-orange-600 text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
                <span className="font-bold text-sm">
                  {totalItems === 1 ? "1 item" : `${totalItems} items`} in cart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold">₹{subtotal}</span>
                <ShoppingBagIcon />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
