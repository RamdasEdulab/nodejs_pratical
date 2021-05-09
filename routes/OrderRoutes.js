const  express = require('express');
const router = express.Router()
var {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,} =  require('../controllers/OrderController');
var { protect, admin } = require('../middleware/AuthMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)


module.exports= router;
