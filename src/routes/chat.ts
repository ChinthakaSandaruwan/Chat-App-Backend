import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();

router.get("/chats", (req, res) => {

    const mobile = req.body.mobile;

    db.query("SELECT * FROM chat WHERE chat.user_1 = '" + mobile + "' OR chat.user_2 = '" + mobile + "' ", (error, result: RowDataPacket[]) => {

        let finalChats = [];

        if (!error) {
            for (let i = 0; i < result.length; i++) {
                const chat = result[i]
                db.query("SELECT * FROM chat_history WHERE chat_chat_id = '" + chat.chat_id + "'ORDER BY sent_at DESC LIMIT 1", (error, massageReullt: RowDataPacket[]) => {

                    if (!error) {

                        const lastMassage = massageReullt[0];


                    } else {
                        res.status(500).send("Search Error");
                    }
                    
                });
            }
        } else {
            res.status(500).send("Search Error");
        }

    })

    res.send("hello" + mobile)

})

export default router;