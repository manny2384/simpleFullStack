import React, { useState } from "react";
import axios from 'axios';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {

        console.log(`username / password = ${username} / ${password}`)
        if(username.trim().length === 0 || password.trim().length === 0){
            console.log("username or password emtpy");
            alert("username or password empty, please fill");
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
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>

            <button onClick={handleClick}> Log In </button>
           
        </div>

    </div>)
}

export default Login;