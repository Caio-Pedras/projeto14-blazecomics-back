import db from "../db.js";
import { ObjectId } from "mongodb";
export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find({}).toArray();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.productId;
    console.log(productId);
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
}
