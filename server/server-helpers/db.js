const { reject } = require('bcrypt/promises');
const mysql = require('mysql2');
const {hashPassword, comparePasswords} = require("./hide");
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');


const db = mysql.createConnection({
    host: "simpleuser.cq2ghf8d7pu4.us-west-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Abcde123",
    database: "User_prod"
});



function getUsers(){
    
    return new Promise((resolve, reject)=>{
        console.log("fetching users from db...")
        db.connect((err) => {

            if(err) {
                console.log("err trying to connect to db when fetching users");
            }
    
            try{
                const q = `SELECT username FROM Users;`;
                db.query(q, (err, result, fields)=>{
                    
                    if(err){
                        console.log(`error making query: ${q} to db`);
                        reject(500);
                    }
    
                    else{
                        console.log(result);
                        resolve(result);
                    }
                }); // end of db.query
    
            }catch(err){
                console.log("error occured trying to make users query");
                reject(500);
            }
    
        }); // end of db.connect
    }); // end of promise
}

function createUser(props){
    console.log(props);

    return new Promise((resolve, reject) => {

        // establish database connection
        db.connect((err) => {
            if(err){
                console.log("Error trying to connect");
                reject(500);

            }

            // hash password and retrieve salt
            try{
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(props.password, salt);
                 
                // insert user into db
                const values = `('${props.username}', '${props.email}', '${hash}', '${salt}')`;
                const q = `INSERT INTO Users (username, email, password, salt) VALUES ${values};`;
                db.query(q, (err, result, fields) => {
                    if(err){
                        console.log("err creating new user: ", err);
                        reject(500);
                    }

                    if(result){
                        console.log("success creating new user!!!", result);
                        resolve(200);
                    }
                });

                console.log(`password / salt = ${hash} / ${salt}`);



            }catch(err){
                console.log(err);

                reject(500);
            }

        });
    });
}

function loginUser(props){
    console.log("login user props = ", props);

    return new Promise((resolve, reject) => {

        db.connect((err) => {

            // if error connecting to db, return 500 status code
            if(err){
                console.log(err);
                reject(500);
            }
            
            const q = `SELECT * FROM Users WHERE username='${props.username}';`;
            db.query(q, async (error, result, fields) => {
                    

                    // could not find user or wrong password
                    if(error){
                        console.log("error trying to validate user");
                        reject(500);
                    }


                    if(result){
                        console.log(result);

                        // compare passwords
                        try{
                            const match = await comparePasswords(props.password, result[0].password);
                           
                            if(match){
                                console.log("matched");
                                resolve(200);
                            }
                            
                        }catch(err){
                            console.log("Passwords did not match");
                            reject(500);
                        }

                        
                    }

            })


        })

    })
}

function findUser(){

}


module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    findUser: findUser,
    getUsers: getUsers
}
