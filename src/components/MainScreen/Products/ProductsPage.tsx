import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import ProductsTable from "./ProductsTable";
import {
  fetchProducts,
  deleteProduct,
  editProduct,
} from "../../../store/slices/productSlice";
import { Button } from "@/components/ui/button";
import CreateProductDialog from "./CreateProductDialog";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <Button onClick={() => setIsDialogOpen(true)}>Create Product</Button>

      <ProductsTable
        products={products}
        onDeleteProduct={(id) => dispatch(deleteProduct(id))}
        onEditProduct={(product) => dispatch(editProduct(product))}
      />

      <CreateProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ProductsPage;
