import mongoose, { mongo } from "mongoose";

// Create the schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true, // createdAt, updatedAt
  }
);

// Create the model
const Product = mongoose.model("Product", productSchema);

export default Product;
