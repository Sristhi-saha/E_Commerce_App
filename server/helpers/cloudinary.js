import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';


// Configuration
cloudinary.config({ 
    cloud_name: 'ddnbttzt7', 
    api_key: '366661911293784', 
    api_secret: 'KKuRkm-bmCFOjOuZvAjkjpjI8Ig'
});

const storage = multer.memoryStorage();

export async function imageUploadUtil(base64Image) {
    const result = await cloudinary.uploader.upload(base64Image, {
        folder: "products",
        resource_type: "image",
    })

    return result;
}

const upload = multer({ storage });

export default {
    imageUploadUtil,
    upload
};
