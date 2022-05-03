import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";

// calling an api on aws format = https://{restapi-id}.execute-api.{region}.amazonaws.com/{stageName}
// AKIAXCWFMWIKMLICATOI = access key id
// v9xegjFY5guLTFff1mQdQbjechk66aNVsrHa+9zf = secret key

function App() {

  const [state, setState] = useState("login");
  

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
      </section>

    

    </div>
  );
}

export default App;
