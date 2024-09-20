import { FC } from "react";
import { IProduct } from "@/store/slices/productSlice";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

interface IProductRowProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
}

const ProductRow: FC<IProductRowProps> = ({ product, onEdit, onDelete }) => {
  return (
    <TableRow className="flex justify-between items-center !w-full">
      <TableCell>
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          width={50}
          className="rounded-md"
        />
      </TableCell>
      <TableCell className="flex items-center gap-2 justify-start">
        {product.title}
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell className="text-right">{product.quantity}</TableCell>
      <TableCell className="flex items-center gap-2 justify-end">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => onEdit(product)}
        >
          <Edit />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => onDelete(product._id!)}
        >
          <Trash />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
