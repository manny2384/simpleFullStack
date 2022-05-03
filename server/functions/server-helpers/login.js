const express = require('express');
const utils = require("./db");
const login = express.Router();


login.use(express.json());
login.use(express.urlencoded({extended:true}));

login.post("/", async(req, res)=>{

    try{
        const result = await utils.loginUser(req.body);
        if(result == 200){
            // generate jwt
            console.log("Your JWT is: ");
        }

    }catch(err){
        console.log("error trying to hash or login in user: \n\t", err);
        
        res.status(500).send();
    }
    
    res.status(200).send();

});

login.get("/", (req, res)=>{
    res.send("login get path");


});

module.exports = login;