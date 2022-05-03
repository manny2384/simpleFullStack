const express = require('express');
const app = express();
const port = 4000;

const login = require("./server-helpers/login");
const signup = require("./server-helpers/signup");

app.use("/signup", signup);
app.use("/login", login);


app.get('/', (req, res)=>{

    res.send("Hello from server");

});

app.listen(port, ()=>{
    console.log("listening on port ", port, "...");
});
