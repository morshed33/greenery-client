import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct } from "@/store/slices/productSlice";
import { useForm } from "react-hook-form";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<IProduct>();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    reset(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete);
      setProductToDelete(null);
    }
  };

  const handleEditSubmit = (data: IProduct) => {
    onEditProduct({ ...selectedProduct, ...data });
    setIsDialogOpen(false);
  };

  return (
    <>
      <div>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.title}
                      width={50}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => handleEdit(product)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => handleDelete(product._id!)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Product</DialogTitle>
          <form onSubmit={handleSubmit(handleEditSubmit)}>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("title")}
                required
              />
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Price"
                {...register("price")}
                required
              />
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Quantity"
                {...register("quantity")}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {productToDelete && (
        <Dialog
          open={!!productToDelete}
          onOpenChange={() => setProductToDelete(null)}
        >
          <DialogContent>
            <DialogTitle>Confirm Delete</DialogTitle>
            <p>Are you sure you want to delete this product?</p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductsTable;
