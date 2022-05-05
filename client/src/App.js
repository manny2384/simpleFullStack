import React, {useEffect, useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import Users from "./components/users";


function App() {

  const [state, setState] = useState("login");
  const [users, setUsers] = useState(false);

  useEffect(()=>{
    var hide_or_show_app_child = users ? "none" : "flex";

      document.getElementsByClassName('app-child')[0].style.display = hide_or_show_app_child;
  }, [users]);

  return (
    <div className="App">
      <section className='app-child' >
      

        <div className="navBarContent">
          <button id="log-btn-nav" onClick={()=> setState("login")}> Login </button>
          <button id="sign-btn-nav" onClick={()=> setState("signup")}> Signup </button>
        </div>
        
        <section className="content">
          {state==="login" && <Login />}
          {state==="signup" && <Signup />}
          
        </section>      
        <button id="allusers-btn" onClick={(e)=>setUsers(true)}> See All Users </button>
      </section>

      {users && <Users setUsers={setUsers} />}
      
    </div>
  );
}

export default App;
