import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();

router.post("/login",(req,res)=>{

     const {mobile,password} = req.body;

     db.query("SELECT * FROM user WHERE user.mobile = '"+mobile+"' AND user.password = '"+password+"' ", (err, result: RowDataPacket[] )=>{

        if(!err){

            if(result.length == 1){
                res.status(200).send( { user : result[0] } )
            }else{
                res.status(401).send( { msg : "Invalid Credentials"} )
            }

        }else{
            console.error(err.message);
            res.status(500).send(err.message);
        }

     } );

});


export default router;