import db from "../db.js";

export async function getPurchases(req, res) {
    try {
      const products = await db.collection("buyers").find({}).toArray();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  