
var  Order = require('../models/OrderModel')


const addOrderItems = async (req, res) => {
  console.log(req.body)
  const {
    orderItems,
    permAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    Price,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      permAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      Price,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
}


const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}




const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
}


const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
}

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
}
