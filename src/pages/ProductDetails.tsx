import PlantSpinner from "@/components/common/PlantSpinner";
import { useAppDispatch } from "@/store/hook";
import {
  clearProductDetails,
  fetchProduct,
  IProduct,
} from "@/store/slices/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "react-toastify";

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

  const { title, price, quantity, image, rating, category, description } =
    product;

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        id: product._id!,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        addedQuantity: 1,
      })
    );

    toast.success(`${product.title} has been added to your cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-40">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-8">{title}</h1>{" "}
            <div className="flex items-center">
              <span className="text-yellow-500">
                {"★".repeat(Math.floor(rating))}
              </span>
              <span className="ml-2 text-gray-600">{rating} / 5</span>
            </div>
          </div>
          <span className="text-gray-600 text-sm text-muted-foreground p-2 rounded uppercase bg-green-200 border">
            {category}
          </span>

          <p className="my-8 text-gray-700">{description}</p>

          <div className="flex justify-between items-center">
            <div className="mt-4">
              <span className="text-2xl font-semibold text-green-500">
                ${price.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <span
                className={`text-lg font-medium ${
                  quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {quantity > 0 ? `In Stock: ${quantity}` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <Button
              onClick={() => handleAddToCart(product)}
              className={`w-full mt-4  text-white font-bold ${
                quantity > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={quantity === 0}
            >
              {quantity > 0 ? "Add to Cart" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
