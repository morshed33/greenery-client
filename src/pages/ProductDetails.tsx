// src/components/ProductDetails.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import the AppDispatch type
import { clearProductDetails, fetchProduct } from "@/store/slices/productSlice";
import { useAppDispatch } from "@/store/hook";
import PlantSpinner from "@/components/common/PlantSpinner";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch: AppDispatch = useAppDispatch();

  const product = useSelector(
    (state: RootState) => state.products.productDetails
  );
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, productId]);

  if (status === "loading") {
    return <PlantSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product details available</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          {product?.title}
        </h1>
        <p className="text-lg text-gray-700 mt-2">{product?.description}</p>
        <p className="text-xl text-primary font-bold mt-4">
          Price: ${product?.price?.toFixed(2)}
        </p>
        <p className="text-gray-600 mt-2">Category: {product?.category}</p>
        <div className="flex items-center mt-4">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-gray-600">{product?.rating}</span>
        </div>
        <button
          className="mt-6 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-all duration-300"
          onClick={() => alert("Added to cart!")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
