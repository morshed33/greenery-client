import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/store/slices/productSlice";
import ProductRow from "./ProductRow";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

interface IProductsTableProps {
  products: IProduct[];
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: IProduct) => void;
}

const ProductsTable: FC<IProductsTableProps> = ({
  products,
  onDeleteProduct,
  onEditProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
  };

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="flex justify-between items-center !w-full">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onEditProduct={onEditProduct}
        />
      )}

      {productToDelete && (
        <DeleteProductDialog
          productId={productToDelete}
          onClose={() => setProductToDelete(null)}
          onDeleteProduct={onDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
