import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

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
    const items = req.body
    try {
        for (let i = 0; req.body.length > i; i++) {
            let many = parseInt(req.body[i].number)*(-1)
            await db.collection("products").updateOne({
                "_id": req.body[i]._id
            }, {$inc: {"number": many}})
        }
        await db.collection("buyers").insertOne({userId: userId, items, date: dayjs().format('DD/MM/YY') })
        res.sendStatus(200)
    } catch (err){
        console.log(err)
        res.sendStatus(422)
    }
}