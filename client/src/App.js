import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";


function App() {

  const [state, setState] = useState("home");


  return (
    <div className="App">
      <section className='navBar' >
        <button onClick={()=> setState("home")}> Home </button>
        <button onClick={()=> setState("login")}> Login </button>
        <button onClick={()=> setState("signup")}> Signup </button>
      </section>

      
      <section className="content">
        {state==="home" && <Home />}
        {state==="login" && <Login />}
        {state==="signup" && <Signup />}
      </section>

    </div>
  );
}

export default App;
