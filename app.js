const express = require("express");
let app = express();
const db = require("pg");
let conn = new db.Pool({user: "dyqrgabx",
                        host: "suleiman.db.elephantsql.com",
                        database: "dyqrgabx",
                        password: "UsWMjGJDW6yKWQhKWKUFul5MW8bT7Fzv",
                        port: 5432});

conn.query("CREATE TABLE IF NOT EXISTS inventory(item_id INTEGER UNIQUE, name TEXT, row INTEGER, shelf INTEGER, quantity INTEGER);");
// todo add email notifs

app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/api", async(req, res) => {
    let rows = await conn.query("SELECT * FROM inventory;");
    res.json(rows.rows);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Port: ", process.env.PORT || 3000);
});