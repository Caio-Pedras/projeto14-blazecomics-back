import db from "../db.js";
import { ObjectId } from "mongodb";

export async function getItems(req, res) {
    let search;
    const totalItems = []
    const items = req.body
    try {
        for (let i = 0; items.length > i; i++) {
            search = await db.collection("products").findOne({ _id: new ObjectId (items[i].productId) })
            if (search === null) {
                continue
            } else {
                totalItems.filter(() => { items[i].productId })
                totalItems.push({ ...search, "number": items[i].number })
            }
        }
        return res.send(totalItems).status(200);

    } catch (error) {
        
        return res.sendStatus(422);
    }
}

export async function buyItems(req, res) {
    const { userId } = res.locals.existingUser;
    try {
        for (let i = 0; req.body.length > i; i++) {
            let many = parseInt(req.body[i].number)*(-1)
            await db.collection("products").updateOne({
                "_id":  new ObjectId(req.body[i]._id)
            }, {$inc: {"number": many}})
        }
        res.sendStatus(200)
    } catch (err){
        console.log(err)
        res.sendStatus(422)
    }


}