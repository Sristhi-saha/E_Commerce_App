import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';


// Configuration
cloudinary.config({ 
    cloud_name: 'ddnbttzt7', 
    api_key: '366661911293784', 
    api_secret: 'KKuRkm-bmCFOjOuZvAjkjpjI8Ig'
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })

    return result;
}

const upload = multer({ storage });

export default {
    imageUploadUtil,
    upload
};
