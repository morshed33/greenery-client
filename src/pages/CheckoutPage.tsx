import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Tailwind and Toastify styles
import { clearCart, selectCartItemsForOrder } from "@/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

interface IOrderResponse {
  success: boolean;
  message: string;
}

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItemsForOrder);
  const [orderResponse, setOrderResponse] = useState<IOrderResponse | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Mock API request
      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: data,
          paymentMethod: data.paymentMethod, // Payment Method added
          products: cartItems.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const result: IOrderResponse = await response.json();

      if (result.success) {
        setOrderResponse(result);
        dispatch(clearCart()); // Clear the cart if the order is successful
        toast.success("Order placed successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(result.message || "Order failed. Try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-12">
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-6">
          Checkout
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className={`mt-1 p-2 block w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="text"
                className={`mt-1 p-2 block w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                className={`mt-1 p-2 block w-full border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Email (optional)
              </label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  {...register("paymentMethod", {
                    required: "Please select a payment method",
                  })}
                  type="radio"
                  value="cashOnDelivery"
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="stripe"
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Stripe</span>
              </label>
            </div>
            {errors.paymentMethod && (
              <span className="text-red-500 text-sm">
                {errors.paymentMethod.message}
              </span>
            )}
          </div>

          {/* Products Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-700">
              Order Summary
            </h3>
            <ul className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <li key={item.productId} className="flex justify-between">
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-lg font-semibold text-green-700 flex justify-between">
              <span>Total</span>
              <span>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-sm transition duration-300 ease-in-out"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
