import express from 'express';
import productController from '../../controllers/admin/products-controllers.js';
import upload from '../../helpers/cloudinary.js'

const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct
} = productController;

const router = express.Router();

router.post('/upload-image', upload.single("my_file"), handleImageUpload)
router.post('/add', addProduct);
router.get('/get', fetchAllProducts);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;