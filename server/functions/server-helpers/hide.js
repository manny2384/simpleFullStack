const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(plainPassword) {
    console.log("password before hash: ", plainPassword);
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(plainPassword, salt, (err, hash)=>{

            if(err) {
                console.log("Error hashing password");
            };
            console.log(`hash / salt = ${hash} / ${salt}`);
            return [hash, salt];

        });
    });
 
}

function comparePasswords(attempt, actual){
    console.log(`Will compare following 2: \n ${attempt} \n and \n ${actual}\n`);
    return new Promise((resolve, reject) => {

        bcrypt.compare(attempt, actual, (err, res) => {
            if(err) {
                console.log("Passwords did not match: ", err);
                reject(false);
            }
            if(res) {
                console.log("Passwords matched!");
                resolve(true);
            }
            else{
                console.log("Don't know what happened");
                reject(false);
            }
        });
    });
}

module.exports = {
    hashPassword: hashPassword,
    comparePasswords: comparePasswords
};