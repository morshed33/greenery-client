import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  TCartItem,
} from "../store/slices/cartSlice";
import { RootState } from "@/store/store";
import { FaLeaf, FaShoppingCart } from "react-icons/fa";
import { TbChristmasTreeOff, TbTree, TbTrees } from "react-icons/tb";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.addedQuantity,
    0
  );

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Warn user before refresh
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-8">
        <FaLeaf className="text-green-600 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-16 p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700 flex items-center">
        <FaShoppingCart className="mr-2" />
        Shopping Cart
      </h1>
      <table className="w-full table-auto mb-8">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Product</th>
            <th className="py-2">Quantity</th>
            <th className="py-2 hidden sm:table-cell">Price</th>
            <th className="py-2">Total</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item: TCartItem) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover transition-transform duration-300 hover:scale-110"
                />
                <span>{item.title}</span>
              </td>
              <td className="py-2">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {/* Decrease Button */}
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className={`px-3 py-1 text-green-800 rounded transition duration-200 ${
                      item.addedQuantity === 1
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-green-300 hover:bg-green-400"
                    }`}
                    disabled={item.addedQuantity === 1}
                  >
                    <TbTree />
                  </button>

                  {/* Quantity Display */}
                  <span>{item.addedQuantity}</span>

                  {/* Increase Button */}
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className={`px-3 py-1 text-green-800 rounded transition duration-200 ${
                      item.addedQuantity >= item.quantity
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-green-300 hover:bg-green-400"
                    }`}
                    disabled={item.addedQuantity >= item.quantity}
                  >
                    <TbTrees />
                  </button>
                </div>
              </td>
              <td className="py-2 hidden sm:table-cell">
                ৳{item.price.toFixed(2)}
              </td>
              <td className="py-2">
                ৳{(item.price * item.addedQuantity).toFixed(2)}
              </td>
              <td className="py-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-1 bg-rose-500 text-white hover:bg-rose-600 rounded transition duration-200"
                >
                  <TbChristmasTreeOff />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={handleClearCart}
            className="px-6 py-2 bg-rose-500 text-white hover:bg-rose-600 rounded transition duration-200"
          >
            Clear Cart
          </button>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-green-700">
            Total: ৳{cartTotal.toFixed(2)}
          </h2>
          <button className="mt-4 px-6 py-2 bg-green-500 text-white hover:bg-green-600 rounded transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
