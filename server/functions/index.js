const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();
const port = 4000;

const login = require("./server-helpers/login");
const signup = require("./server-helpers/signup");
const db = require("./server-helpers/db");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://frabjous-gumption-22b130.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use("/signup", signup);
app.use("/login", login);


app.get("/", (req, res)=>{
    res.send("Hello from server");
});

app.get('/users', async (req, res)=>{

    const result = await db.getUsers();

    if(result === 500) 
        res.status(500).send("getting users list failed");

    res.send(result);
});

app.listen(port, ()=>{
    console.log("listening on port ", port, "...");
});

exports.app = functions.https.onRequest(app);
