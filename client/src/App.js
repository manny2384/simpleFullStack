import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";


function App() {

  const [state, setState] = useState("login");
  const [nav, setNav] = useState(true);
  

  return (
    <div className="App">
      <section className='navBar' >
      

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
