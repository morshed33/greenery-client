import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  editProduct,
  fetchProducts,
} from "@/store/slices/productSlice";
import { Button } from "@/components/ui/button";
import ProductsTable from "@/components/Products/ProductsTable";
import CreateProductDialog from "@/components/Products/CreateProductDialog";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-4 pt-10">
      <div className="flex items-center justify-between p-4 mb-10 bg-gray-400 rounded-lg">
        <h1 className="text-xl xl:text-2xl uppercase font-semibold">Popular Products</h1>
        <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
          Create Product
        </Button>
      </div>

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
