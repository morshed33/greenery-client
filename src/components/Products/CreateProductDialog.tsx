/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import {
  createProduct,
  fetchProducts,
  ICreateProduct,
} from "../../store/slices/productSlice";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState<ICreateProduct>({
    title: "",
    price: 0,
    quantity: 0,
    image: "",
    rating: 0,
    category: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newProduct.title) errors.title = "Title is required";
    if (!newProduct.description) errors.description = "Description is required";
    if (!newProduct.image) errors.image = "Image is required";
    if (!newProduct.category) errors.category = "Category is required";
    if (newProduct.price <= 0) errors.price = "Price must be greater than zero";
    if (newProduct.quantity < 0)
      errors.quantity = "Quantity cannot be negative";
    if (newProduct.rating < 0 || newProduct.rating > 5)
      errors.rating = "Rating must be between 0 and 5";
    return errors;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setIsSubmitting(true);
      try {
        await dispatch(createProduct(newProduct));
        setIsSuccess(true);
        setNewProduct({
          title: "",
          price: 0,
          quantity: 0,
          image: "",
          rating: 0,
          category: "",
          description: "",
        });
        dispatch(fetchProducts());
        setIsSuccess(false);
        onClose();
      } catch (error: any) {
        setFormErrors({ submit: error?.message || "Failed to create product" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create Product</DialogTitle>
        <form onSubmit={handleCreateProduct} className="space-y-4 my-6">
          <div className="space-y-1">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter product title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
            {formErrors.title && (
              <span className="text-red-500 text-sm">{formErrors.title}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Product Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            {formErrors.description && (
              <span className="text-red-500 text-sm">
                {formErrors.description}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Product Category</Label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="Enter product category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            {formErrors.category && (
              <span className="text-red-500 text-sm">
                {formErrors.category}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Product Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
            />
            {formErrors.price && (
              <span className="text-red-500 text-sm">{formErrors.price}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity: Number(e.target.value),
                })
              }
            />
            {formErrors.quantity && (
              <span className="text-red-500 text-sm">
                {formErrors.quantity}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              placeholder="Enter product rating (0-5)"
              value={newProduct.rating}
              onChange={(e) =>
                setNewProduct({ ...newProduct, rating: Number(e.target.value) })
              }
              min={0}
              max={5}
            />
            {formErrors.rating && (
              <span className="text-red-500 text-sm">{formErrors.rating}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="image">Product Image URL</Label>
            <Input
              id="image"
              name="image"
              type="text"
              placeholder="Enter image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>

          {formErrors.submit && (
            <div className="text-red-500">{formErrors.submit}</div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Create Product"}
          </Button>
          {isSuccess && (
            <div className="text-green-500">Product created successfully!</div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
