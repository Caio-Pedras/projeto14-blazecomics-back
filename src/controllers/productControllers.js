import db from "../db.js";

export async function getProducts(req, res) {
  try {
    const productId = req.params.productId;
    if (!productId) {
      const products = await db.collection("products").find({}).toArray();
      res.status(200).send(products);
    } else {
      const product = await db.collection("prodcuts").find({ _id: productId });
      res.status(200).send(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
