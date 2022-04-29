const { reject } = require('bcrypt/promises');
const mysql = require('mysql2');
const {hashPassword, comparePasswords} = require("./hide");
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');


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

            /* 

            // insert user into db
            const values = `('${props.username}', '${props.email}', '${props.password}')`;
            // const q = `INSERT INTO Users (username, email, password) VALUES ${values};`;
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

            */

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
    initConnection: initConnection,
    createUser: createUser,
    loginUser: loginUser,
    findUser: findUser
}
