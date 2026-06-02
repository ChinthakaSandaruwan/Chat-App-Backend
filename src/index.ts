import express from "express";
import user from "./routes/user";


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome To Chat App API");
});

app.use("/user", user);

app.listen(3000, () => {
    console.profileEnd("Api Started");
    console.log("Apit Url : http://localhost:3000");
})

