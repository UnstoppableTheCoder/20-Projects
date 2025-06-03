import Product from "../models/product.model.js";
import mongoose from "mongoose";

// getProducts controller
export const getProducts = async (req, res) => {
  try {
    // Find products
    const products = await Product.find({});

    // response
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// createProduct controller
export const createProduct = async (req, res) => {
  // Get product from req.body
  const product = req.body;

  // Validate
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Create a new product
  const newProduct = new Product(product);

  try {
    // save the new product
    await newProduct.save();

    // response
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in creating Product: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// updateProduct controller
export const updateProduct = async (req, res) => {
  // get product id and product
  const { id } = req.params;
  const product = req.body;

  // Validate
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product Id",
    });
  }

  try {
    // Update product with its id
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    // response
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// deleteProduct controller
export const deleteProduct = async (req, res) => {
  // get product id
  const { id } = req.params;

  // validate
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product Id",
    });
  }

  try {
    // Delete product
    await Product.findByIdAndDelete(id);

    // response
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
