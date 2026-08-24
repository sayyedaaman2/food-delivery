import { useState } from "react";
import { menuItems as initialItems, mealCombos as initialCombos } from "../../data/menu";
import type { MenuItem, MealCombo, FoodCategory, DietType } from "../../data/menu";

// ── Types ────────────────────────────────────────────────
interface MenuItemWithAvail extends MenuItem {
  available: boolean;
}

interface MealComboWithAvail extends MealCombo {
  available: boolean;
}

type CategoryTab = "all" | FoodCategory | "meals";

// ── Category tabs ────────────────────────────────────────
const CATEGORY_TABS: { id: CategoryTab; label: string }[] = [
  { id: "all",         label: "All"         },
  { id: "popular",     label: "Popular"     },
  { id: "breads",      label: "Breads"      },
  { id: "rice",        label: "Rice"        },
  { id: "main-course", label: "Main Course" },
  { id: "beverages",   label: "Beverages"   },
  { id: "desserts",    label: "Desserts"    },
  { id: "meals",       label: "Meals"       },
];

const CATEGORY_OPTIONS: FoodCategory[] = [
  "popular", "breads", "rice", "main-course", "beverages", "desserts",
];

// ── Blank form state ─────────────────────────────────────
type FoodForm = {
  name: string;
  category: FoodCategory;
  price: string;
  diet: DietType;
  description: string;
};

const BLANK_FOOD_FORM: FoodForm = {
  name: "",
  category: "main-course",
  price: "",
  diet: "veg",
  description: "",
};

type MealForm = {
  name: string;
  items: string;   // comma-separated
  price: string;
  originalPrice: string;
  diet: DietType;
  mealTime: "breakfast" | "lunch" | "dinner";
};

const BLANK_MEAL_FORM: MealForm = {
  name: "",
  items: "",
  price: "",
  originalPrice: "",
  diet: "veg",
  mealTime: "lunch",
};

// ── Icons ────────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Modal shell ───────────────────────────────────────────
function Modal({ title, onClose, children }: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-zinc-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <h2 className="font-extrabold text-zinc-900 text-base">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center transition-colors text-zinc-500"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}

// ── Confirm delete dialog ──────────────────────────────────
function ConfirmDeleteModal({ name, onCancel, onConfirm }: {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon />
        </div>
        <h3 className="font-extrabold text-zinc-900 text-lg mb-1">
          Delete "{name}"?
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          This item will be removed from your menu.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 active:scale-[0.98] transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Food Item Form ────────────────────────────────────────
function FoodItemForm({ initial, onSave, onClose, mode }: {
  initial: FoodForm;
  onSave: (form: FoodForm) => void;
  onClose: () => void;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<FoodForm>(initial);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.price || Number(form.price) <= 0) return setError("Enter a valid price.");
    setError("");
    onSave(form);
  }

  return (
    <>
      <div className="space-y-4 mt-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Food Name *</label>
          <input
            id="food-form-name"
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            placeholder="e.g. Paneer Butter Masala"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Category *</label>
          <select
            id="food-form-category"
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition bg-white"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as FoodCategory })}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c.replace("-", " ").replace(/\b\w/g, (ch) => ch.toUpperCase())}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Price (₹) *</label>
          <input
            id="food-form-price"
            type="number"
            min="1"
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            placeholder="e.g. 180"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Diet type */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-2">Food Type *</label>
          <div className="flex gap-3">
            {(["veg", "nonveg"] as DietType[]).map((d) => (
              <label
                key={d}
                className={[
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all flex-1 justify-center",
                  form.diet === d
                    ? d === "veg"
                      ? "bg-green-50 border-green-400 text-green-700"
                      : "bg-red-50 border-red-400 text-red-700"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="diet"
                  value={d}
                  checked={form.diet === d}
                  onChange={() => setForm({ ...form, diet: d })}
                  className="hidden"
                />
                <span className={`w-2.5 h-2.5 rounded-sm ${d === "veg" ? "bg-green-500" : "bg-red-500"}`} />
                {d === "veg" ? "Veg" : "Non-Veg"}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Description</label>
          <textarea
            id="food-form-desc"
            rows={2}
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition resize-none"
            placeholder="Short description of the item"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          Cancel
        </button>
        <button
          id={`food-form-submit-${mode}`}
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all"
        >
          {mode === "add" ? "Add Item" : "Save Changes"}
        </button>
      </div>
    </>
  );
}

// ── Meal Form ─────────────────────────────────────────────
function MealFormModal({ initial, onSave, onClose, mode }: {
  initial: MealForm;
  onSave: (form: MealForm) => void;
  onClose: () => void;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<MealForm>(initial);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.items.trim()) return setError("Items list is required.");
    if (!form.price || Number(form.price) <= 0) return setError("Enter a valid price.");
    setError("");
    onSave(form);
  }

  return (
    <>
      <div className="space-y-4 mt-4">
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Meal Name *</label>
          <input
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            placeholder="e.g. Veg Lunch Thali"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">
            Items * <span className="text-zinc-400 font-normal">(comma separated)</span>
          </label>
          <input
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            placeholder="Roti ×3, Dal Tadka, Steamed Rice"
            value={form.items}
            onChange={(e) => setForm({ ...form, items: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5">Price (₹) *</label>
            <input
              type="number" min="1"
              className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              placeholder="180"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5">Original Price (₹)</label>
            <input
              type="number" min="1"
              className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              placeholder="240"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-2">Meal Type *</label>
          <div className="flex gap-3">
            {(["veg", "nonveg"] as DietType[]).map((d) => (
              <label
                key={d}
                className={[
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all flex-1 justify-center",
                  form.diet === d
                    ? d === "veg" ? "bg-green-50 border-green-400 text-green-700" : "bg-red-50 border-red-400 text-red-700"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300",
                ].join(" ")}
              >
                <input type="radio" name="meal-diet" value={d} checked={form.diet === d} onChange={() => setForm({ ...form, diet: d })} className="hidden" />
                <span className={`w-2.5 h-2.5 rounded-sm ${d === "veg" ? "bg-green-500" : "bg-red-500"}`} />
                {d === "veg" ? "Veg" : "Non-Veg"}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-1.5">Meal Time</label>
          <select
            className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition bg-white"
            value={form.mealTime}
            onChange={(e) => setForm({ ...form, mealTime: e.target.value as MealForm["mealTime"] })}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all"
        >
          {mode === "add" ? "Add Meal" : "Save Changes"}
        </button>
      </div>
    </>
  );
}

// ── Food Item Card ────────────────────────────────────────
function FoodItemCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: MenuItemWithAvail;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${item.available ? "border-zinc-100" : "border-zinc-200 opacity-70"}`}>
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs font-extrabold text-zinc-500 bg-white px-2.5 py-1 rounded-full border border-zinc-200">
              Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={`w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-extrabold ${item.diet === "veg" ? "bg-green-500" : "bg-red-500"}`}>
            {item.diet === "veg" ? "V" : "N"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="font-extrabold text-zinc-900 text-sm leading-snug">{item.name}</h3>
          <span className="text-sm font-extrabold text-zinc-900 shrink-0">₹{item.price}</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">{item.description}</p>

        {/* Availability toggle */}
        <button
          id={`toggle-${item.id}`}
          onClick={onToggle}
          className={[
            "flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-all mb-3",
            item.available
              ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100",
          ].join(" ")}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-green-500 animate-pulse" : "bg-zinc-400"}`} />
          {item.available ? "Available" : "Unavailable"}
        </button>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            id={`edit-${item.id}`}
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
          >
            <EditIcon /> Edit
          </button>
          <button
            id={`delete-${item.id}`}
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-100 text-xs font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Meal Combo Card ───────────────────────────────────────
function MealComboCard({
  combo,
  onEdit,
  onDelete,
  onToggle,
}: {
  combo: MealComboWithAvail;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${combo.available ? "border-zinc-100" : "border-zinc-200 opacity-70"}`}>
      <div className="flex items-start gap-3">
        {/* Diet badge */}
        <span className={`w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-extrabold shrink-0 mt-0.5 ${combo.diet === "veg" ? "bg-green-500" : "bg-red-500"}`}>
          {combo.diet === "veg" ? "V" : "N"}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-extrabold text-zinc-900 text-sm leading-snug">{combo.name}</h3>
            <div className="text-right shrink-0">
              <p className="text-sm font-extrabold text-zinc-900">₹{combo.price}</p>
              {combo.originalPrice > combo.price && (
                <p className="text-[11px] text-zinc-400 line-through">₹{combo.originalPrice}</p>
              )}
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-1">
            {combo.items.join(" · ")}
          </p>
          <p className="text-[11px] text-zinc-300 capitalize mb-3">
            {combo.mealTime}
          </p>

          <div className="flex items-center gap-2">
            {/* Availability */}
            <button
              onClick={onToggle}
              className={[
                "flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full border transition-all",
                combo.available
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-zinc-50 border-zinc-200 text-zinc-400",
              ].join(" ")}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${combo.available ? "bg-green-500 animate-pulse" : "bg-zinc-400"}`} />
              {combo.available ? "Available" : "Unavailable"}
            </button>

            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-zinc-700 transition-colors px-2 py-0.5 rounded-lg hover:bg-zinc-50"
            >
              <EditIcon /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-600 transition-colors px-2 py-0.5 rounded-lg hover:bg-red-50"
            >
              <TrashIcon /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Menu Page ────────────────────────────────────────
export default function AdminMenu() {
  // ── State: food items & meal combos ─────────────────────
  const [items, setItems] = useState<MenuItemWithAvail[]>(
    initialItems.map((i) => ({ ...i, available: true }))
  );
  const [combos, setCombos] = useState<MealComboWithAvail[]>(
    initialCombos.map((c) => ({ ...c, available: true }))
  );

  // ── Active tab ───────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");

  // ── Food modal state ─────────────────────────────────────
  const [foodModal, setFoodModal] = useState<
    | { mode: "add" }
    | { mode: "edit"; item: MenuItemWithAvail }
    | null
  >(null);

  // ── Meal modal state ─────────────────────────────────────
  const [mealModal, setMealModal] = useState<
    | { mode: "add" }
    | { mode: "edit"; combo: MealComboWithAvail }
    | null
  >(null);

  // ── Delete confirm state ─────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<
    | { kind: "food"; id: string; name: string }
    | { kind: "meal"; id: string; name: string }
    | null
  >(null);

  // ── Filtered items ───────────────────────────────────────
  const filteredItems =
    activeTab === "all"     ? items :
    activeTab === "meals"   ? [] :
    activeTab === "popular" ? items.filter((i) => i.isPopular) :
    items.filter((i) => i.category === activeTab);

  // ── Food CRUD ────────────────────────────────────────────
  function handleSaveFood(form: FoodForm) {
    if (foodModal?.mode === "add") {
      const newItem: MenuItemWithAvail = {
        id: `i${Date.now()}`,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        diet: form.diet,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=300&q=80",
        isPopular: false,
        available: true,
      };
      setItems((prev) => [newItem, ...prev]);
    } else if (foodModal?.mode === "edit") {
      setItems((prev) =>
        prev.map((i) =>
          i.id === foodModal.item.id
            ? { ...i, name: form.name, description: form.description, price: Number(form.price), category: form.category, diet: form.diet }
            : i
        )
      );
    }
    setFoodModal(null);
  }

  function handleDeleteFood(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteTarget(null);
  }

  function handleToggleFood(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i))
    );
  }

  // ── Meal CRUD ────────────────────────────────────────────
  function handleSaveMeal(form: MealForm) {
    if (mealModal?.mode === "add") {
      const newCombo: MealComboWithAvail = {
        id: `c${Date.now()}`,
        name: form.name,
        items: form.items.split(",").map((s) => s.trim()).filter(Boolean),
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || Number(form.price),
        diet: form.diet,
        mealTime: form.mealTime,
        image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&h=300&q=80",
        available: true,
      };
      setCombos((prev) => [newCombo, ...prev]);
    } else if (mealModal?.mode === "edit") {
      setCombos((prev) =>
        prev.map((c) =>
          c.id === mealModal.combo.id
            ? { ...c, name: form.name, items: form.items.split(",").map((s) => s.trim()).filter(Boolean), price: Number(form.price), originalPrice: Number(form.originalPrice) || c.originalPrice, diet: form.diet, mealTime: form.mealTime }
            : c
        )
      );
    }
    setMealModal(null);
  }

  function handleDeleteMeal(id: string) {
    setCombos((prev) => prev.filter((c) => c.id !== id));
    setDeleteTarget(null);
  }

  function handleToggleMeal(id: string) {
    setCombos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, available: !c.available } : c))
    );
  }

  // ── Tab count ────────────────────────────────────────────
  function countForTab(tab: CategoryTab): number {
    if (tab === "meals")   return combos.length;
    if (tab === "all")     return items.length;
    if (tab === "popular") return items.filter((i) => i.isPopular).length;
    return items.filter((i) => i.category === tab).length;
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Menu Management</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your food items and meals</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            id="add-food-btn"
            onClick={() => setFoodModal({ mode: "add" })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-sm"
          >
            <PlusIcon /> Add Food Item
          </button>
          <button
            id="add-meal-btn"
            onClick={() => setMealModal({ mode: "add" })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 active:scale-[0.98] transition-all shadow-sm"
          >
            <PlusIcon /> Add Meal
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Items",      value: items.length                               },
          { label: "Available",        value: items.filter((i) => i.available).length    },
          { label: "Meal Combos",      value: combos.length                              },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-extrabold text-zinc-900">{s.value}</p>
            <p className="text-xs text-zinc-400 mt-0.5 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category tabs */}
      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex gap-2 w-max">
          {CATEGORY_TABS.map((tab) => {
            const count = countForTab(tab.id);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`menu-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap focus:outline-none",
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900",
                ].join(" ")}
              >
                {tab.label}
                <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-md leading-none ${isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MEALS TAB ── */}
      {activeTab === "meals" ? (
        <div>
          {combos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-16 text-center">
              <p className="text-4xl mb-3">🥘</p>
              <p className="font-bold text-zinc-900">No meal combos yet</p>
              <p className="text-sm text-zinc-400 mt-1">Click "+ Add Meal" to create your first combo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combos.map((combo) => (
                <MealComboCard
                  key={combo.id}
                  combo={combo}
                  onEdit={() => setMealModal({
                    mode: "edit",
                    combo,
                  })}
                  onDelete={() => setDeleteTarget({ kind: "meal", id: combo.id, name: combo.name })}
                  onToggle={() => handleToggleMeal(combo.id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── FOOD ITEMS GRID ── */
        <div>
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-16 text-center">
              <p className="text-4xl mb-3">🍽</p>
              <p className="font-bold text-zinc-900">No items in this category</p>
              <p className="text-sm text-zinc-400 mt-1">Add items using "+ Add Food Item".</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => setFoodModal({ mode: "edit", item })}
                  onDelete={() => setDeleteTarget({ kind: "food", id: item.id, name: item.name })}
                  onToggle={() => handleToggleFood(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Food modal ── */}
      {foodModal && (
        <Modal
          title={foodModal.mode === "add" ? "Add Food Item" : "Edit Food Item"}
          onClose={() => setFoodModal(null)}
        >
          <FoodItemForm
            mode={foodModal.mode}
            initial={
              foodModal.mode === "edit"
                ? {
                    name: foodModal.item.name,
                    category: foodModal.item.category,
                    price: String(foodModal.item.price),
                    diet: foodModal.item.diet,
                    description: foodModal.item.description,
                  }
                : BLANK_FOOD_FORM
            }
            onSave={handleSaveFood}
            onClose={() => setFoodModal(null)}
          />
        </Modal>
      )}

      {/* ── Meal modal ── */}
      {mealModal && (
        <Modal
          title={mealModal.mode === "add" ? "Add Meal Combo" : "Edit Meal Combo"}
          onClose={() => setMealModal(null)}
        >
          <MealFormModal
            mode={mealModal.mode}
            initial={
              mealModal.mode === "edit"
                ? {
                    name: mealModal.combo.name,
                    items: mealModal.combo.items.join(", "),
                    price: String(mealModal.combo.price),
                    originalPrice: String(mealModal.combo.originalPrice),
                    diet: mealModal.combo.diet,
                    mealTime: mealModal.combo.mealTime,
                  }
                : BLANK_MEAL_FORM
            }
            onSave={handleSaveMeal}
            onClose={() => setMealModal(null)}
          />
        </Modal>
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <ConfirmDeleteModal
          name={deleteTarget.name}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            if (deleteTarget.kind === "food") handleDeleteFood(deleteTarget.id);
            else handleDeleteMeal(deleteTarget.id);
          }}
        />
      )}
    </div>
  );
}
