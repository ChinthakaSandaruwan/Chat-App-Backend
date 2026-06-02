import mysql from "mysql2";

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "SUMBN2003cs#10020",
    database: "chat_app"

});


db.connect((error) => {
    if (!error) {
        console.log("Database Connected Successfully");
    } else {
        console.error("Connection Failed");
    }
});

export default db;