import React, { useState } from "react";
import axios from 'axios';

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const checkUsername = () => {
        if(username.trim().length === 0){
            document.getElementById("login-form-user").style.animation = "bad_input 5s";
            console.log("prompt username");
            return true;
        }

        return false;
    }
    const checkPassword = () => {
        if(password.trim().length === 0){
            document.getElementById("login-form-pass").style.animation = "bad_input 5s";
            console.log("prompt password");
            return true;
        }

        return false;
    }

    const handleClick = () => (e) => {
        e.preventDefault();
        console.log(`username / password = ${username} / ${password}`)
        if(checkPassword() && checkUsername() || checkPassword() || checkUsername()){
            console.log("username or password emtpy");
            return;
        }

        axios.post("http://localhost:4000/login?", {
            
            username: username,
            password: password
        
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    }

    return(<div className="login">
        
        <div className="login-form">
            <div className="input-values login-values">
                <input id="login-form-user" type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                <input id="login-form-pass" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>

            <button onClick={handleClick()}> Log In </button>
           
        </div>

    </div>)
}

export default Login;