import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

// Customer pages
import Home from "./pages/customer/Home";
import RestaurantDetails from "./pages/customer/RestaurantDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderTracking from "./pages/customer/OrderTracking";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import OrderDetails from "./pages/admin/OrderDetails";

// Delivery pages
import DeliveryDashboard from "./pages/delivery/Dashboard";
import ActiveDelivery from "./pages/delivery/ActiveDelivery";

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          {/* Customer */}
          <Route path="/customer" element={<Home />} />
          <Route path="/customer/restaurant" element={<RestaurantDetails />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/checkout" element={<Checkout />} />
          <Route path="/customer/order" element={<OrderTracking />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/order" element={<OrderDetails />} />

          {/* Delivery */}
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/delivery/active" element={<ActiveDelivery />} />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
