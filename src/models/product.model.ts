import mongoose from "mongoose";

export type ProductDocument = {
  name: string;
  price: number;
};
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: "Price tag is Required" },
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
