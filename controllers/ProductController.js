var Product = require('../models/ProductModel');


const getProducts = async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
}


const getProductById = async (req, res) => {
  
 
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}


const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product delete' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}




const createProduct = async (req, res) => {
    
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: 'image',
    brand: ' brand',
    category: ' category',
    countInStock: 0,
    numReviews: 0,
    description: 'description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}


const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}


module.exports= {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  
}
