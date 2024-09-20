import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "@/store/slices/productSlice";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface IEditProductDialogProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
  onEditProduct: (product: IProduct) => void;
}

export const EditProductDialog: FC<IEditProductDialogProps> = ({
  product,
  isOpen,
  onClose,
  onEditProduct,
}) => {
  const { register, handleSubmit, reset } = useForm<IProduct>();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = (data: IProduct) => {
    onEditProduct({ ...product, ...data });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Edit Product</DialogTitle>
        <form className="space-y-3 my-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              {...register("title")}
              required
              defaultValue={product.title}
            />
          </div>
          <div className="space-y-1">
            <Label>Price</Label>
            <Input
              type="number"
              placeholder="Price"
              {...register("price")}
              required
              defaultValue={product.price}
            />
          </div>
          <div className="space-y-1">
            <Label>Quantity</Label>
            <Input
              type="number"
              placeholder="Quantity"
              {...register("quantity")}
              required
              defaultValue={product.quantity}
            />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Description"
              {...register("description")}
              defaultValue={product.description}
            />
          </div>
          <div className="space-y-1">
            <Label>Rating</Label>
            <Input
              type="number"
              placeholder="Rating"
              {...register("rating")}
              defaultValue={product.rating}
            />
          </div>

          <div className="space-y-1">
            <Label>Image URL</Label>
            <Input
              type="text"
              placeholder="Image URL"
              {...register("image")}
              defaultValue={product.image}
            />
          </div>

          <DialogFooter className="pt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
