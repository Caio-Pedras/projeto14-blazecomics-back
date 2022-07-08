import db from "../db.js";

export async function getItems(req, res) {
    let search;
    const totalItems = []
    const items = req.body
    try {
        for (let i = 0; items.body.length > i; i++) {
            search = await db.collection("products").findOne({ _id: items.body[i].productId })
            if (search === null) {
                continue
            } else {
                totalItems.filter(() => { items.body[i].productId })
                totalItems.push({ ...search, "number": items.body[i].number })
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
        for (let i = 0; items.length > i; i++) {
            let many = parseInt(items[i].number)
            await db.collection("products").updateOne({
                "_id": items[i]._id
            }, {$inc: {"number": -many}})
        }
        res.sendStatus(200)
    } catch (err){
        console.log(err)
        res.sendStatus(422)
    }


}