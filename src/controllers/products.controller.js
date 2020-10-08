import Product from '../models/Product'

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body

    const newProduct = new Product({ name, category, price, imgURL })
    const productSave = await newProduct.save()
    return res.status(201).json(productSave)
} 

export const getProducts = async (req, res) => {
    const products = await Product.find()
    return res.json(products)
} 

export const getProductById = async (req, res) => {
    const products = await Product.findById(req.params.productId)
    return res.json(products)
} 

export const updateProductById = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
    return res.json(updateProduct)
} 

export const deleteProductId = async (req, res) => {
    await Product.findByIdAndRemove(req.params.productId)
    res.status(204).json()
} 