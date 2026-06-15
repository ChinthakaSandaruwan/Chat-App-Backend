import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();
const pool = db.promise();

router.get("/get-chat-history", async (req, res) => {

    const chatId = req.query.id;

    try {
        if (!chatId) {
            return res.status(400).send({ msg: "Please Provide Chat Id" });
        }

        const [chatData] = await pool.query("SELECT * FROM chat_history WHERE chat_chat_id = ? ", [chatId]);
        return res.status(200).send(chatData);

    } catch (error) {
        return res.status(500).send({ msg: "Failed to Fetch chat History" });
    }


});

export default router;