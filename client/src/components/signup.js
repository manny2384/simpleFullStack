import React, { useState, useEffect } from "react";
import axios from 'axios';

function handleSubmit(props){
    console.log("Attempting user signup following : ", props);

    axios.post("http://localhost:4000/signup?", {
        username: props.username,
        email: props.email,
        password: props.password
    
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })




}

function Signup(){

    const [user, setUser] = useState({});
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



        axios.post("http://localhost:4000/signup?", {
            username: username,
            email: email,
            password: password
        
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    return(<div>

        <div className="signup-form">
   
            <label>username: <input id="signup-form-username" type="text" onChange={e=>setUsername(e.target.value)} /> </label>
            <label>email: <input id="signup-form-email" type="email" onChange={e=>setEmail(e.target.value)} /></label>
            <label>password: <input id="signup-form-password" type="password" onChange={e=>setPassword(e.target.value)} /> </label>
            <button value="Submit" onClick={handleClick} > Submit </button>
          
        </div>

    </div>)
}

export default Signup;