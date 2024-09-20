import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IDeleteProductDialogProps {
  productId: string;
  onClose: () => void;
  onDeleteProduct: (id: string) => void;
}

export const DeleteProductDialog: FC<IDeleteProductDialogProps> = ({
  productId,
  onClose,
  onDeleteProduct,
}) => {
  const confirmDelete = () => {
    onDeleteProduct(productId);
    onClose();
  };

  return (
    <Dialog open={!!productId} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Confirm Delete</DialogTitle>
        <p>Are you sure you want to delete this product?</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
