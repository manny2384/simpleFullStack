const { reject } = require('bcrypt/promises');
const mysql = require('mysql2');
const {hashPassword, comparePasswords} = require("./hide");
const dotenv = require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: "admin",
    password: process.env.PASSWORD,
    database: "User_prod"
});


function initConnection(){
    
    return new Promise((resolve, reject) => {
        db.connect((err)=>{
            if(err){
                console.log("ERROR ATTEMPT: ", err);
                reject("bad connection");
            }
        
            db.query(`SELECT * FROM Users`, (err, res, fields)=>{
                if(err) throw err;
                console.log(res);
            });

            resolve("finished");
        });
    })

}

function createUser(props){
    return new Promise((res, rej) => {

        // establish database connection
        db.connect((err) => {
            if(err){
                console.log("Error trying to connect");
                reject("bad connection attempt");

            }

            // check if user exists
            db.query(`SELECT ${props.useremail} FROM Users`, (error, result, fields) => {
                if(result){
                    reject(-1);
                }
            })
            // if user dne, then create user


            db.query(`INSERT INTO Users VALUES (${props.useremail}, ${hashPassword(props.userpassword)})`, (error, result, fields) => {
                if(error){
                    console.log("Error creating user");
                    reject("Failed to create new user");
                }
            })


            resolve("Created new user");

        })
    })
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
    initConnection: initConnection,
    createUser: createUser,
    loginUser: loginUser,
    findUser: findUser
}
