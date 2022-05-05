import React, { useState, useEffect } from "react";
// import axios from 'axios';

function Users(props){
    const [list, setList] = useState([]);
    const [users, setUsers] = useState();


    useEffect(() => {
        
        
        /*
        axios.get("http://localhost:4000/users", {})
        .then((response) => {
            console.log(response.data);
            setList(response.data);
        }).catch((error) => {
            console.log(error);
        })

        */


       setList([{'username':'1'},{'username':'2'},{'username':'3'},{'username':'1'},{'username':'2'},{'username':'3'},
       {'username':'1'},{'username':'2'},{'username':'3'},{'username':'1'},{'username':'2'},{'username':'3'}]);
        console.log("rendering")
    }, []);




    useEffect(()=>{
        const Users = list.map((x, idx)=>{
            console.log(x.username, idx);
            return(<li key={idx}> {x.username}, ID: {idx} </li>)
        });
        
        setUsers(Users);
        console.log(Users);
    }, [list]);
   

    return(<div className="allUsers">

        <section className="users">
            <button onClick={(e)=>props.setUsers(false)}> Exit </button>
            <ul> {users} </ul>
            <button> <span> </span> Refresh </button>
        </section>
        
    </div>)
}

export default Users;