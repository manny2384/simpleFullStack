import React, { useState } from "react";
import axios from 'axios';


function Signup(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const checkUsername = () => {
        if(username.trim().length === 0){
            document.getElementById("signup-form-username").style.animation = "bad_input 7s";
            console.log("prompt username");
            return true;
        }

        return false;
    }
    const checkPassword = () => {
        if(password.trim().length === 0){
            document.getElementById("signup-form-password").style.animation = "bad_input 7s";
            console.log("prompt password");
            return true;
        }

        return false;
    }
    const checkEmail = () => {
        if(email.trim().length === 0){
            document.getElementById("signup-form-email").style.animation = "bad_input 7s";
            console.log("prompt password");
            return true;
        }

        return false;
    }

    const handleClick = () =>{
        console.log("making api call...");
        
        // check if strings are only spaces
        if((checkEmail() && checkPassword() && checkUsername()) || checkEmail() || checkPassword() || checkUsername()){
            console.log("Some fields are empty, please try again");
            alert("Fill appropriate fields");
            return;
        }

        // check if email is appropriate
        

        axios.post("https://us-central1-simplefullstackapi.cloudfunctions.net/app/signup", {
            username: username,
            email: email,
            password: password
        
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            username.style.border = "1px solid";
            username.style.borderColor = "red";
            email.style.border = "1px solid red";
            password.style.border = "1px solid red";
        })
    }

    return(<div className="signup">

        <div className="signup-form">

            <div className="input-values">
                <input id="signup-form-username" type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
                <input id="signup-form-email" type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
                <input id="signup-form-password" type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
            </div>
            
            <button value="Submit" onClick={handleClick} > Sign Up </button>
          
        </div>

    </div>)
}

export default Signup;