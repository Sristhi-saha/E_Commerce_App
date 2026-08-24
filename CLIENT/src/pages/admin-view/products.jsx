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
  editAllProduct,
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

  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedID, setCurrentEditedID] = useState(null);
  const [edit, setEdit] = useState(false);
  
  // 1. Keep uploadedImageUrl consistently as a string or object
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  // Helper to safely extract the string URL whether it's a string, object, or from formData
  const getFinalImageUrl = () => {
    if (typeof uploadedImageUrl === "string" && uploadedImageUrl.trim() !== "") {
      return uploadedImageUrl;
    }
    if (uploadedImageUrl?.imageUrl) {
      return uploadedImageUrl.imageUrl;
    }
    return formData?.image || "";
  };

  function onSubmit(e) {
    e.preventDefault();

    const imageUrl = getFinalImageUrl();

    if (currentEditedID !== null) {
      dispatch(
        editAllProduct({
           id: currentEditedID,
           formData:{
          ...formData,
          image: imageUrl,
           }
         
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          toast.success("Product updated successfully");
          handleCloseSheet();
        } else {
          toast.error("Failed to update product");
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: imageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          toast.success("Product added successfully");
          handleCloseSheet();
        } else {
          toast.error("Failed to add product");
        }
      });
    }
  }

  function handleCloseSheet() {
    setOpenCreateProductDialog(false);
    setCurrentEditedID(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setEdit(false);
  }

  return (
    <div className="p-4">
      {/* Add Product Button */}
      <button
        onClick={() => {
          setEdit(false); // ✅ Set to false when adding new
          setCurrentEditedID(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
          setOpenCreateProductDialog(true);
        }}
        className="bg-black text-white p-2 rounded font-bold"
      >
        Add New Products
      </button>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {productList?.length > 0 &&
          productList.map((product) => (
            <AdminProductTile
              key={product._id || product.id} // ✅ MongoDB uses _id
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
              setImageLoading={setImageLoading}
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              isEditMode={currentEditedID !== null}
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
              isBtnDisabled={!getFinalImageUrl()} // ✅ Checks resolved URL
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;