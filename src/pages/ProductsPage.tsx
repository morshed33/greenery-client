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
import SectionHead from "@/components/common/SectionHead";
import { FaPlus, FaTree } from "react-icons/fa";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return (
    <div className="p-4 pt-10 pb-20 bg-green-100">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title="Manage Plants."
          description="All of the plants you need to grow."
        />
        <div className="flex justify-end">
          <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
            <FaPlus className="text-green-600" />{" "}
            <FaTree className="text-green-600" />
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
    </div>
  );
};

export default ProductsPage;
