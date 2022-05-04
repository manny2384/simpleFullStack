import React, { useState, useEffect } from "react";
import axios from 'axios';

function Users(props){
    const [list, setList] = useState([{'username':'1'},{'username':'2'},{'username':'3'}]);

    useEffect(() => {
        axios.get("http://localhost:4000/users", {})
        .then((response) => {
            console.log(response.data);
            setList(response.data);
        }).catch((error) => {
            console.log(error);
        })

    }, []);

    const Users = list.forEach((x)=>{
        console.log(x);
        return(<li> {x['username']} </li>)
    });

    return(<div className="allUsers">

        <button onClick={(e)=>props.setUsers(false)}> Exit </button>

        <section className="users">
            <ul style={{"height":"300px", "width":"300px"}}> {Users} </ul>
            <button> Refresh </button>
        </section>
        
    </div>)
}

export default Users;