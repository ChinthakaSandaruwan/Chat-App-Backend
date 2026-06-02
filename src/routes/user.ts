import { Router } from "express";
import db from "../db";

const router = Router();

router.post("/login",(req,res)=>{

    db.query("SELECT * FROM user", (error, result)=>{
        
        if(!error){
            res.status(200).send(result)
        }else{
            res.status(500).send(error.message)
        }
    });
});

export default router;