import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";
const router = Router();

router.post("/login", (req, res) => {
    const { mobile, password } = req.body;
    db.query("SELECT * FROM user WHERE user.mobile = '" + mobile + "' AND user.password = '" + password + "' ", (err, result: RowDataPacket[]) => {
        if (!err) {
            if (result.length == 1) {
                res.status(200).send({ user: result[0] })
            } else {
                res.status(401).send({ msg: "Invalid Credentials" })
            }
        } else {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    });
});

router.post("/signup", (req, res) => {
    const { fname, lname, mobile, password } = req.body;

    db.query("SELECT * FROM user WHERE user.mobile = '" + mobile + "'", (error, result: RowDataPacket[]) => {
        if (!error) {
            if (result.length === 0) {

                console.log("No User Found")
                db.query("INSERT INTO user (mobile,fname,lname,password) VALUES ('" + mobile + "','" + fname + "','" + lname + "','" + password + "')", (insertError) => {

                    if (!insertError) {
                        console.log("User Registered Success");
                        res.status(201).send({ msg: "User Registered Success" });
                    } else {
                        console.log("Error Occured While Registering");
                        res.status(500).send({ msg: "Error Occured While Registering" });
                    }
                })
            } else {
                res.status(401).send({ msg: "User Already Exists" })
            }
        } else {
            res.status(500).send({ msg: "Somethig went Wrong" })
        }
    });

    console.log(fname);
    console.log(lname);
    console.log(mobile);
    console.log(password);
});
export default router;