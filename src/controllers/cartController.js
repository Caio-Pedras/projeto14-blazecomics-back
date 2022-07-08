import db from "../db.js";

export default async function getItems(req, res) {
    let search;
    const totalItems = []
    const items = req.body
    try {
        for(let i = 0; items.body.length > i; i++){
            search = await db.collection("products").findOne( { _id: items.body[i].productId })
            if (search === null) {
                continue
            }else { 
                totalItems.push(search)
            }
        }
        return res.send(totalItems).status(200);

    } catch(error) {
        return res.sendStatus(422);
    }
}