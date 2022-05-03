import React, { useState } from "react";
import axios from 'axios';

const email = document.querySelector("#signup-form-email");
const password = document.querySelector("#signup-form-password");
const username = document.querySelector("#signup-form-username");

function Signup(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () =>{
        console.log("making api call...");
        
        // check if strings are only spaces
        if(username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0){
            console.log("Some fields are empty, please try again");
            alert("Fill appropriate fields");
            return;
        }

        // check if email is appropriate
        

        axios.post("http://localhost:4000/signup?", {
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