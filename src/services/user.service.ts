import { promises } from "node:dns";
import { productModel, ProductDocument } from "../models/product.model";

export interface Product {
  name: string;
  price: number;
}
///byt till user
export const createProductService = async (name: string, price: number) => {
  const existingProduct = await productModel.findOne({ name });
  if (existingProduct) {
    throw new Error("product with same name exist");
  }
  const newProduct: ProductDocument = {
    name,
    price,
  };

  const createdProduct = await productModel.create(newProduct);
  return createdProduct;
};

export const findAllProducts = async () => {
  const products = await productModel.find();

  if (products.length === 0) {
    return {
      message: "no products found",
    };
  }
  return products;
};

export const deleteProductService = async (id: string) => {
  const productToDelete = await productModel.findById(id);

  if (!productToDelete) {
    return { message: "product not found" };
  }

  await productModel.findByIdAndDelete(productToDelete._id);
  return productToDelete;
};
