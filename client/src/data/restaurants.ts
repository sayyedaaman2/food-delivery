export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviews: number;
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  priceForTwo: number;
  image: string;
  isVeg: boolean;
  isOpen: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Sharma's Kitchen",
    cuisine: ["North Indian", "Punjabi"],
    rating: 4.6,
    reviews: 1240,
    deliveryTime: "25–30 min",
    minOrder: 149,
    deliveryFee: 0,
    priceForTwo: 350,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: false,
    isOpen: true,
  },
  {
    id: "r2",
    name: "Coastal Bites",
    cuisine: ["South Indian"],
    rating: 4.4,
    reviews: 893,
    deliveryTime: "20–25 min",
    minOrder: 99,
    deliveryFee: 30,
    priceForTwo: 250,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: true,
    isOpen: true,
  },
  {
    id: "r3",
    name: "The Wok Box",
    cuisine: ["Chinese", "Pan-Asian"],
    rating: 4.2,
    reviews: 567,
    deliveryTime: "30–35 min",
    minOrder: 199,
    deliveryFee: 0,
    priceForTwo: 400,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: false,
    isOpen: true,
  },
  {
    id: "r4",
    name: "Italiano Bliss",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    reviews: 2103,
    deliveryTime: "35–40 min",
    minOrder: 249,
    deliveryFee: 50,
    priceForTwo: 600,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: false,
    isOpen: false,
  },
  {
    id: "r5",
    name: "Burger Lab",
    cuisine: ["Burgers", "Fast Food"],
    rating: 4.3,
    reviews: 764,
    deliveryTime: "20–25 min",
    minOrder: 149,
    deliveryFee: 0,
    priceForTwo: 350,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: false,
    isOpen: true,
  },
  {
    id: "r6",
    name: "Spice Route",
    cuisine: ["Biryani", "Mughlai"],
    rating: 4.7,
    reviews: 3456,
    deliveryTime: "40–45 min",
    minOrder: 199,
    deliveryFee: 0,
    priceForTwo: 450,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=480&h=240&q=80",
    isVeg: false,
    isOpen: true,
  },
];
