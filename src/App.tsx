import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import ProductsPage from "./pages/ProductsPage";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";

// Scroll Restoration Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 relative">
      <Router>
        <ScrollToTop />
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-[calc(100dvh-65px)] bg-green-100 text-center">
                  <h1 className="text-6xl font-bold text-green-600">404</h1>
                  <h2 className="text-3xl font-semibold text-gray-700 mt-4">
                    Oops! Page Not Found
                  </h2>
                  <p className="text-gray-500 mt-2">
                    It seems the page you're looking for doesn't exist.
                  </p>

                  <Link
                    to="/"
                    className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Back to Home
                  </Link>

                  <img
                    src="/OIP.png"
                    alt="Sad plant illustration"
                    className="mt-8 w-60 rounded-full"
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
