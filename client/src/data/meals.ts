export type MealCategory = "breakfast" | "lunch" | "dinner" | "veg" | "nonveg";

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MealCategory;
  image: string;
  isVeg: boolean;
  restaurantId: string;
  restaurantName: string;
}

export const meals: Meal[] = [
  {
    id: "m1",
    name: "Veg Lunch Thali",
    description: "Roti · Rice · Dal · Sabzi · Pickle",
    price: 180,
    category: "lunch",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: true,
    restaurantId: "r1",
    restaurantName: "Sharma's Kitchen",
  },
  {
    id: "m2",
    name: "Chicken Biryani",
    description: "Basmati rice · Tender chicken · Raita · Salan",
    price: 249,
    category: "nonveg",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: false,
    restaurantId: "r6",
    restaurantName: "Spice Route",
  },
  {
    id: "m3",
    name: "Masala Dosa",
    description: "Crispy dosa · Spiced potato · Sambar · Chutney",
    price: 120,
    category: "breakfast",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: true,
    restaurantId: "r2",
    restaurantName: "Coastal Bites",
  },
  {
    id: "m4",
    name: "Paneer Butter Masala",
    description: "Cottage cheese · Rich tomato gravy · Butter naan",
    price: 220,
    category: "veg",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: true,
    restaurantId: "r1",
    restaurantName: "Sharma's Kitchen",
  },
  {
    id: "m5",
    name: "Veg Fried Noodles",
    description: "Wok-tossed noodles · Mixed vegetables · Soy sauce",
    price: 160,
    category: "veg",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: true,
    restaurantId: "r3",
    restaurantName: "The Wok Box",
  },
  {
    id: "m6",
    name: "Grilled Chicken Platter",
    description: "Herbed chicken breast · Grilled veggies · Garlic bread",
    price: 299,
    category: "dinner",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=300&q=80",
    isVeg: false,
    restaurantId: "r5",
    restaurantName: "Burger Lab",
  },
];
