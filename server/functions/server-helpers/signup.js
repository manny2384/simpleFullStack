const express = require('express');
const utils = require("./db");

const signup = express.Router();

signup.use(express.json());
signup.use(express.urlencoded({extended: true}));

signup.post("/", async (req, res)=>{

    try{
        const result = await utils.createUser(req.body);
        console.log(result);
        res.status(result).send();
    }catch(err){
        console.log(err);
        res.status(500).send();
    }

});



module.exports = signup;