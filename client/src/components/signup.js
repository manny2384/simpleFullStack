import React, { useState, useEffect } from "react";

function Signup(){

    const [user, setUser] = useState([]);

    const signUser = (e) => {
        console.log("signing user", e);
        // fetch
            // then res to json
            // then do somehting with res
    }


    return(<div>
        <div className="signup- form">
            <form onSubmit={signUser("h")}>
                <label>username: <input type="text" /> </label>
                <label>email: <input type="email" /></label>
                <label>password: <input type="password" /> </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>)
}

export default Signup;