import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  TCartItem,
} from "../store/slices/cartSlice"; // adjust the path if necessary
import { RootState } from "@/store/store";

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

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <table className="w-full table-auto mb-8">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Product</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Price</th>
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
                  className="w-20 h-20 object-cover"
                />
                <span>{item.title}</span>
              </td>
              <td className="py-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                    disabled={item.addedQuantity === 1}
                  >
                    -
                  </button>
                  <span>{item.addedQuantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                    disabled={item.addedQuantity === item.quantity}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-2">${item.price.toFixed(2)}</td>
              <td className="py-2">
                ${(item.price * item.addedQuantity).toFixed(2)}
              </td>
              <td className="py-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
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
            className="px-6 py-2 bg-red-500 text-white rounded"
          >
            Clear Cart
          </button>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
