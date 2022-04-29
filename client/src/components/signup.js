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

        // check if email is appropriate
        

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