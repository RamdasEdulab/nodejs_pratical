const express = require('express')
const router = express.Router()
var {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
 
} = require('../controllers/ProductController')
var { protect, admin } = require('../middleware/AuthMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

module.exports= router;
