import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductsFromElements } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import ProductImageUpload from "./image-upload";
import {
  addNewProduct,
  fetchAllProduct,
} from "@/store/admin/product-slice";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const [openCreateProductDialog, setOpenCreateProductDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedID, setCurrentEditedID] = useState(null);
    const [edit,setEdit] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState({
    imageUrl: "",
  });
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl.imageUrl,
        id: currentEditedID, // backend decides add vs update
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        toast.success(
          currentEditedID
            ? "Product updated successfully"
            : "Product added successfully"
        );
        handleCloseSheet();
      }
    });
  }

  function handleCloseSheet() {
    setOpenCreateProductDialog(false);
    setCurrentEditedID(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl({ imageUrl: "" });
  }

  return (
    <div className="p-4">
      {/* Add Product Button */}
      <button
        onClick={() => {
          setEdit={setEdit}
          setCurrentEditedID(null);
          setFormData(initialFormData);
          setUploadedImageUrl({ imageUrl: "" });
          setOpenCreateProductDialog(true);
        }}
        className="bg-black text-white p-2 rounded font-bold"
      >
        Add New Product
      </button>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {productList?.length > 0 &&
          productList.map((product) => (
            <AdminProductTile
              key={product.id}
              product={product}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setCurrentEditedID={setCurrentEditedID}
              setFormData={setFormData}
              setEdit={setEdit}
              setUploadedImageUrl={setUploadedImageUrl}
            />
          ))}
      </div>

      {/* Sheet */}
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={(open) => {
          if (!open) handleCloseSheet();
          else setOpenCreateProductDialog(true);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedID ? "Edit Product" : "Add New Product"}
            </SheetTitle>

            <ProductImageUpload
              imageLoading={imageLoading}
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setEdit={setEdit}
            />
          </SheetHeader>

          <div className="p-6">
            <CommonForm
              onSubmit={onSubmit}
              buttonText={currentEditedID ? "Update" : "Add"}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductsFromElements}
              disabled={!uploadedImageUrl.imageUrl}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
