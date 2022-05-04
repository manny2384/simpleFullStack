import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import Users from "./components/users";


function App() {

  const [state, setState] = useState("login");
  const [users, setUsers] = useState(false);

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
