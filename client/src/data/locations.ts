export type LatLng = [number, number];

export const locations: {
  restaurant: LatLng;
  customer: LatLng;
  deliveryAgent: LatLng;
} = {
  restaurant: [17.6599, 75.9064],
  customer: [17.6710, 75.9140],
  deliveryAgent: [17.6650, 75.9100],
};

// Predefined 9-point route from Restaurant to Customer
export const deliveryRoute: LatLng[] = [
  [17.6599, 75.9064], // 0: Restaurant
  [17.6612, 75.9075], // 1
  [17.6625, 75.9086], // 2
  [17.6640, 75.9098], // 3
  [17.6652, 75.9108], // 4: Mid point
  [17.6668, 75.9118], // 5
  [17.6682, 75.9126], // 6
  [17.6696, 75.9134], // 7
  [17.6710, 75.9140], // 8: Customer
];
