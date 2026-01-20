import {imageUploadUtil} from '../../helpers/cloudinary.js';

//handleImageUpload fuction
export const handleImageUpload = async (req, res) => {
    try {
<<<<<<< HEAD
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success:true,
            result
        })
=======
        console.log("👉 Upload controller hit");

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file received",
            });
        }


        const base64image = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + base64image;
        const result = await imageUploadUtil(url)
>>>>>>> bc128a93ffc03c70f4a3639343d811f105fcd005

        console.log("✅ Cloudinary upload done");

        return res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Image upload failed',
        })
    }
}

//Add a new product
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        // Basic validation
        if (!title || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });

        await newlyCreatedProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newlyCreatedProduct,
        });

    } catch (error) {
        console.error("Add Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


//Fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: listOfProducts,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Fetching product failed'
        })
    }
}


//Edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;
        
        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });

            findProduct.title = title || findProduct.title;
            findProduct.description = description || findProduct.description;
            findProduct.category = category || findProduct.category;
            findProduct.brand = brand || findProduct.brand;
            findProduct.price = price === '' ? 0 : price || findProduct.price;
            findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
            findProduct.totalStock = totalStock || findProduct.totalStock;
            findProduct.image = image || findProduct.image;

            await findProduct.save();
            res.status(200).json({
                success: true,
                message: 'Product edited successfully',
                data: findProduct,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Editing product failed'
        })
    }
}


//Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Deleting product failed'
        })
    }
}



export default {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
}