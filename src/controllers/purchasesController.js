import db from "../db.js";

export async function getPurchases(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try {
      const user = await db.collection('sessions').findOne({ token })
      const products = await db.collection("buyers").find({ userId: user.userId }).toArray();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  