import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";


function App() {

  const [state, setState] = useState("login");
  

  return (
    <div className="App">
      <section className='app-child' >
      

        <div className="navBarContent">
          <button onClick={()=> setState("login")}> Login </button>
          <button onClick={()=> setState("signup")}> Signup </button>
        </div>
        
        <section className="content">
          {state==="login" && <Login />}
          {state==="signup" && <Signup />}
        </section>      
      </section>

    

    </div>
  );
}

export default App;
