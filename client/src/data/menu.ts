export type FoodCategory =
  | "popular"
  | "breads"
  | "rice"
  | "main-course"
  | "beverages"
  | "desserts";

export type DietType = "veg" | "nonveg";
export type MealTime = "breakfast" | "lunch" | "dinner";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  diet: DietType;
  image: string;
  isPopular: boolean;
}

export interface MealCombo {
  id: string;
  name: string;
  items: string[];
  price: number;
  originalPrice: number;
  diet: DietType;
  mealTime: MealTime;
  image: string;
}

// ── Individual Menu Items (12 items) ────────────────────
export const menuItems: MenuItem[] = [
  {
    id: "i1",
    name: "Tandoori Roti",
    description: "Whole wheat bread baked in a clay tandoor",
    price: 15,
    category: "breads",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: true,
  },
  {
    id: "i2",
    name: "Butter Naan",
    description: "Soft leavened flatbread with a rich butter glaze",
    price: 30,
    category: "breads",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=280&q=80",
    isPopular: false,
  },
  {
    id: "i3",
    name: "Steamed Rice",
    description: "Long-grain basmati, fluffy and perfectly cooked",
    price: 60,
    category: "rice",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: false,
  },
  {
    id: "i4",
    name: "Jeera Rice",
    description: "Basmati rice tempered with cumin seeds and ghee",
    price: 80,
    category: "rice",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&h=260&q=80",
    isPopular: true,
  },
  {
    id: "i5",
    name: "Dal Tadka",
    description: "Yellow lentils tempered with cumin and spices",
    price: 120,
    category: "main-course",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: true,
  },
  {
    id: "i6",
    name: "Paneer Butter Masala",
    description: "Cottage cheese in a silky tomato-cream gravy",
    price: 180,
    category: "main-course",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: true,
  },
  {
    id: "i7",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in cream and butter",
    price: 160,
    category: "main-course",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=260&q=80",
    isPopular: true,
  },
  {
    id: "i8",
    name: "Chicken Curry",
    description: "Tender chicken pieces in an aromatic onion-tomato gravy",
    price: 200,
    category: "main-course",
    diet: "nonveg",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: true,
  },
  {
    id: "i9",
    name: "Butter Chicken",
    description: "Mildly spiced chicken in a buttery tomato sauce",
    price: 220,
    category: "main-course",
    diet: "nonveg",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=260&q=80",
    isPopular: true,
  },
  {
    id: "i10",
    name: "Sweet Lassi",
    description: "Chilled yoghurt drink, lightly sweetened",
    price: 60,
    category: "beverages",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&h=300&q=80",
    isPopular: false,
  },
  {
    id: "i11",
    name: "Masala Chai",
    description: "Spiced tea brewed with ginger and cardamom",
    price: 30,
    category: "beverages",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&h=260&q=80",
    isPopular: false,
  },
  {
    id: "i12",
    name: "Gulab Jamun",
    description: "Soft milk-solid dumplings soaked in rose sugar syrup",
    price: 60,
    category: "desserts",
    diet: "veg",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&h=260&q=80",
    isPopular: false,
  },
];

// ── Meal Combos (5 combos) ───────────────────────────────
export const mealCombos: MealCombo[] = [
  {
    id: "c1",
    name: "Veg Breakfast Combo",
    items: ["Aloo Paratha ×2", "Curd", "Butter", "Pickle"],
    price: 99,
    originalPrice: 130,
    diet: "veg",
    mealTime: "breakfast",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: "c2",
    name: "Veg Lunch Thali",
    items: ["Roti ×3", "Steamed Rice", "Dal Tadka", "Seasonal Sabzi", "Pickle", "Papad"],
    price: 180,
    originalPrice: 240,
    diet: "veg",
    mealTime: "lunch",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: "c3",
    name: "Non-Veg Lunch Special",
    items: ["Roti ×2", "Jeera Rice", "Chicken Curry", "Raita", "Pickle"],
    price: 249,
    originalPrice: 320,
    diet: "nonveg",
    mealTime: "lunch",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: "c4",
    name: "Veg Dinner Thali",
    items: ["Butter Naan ×2", "Dal Makhani", "Paneer Masala", "Steamed Rice", "Gulab Jamun"],
    price: 220,
    originalPrice: 300,
    diet: "veg",
    mealTime: "dinner",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: "c5",
    name: "Non-Veg Dinner Special",
    items: ["Butter Naan ×2", "Butter Chicken", "Jeera Rice", "Raita", "Salad"],
    price: 299,
    originalPrice: 390,
    diet: "nonveg",
    mealTime: "dinner",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=260&q=80",
  },
];
