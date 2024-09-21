import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 relative">
      <Router>
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
