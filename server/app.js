const express = require("express");
const app = express();
const connection = require('./database/connection')

async function getDB() {
    return await connection.connect('pointr_db')
}

async function addData() {
    const database = await getDB();
    await connection.addUser(database, {
        name: 'Jack',
        age: 19,
        weight: 170
    });
}

app.post("/post", (req, res) => {
    console.log("Connected to React");

    res.redirect("/");
});

app.get('/user', async function (req, res) {
    if (!req.query.username) {
        return res.send("You must add a query for a specific user");
    }
    const database = await getDB()
    const user = await connection.getUser(database, req.query.username)
    res.send(user)
    console.log(user)
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is up on port 3000')
});
