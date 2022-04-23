import React, { useState, useEffect } from "react";
import axios from 'axios';

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
            
                <label>username: <input type="text" onChange={e => setUsername(e.target.value)} /> </label>
                <label>password: <input type="password" onChange={e => setPassword(e.target.value)} /> </label>
                <button onClick={handleClick}> Submit </button>
           
        </div>

    </div>)
}

export default Login;