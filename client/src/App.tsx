import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Customer pages
import Home from "./pages/customer/Home";
import RestaurantDetails from "./pages/customer/RestaurantDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderTracking from "./pages/customer/OrderTracking";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrderDetails from "./pages/admin/OrderDetails";
import AdminMenu from "./pages/admin/Menu";
import AdminMeals from "./pages/admin/Meals";
import AdminRestaurant from "./pages/admin/Restaurant";
import AdminSettings from "./pages/admin/Settings";

// Delivery pages
import DeliveryDashboard from "./pages/delivery/Dashboard";
import ActiveDelivery from "./pages/delivery/ActiveDelivery";

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Customer routes (bottom nav layout) ── */}
            <Route element={<CustomerLayout />}>
              <Route path="/customer"            element={<Home />} />
              <Route path="/customer/restaurant" element={<RestaurantDetails />} />
              <Route path="/customer/cart"       element={<Cart />} />
              <Route path="/customer/checkout"   element={<Checkout />} />
              <Route path="/customer/order"      element={<OrderTracking />} />
            </Route>

            {/* ── Admin routes (sidebar layout) ── */}
            <Route element={<AdminLayout />}>
              <Route path="/admin"            element={<AdminDashboard />} />
              <Route path="/admin/order"      element={<AdminOrderDetails />} />
              <Route path="/admin/menu"       element={<AdminMenu />} />
              <Route path="/admin/meals"      element={<AdminMeals />} />
              <Route path="/admin/restaurant" element={<AdminRestaurant />} />
              <Route path="/admin/settings"   element={<AdminSettings />} />
            </Route>

            {/* ── Delivery ── */}
            <Route path="/delivery"        element={<DeliveryDashboard />} />
            <Route path="/delivery/active" element={<ActiveDelivery />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
