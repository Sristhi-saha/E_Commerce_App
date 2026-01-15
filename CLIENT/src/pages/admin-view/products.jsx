import React, { useState } from 'react'
import {Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import CommonForm from '@/components/common/form';
import { addProductsFromElements } from '@/config';
import ProductImageUpload from './image-upload';

const initialFormData = {
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:"",
  salePrice:'',
  totalStock:''
}

const AdminProducts = () => {
  const [openCreateProductDialog,setOpenCreateProductDialog] = useState(false);
  const [fromData,setFromData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl] = useState('')

  function onSubmit(){

  }

  return (
    <div>
      <>
        <div className="">
          <button onClick={()=>setOpenCreateProductDialog(true)} className='bg-black text-white p-2 rounded font-bold cursor-pointer'>Add New Product</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)}}>
            <SheetContent side='right' className='overflow-auto'>
              <SheetHeader>
                <SheetTitle>
                  Add New Product
                </SheetTitle>
                <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
              </SheetHeader>
              <div className='p-6'>
                <CommonForm onSubmit={onSubmit} buttonText='Add' formData={initialFormData} setFormData={setFromData}  formControls={addProductsFromElements}/>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    </div>
  )
}

export default AdminProducts