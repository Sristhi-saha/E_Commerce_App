import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { deleteProduct, fetchAllProduct } from "@/store/admin/product-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function AdminProductTile({
  product,
  setOpenCreateProductDialog,
  setCurrentEditedID,
  setFormData,
  setUploadedImageUrl,
  setEdit
}) {
  const dispatch = useDispatch();


  const deleteMethod = (product) => {
    console.log("clicked",product);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    dispatch(deleteProduct(product._id)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product deleted successfully");
        dispatch(fetchAllProduct())
      } else {
        toast.error("Failed to delete product");
      }
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative m-2">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[150px] object-cover rounded-t-lg"
        />
      </div>

      <CardContent>
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>

        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 items-center">
            {product?.salePrice > 0 && (
              <span className="line-through text-gray-500">
                ₹{product?.price}
              </span>
            )}
            <span className="text-lg font-semibold">
              ₹
              {product?.salePrice > 0
                ? product?.salePrice
                : product?.price}
            </span>
          </div>

          <span className="text-sm capitalize text-muted-foreground">
            {product?.category}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <button
          className="bg-black text-white px-4 py-2 rounded font-bold"
          onClick={() => {
            setEdit(true)
            setCurrentEditedID(product.id);
            setFormData(product);
            setUploadedImageUrl({ imageUrl: product.image });
            setOpenCreateProductDialog(true);
          }}
        >
          Edit
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded font-bold"
          onClick={() => deleteMethod(product)}
        >
          Delete
        </button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
