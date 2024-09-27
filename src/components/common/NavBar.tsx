import { FC, useState } from "react";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" ">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 text-2xl font-bold text-green-600">
            <Link to="/">Greenery</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:space-x-8">
            {["Products", "Cart"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600 transition duration-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide-in from right) */}
      <div
        className={`fixed inset-0 bg-green-200 z-50 transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-green-500 transition duration-200 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div className="mt-16 space-y-4">
          {["Home", "Products", "Cart", "Payment", "Manage"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block text-gray-700 hover:text-white hover:bg-green-500 px-4 py-2 text-lg font-medium transition duration-200"
              onClick={toggleMobileMenu}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
