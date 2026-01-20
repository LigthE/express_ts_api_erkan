import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, productService.Product>,
  res: Response
) => {
  try {
    const { name, price } = req.body;
    const newProduct = await productService.createProductService(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "failed to create product",
      error,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "failed to retrieve products",
      error,
    });
  }
};

export const getProductById = (req: Request, res: Response) => {
  const ProductById = req.params.id;

  res.json({ id: ProductById });
};
