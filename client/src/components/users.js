import React, { useState, useEffect } from "react";
import axios from 'axios';

function Users(props){
    const [list, setList] = useState([{'username':'1'},{'username':'2'},{'username':'3'},{'username':'1'},{'username':'2'},{'username':'3'}]);
    const [users, setUsers] = useState();

    useEffect(() => {
        axios.get("http://localhost:4000/users", {})
        .then((response) => {
            console.log(response.data);
            setList(response.data);
        }).catch((error) => {
            console.log(error);
        })

    }, []);

    var Users;
    useEffect(()=>{
        Users = list.map((x)=>{
            console.log(x.username);
            return(<li> {x.username} </li>)
        });
        
        setUsers(Users);
        console.log(Users);
    }, [list]);
   

    return(<div className="allUsers">

        <section className="users">
            <button onClick={(e)=>props.setUsers(false)}> Exit </button>
            <ul style={{"height":"300px", "width":"300px"}}> {users} </ul>
            <button> <span> </span> Refresh </button>
        </section>
        
    </div>)
}

export default Users;