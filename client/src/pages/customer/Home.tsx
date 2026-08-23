import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useCart } from "../../context/CartContext";
import { restaurants, type Restaurant } from "../../data/restaurants";
import { meals, type Meal } from "../../data/meals";

// ── Icons ────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}

function CartBagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

// ── Categories ───────────────────────────────────────────
const categories = [
  { id: "all",       label: "All",      emoji: "✨" },
  { id: "breakfast", label: "Breakfast", emoji: "🍳" },
  { id: "lunch",     label: "Lunch",    emoji: "🍛" },
  { id: "dinner",    label: "Dinner",   emoji: "🍽️" },
  { id: "veg",       label: "Veg",      emoji: "🥗" },
  { id: "nonveg",    label: "Non-Veg",  emoji: "🍗" },
  { id: "biryani",   label: "Biryani",  emoji: "🫕" },
  { id: "pizza",     label: "Pizza",    emoji: "🍕" },
  { id: "desserts",  label: "Desserts", emoji: "🍨" },
];

// ── Greeting ─────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning 🌅";
  if (h < 17) return "Good afternoon ☀️";
  return "Good evening 🌙";
}

// ── Skeleton Card ────────────────────────────────────────
function SkeletonRestaurantCard() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-zinc-100" />
      <div className="p-4 space-y-2.5">
        <div className="flex justify-between gap-3">
          <div className="h-4 bg-zinc-100 rounded w-3/4" />
          <div className="h-5 w-10 bg-zinc-100 rounded-md" />
        </div>
        <div className="h-3 bg-zinc-100 rounded w-1/2" />
        <div className="h-px bg-zinc-50 my-1" />
        <div className="flex gap-3">
          <div className="h-3 bg-zinc-100 rounded w-1/4" />
          <div className="h-3 bg-zinc-100 rounded w-1/3" />
          <div className="h-3 bg-zinc-100 rounded w-1/4" />
        </div>
        <div className="h-8 bg-zinc-50 rounded-xl mt-2" />
      </div>
    </div>
  );
}

function SkeletonMealCard() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden animate-pulse">
      <div className="w-full h-36 bg-zinc-100" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-100 rounded w-4/5" />
        <div className="h-3 bg-zinc-100 rounded w-3/5" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-4 bg-zinc-100 rounded w-1/4" />
          <div className="h-7 bg-zinc-100 rounded-lg w-1/4" />
        </div>
      </div>
    </div>
  );
}

// ── Restaurant Card ──────────────────────────────────────
function RestaurantCard({ restaurant, onClick }: { restaurant: Restaurant; onClick: () => void }) {
  return (
    <Card hoverable padding="none" className="overflow-hidden" onClick={onClick}>
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <Badge variant="closed" className="text-sm px-3 py-1">
              Currently Closed
            </Badge>
          </div>
        )}
        <div className="absolute top-2.5 right-2.5">
          <Badge variant={restaurant.isVeg ? "veg" : "nonveg"}>
            {restaurant.isVeg ? "Pure Veg" : "Non-Veg"}
          </Badge>
        </div>
        {restaurant.deliveryFee === 0 && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-green-600 px-2 py-0.5 rounded-full">
              Free Delivery
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="font-bold text-zinc-900 text-[15px] leading-snug">
            {restaurant.name}
          </h3>
          <span
            className={[
              "flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md shrink-0",
              restaurant.rating >= 4.5 ? "bg-green-500 text-white" : "bg-amber-500 text-white",
            ].join(" ")}
          >
            ★ {restaurant.rating}
          </span>
        </div>

        <p className="text-xs text-zinc-500">{restaurant.cuisine.join(" · ")}</p>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <ClockIcon />
            {restaurant.deliveryTime}
          </span>
          <span className="text-zinc-200">|</span>
          <span>₹{restaurant.minOrder} min.</span>
          <span className="text-zinc-200">|</span>
          <span>{restaurant.reviews.toLocaleString()} ratings</span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          fullWidth
          className="mt-3"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          View Menu
        </Button>
      </div>
    </Card>
  );
}

// ── Meal Card ────────────────────────────────────────────
function MealCard({ meal, onClick }: { meal: Meal; onClick: () => void }) {
  return (
    <Card hoverable padding="none" className="overflow-hidden" onClick={onClick}>
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={meal.isVeg ? "veg" : "nonveg"}>
            {meal.isVeg ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-zinc-900 text-sm leading-snug">
          {meal.name}
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{meal.description}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{meal.restaurantName}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-zinc-900 text-sm">₹{meal.price}</span>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Order
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ── Empty Search State ───────────────────────────────────
function EmptySearchState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <section className="px-4 py-16 text-center">
      <p className="text-5xl mb-4">🔍</p>
      <h3 className="font-extrabold text-zinc-900 text-lg">No results found</h3>
      <p className="text-zinc-400 text-sm mt-1 mb-6">
        No restaurants or meals match{" "}
        <span className="font-semibold text-zinc-600">"{query}"</span>
      </p>
      <button
        onClick={onClear}
        className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
      >
        Clear search
      </button>
    </section>
  );
}

// ── Home Page ────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [search, setSearch]           = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading]     = useState(true);

  // Simulate brief loading skeleton on mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  // ── Filtered data ──────────────────────────────────────
  const q = search.trim().toLowerCase();

  const filteredRestaurants = restaurants.filter((r) => {
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some((c) => c.toLowerCase().includes(q))
    );
  });

  const filteredMeals = meals.filter((m) => {
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.restaurantName.toLowerCase().includes(q)
    );
  });

  const hasNoResults = q.length > 0 && filteredRestaurants.length === 0 && filteredMeals.length === 0;

  return (
    <div className="min-h-screen bg-[#f8f7f5]">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <span className="text-orange-500 font-extrabold text-xl tracking-tight shrink-0 select-none">
            🍴 FoodDash
          </span>

          {/* Location picker */}
          <button className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-orange-500 transition-colors min-w-0 flex-1 justify-center sm:justify-start">
            <span className="text-orange-500 shrink-0"><MapPinIcon /></span>
            <span className="truncate hidden sm:inline">Koramangala, Bangalore</span>
            <span className="truncate sm:hidden">Koramangala</span>
            <span className="text-zinc-400 shrink-0"><ChevronDownIcon /></span>
          </button>

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cart icon (visible on desktop, hidden on mobile — bottom nav handles mobile) */}
            <button
              id="header-cart-btn"
              onClick={() => navigate("/customer/cart")}
              className="relative hidden sm:flex w-9 h-9 rounded-full hover:bg-zinc-100 items-center justify-center transition-colors text-zinc-600 hover:text-orange-500"
              aria-label="Your cart"
            >
              <CartBagIcon />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Profile avatar */}
            <div
              id="profile-avatar"
              className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors select-none"
            >
              A
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero / Search ── */}
      <section
        className="relative px-4 pt-8 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 -left-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold mb-1">{getGreeting()}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-5">
            What are you craving today?
          </h1>
          <Input
            id="home-search"
            placeholder="Search food or restaurants…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<SearchIcon />}
            className="shadow-lg bg-white"
          />
          {/* Clear search shortcut */}
          {search && (
            <p className="text-orange-100/80 text-xs mt-2 pl-1">
              Showing results for "{search}" ·{" "}
              <button
                onClick={() => setSearch("")}
                className="text-white font-bold underline-offset-2 underline"
              >
                Clear
              </button>
            </p>
          )}
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto -mt-6 pb-12 space-y-8">

        {/* ── No search results ── */}
        {hasNoResults && <EmptySearchState query={search} onClear={() => setSearch("")} />}

        {/* ── Categories ── */}
        {!hasNoResults && (
          <section className="px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`category-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id)}
                    className={[
                      "flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl",
                      "text-xs font-semibold whitespace-nowrap shrink-0",
                      "transition-all duration-150 focus:outline-none",
                      activeCategory === cat.id
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100",
                    ].join(" ")}
                  >
                    <span className="text-xl">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Popular Near You ── */}
        {!hasNoResults && (
          <section className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-zinc-900">
                  {q ? `Restaurants matching "${search}"` : "Popular Near You"}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {q ? `${filteredRestaurants.length} result${filteredRestaurants.length !== 1 ? "s" : ""}` : "Based on your location"}
                </p>
              </div>
              {!q && (
                <button
                  id="see-all-restaurants"
                  className="flex items-center gap-0.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  See all <ChevronRightIcon />
                </button>
              )}
            </div>

            {/* Skeleton or grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => <SkeletonRestaurantCard key={i} />)}
              </div>
            ) : filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRestaurants.map((r) => (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    onClick={() => navigate("/customer/restaurant")}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400 text-center py-8">
                No restaurants match your search.
              </p>
            )}
          </section>
        )}

        {/* ── Recommended Meals ── */}
        {!hasNoResults && (
          <section className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-zinc-900">
                  {q ? `Meals matching "${search}"` : "Recommended Meals"}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {q ? `${filteredMeals.length} result${filteredMeals.length !== 1 ? "s" : ""}` : "Curated for your taste"}
                </p>
              </div>
              {!q && (
                <button
                  id="see-all-meals"
                  className="flex items-center gap-0.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  See all <ChevronRightIcon />
                </button>
              )}
            </div>

            {/* Skeleton or grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((i) => <SkeletonMealCard key={i} />)}
              </div>
            ) : filteredMeals.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredMeals.map((m) => (
                  <MealCard
                    key={m.id}
                    meal={m}
                    onClick={() => navigate("/customer/restaurant")}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400 text-center py-8">
                No meals match your search.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
