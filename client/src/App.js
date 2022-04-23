import React, {useState} from 'react';

import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";


function App() {

  const [state, setState] = useState("home");
  const [nav, setNav] = useState(true);
  
  const handleNavBar = () => {
    console.log("re-set nav ");
    
    if(nav){
      setNav(!nav);
      document.getElementsByClassName('item2')[0].style.display = "none";
      document.getElementsByClassName('navBarContent')[0].style.display = "flex";
    }
    
    else{
      setNav(!nav);
      document.getElementsByClassName('item2')[0].style.display = "initial";
      document.getElementsByClassName('navBarContent')[0].style.display = "none";
    }



  }

  return (
    <div className="App">
      <section className='navBar' >
        
        <div className='navBar-icon' onClick={handleNavBar}> 
          <span className='item1'></span>
          <span className='item2'></span>
          <span className='item3'></span>

        </div>

        <div className="navBarContent">
          <button onClick={()=> setState("home")}> Home </button>
          <button onClick={()=> setState("login")}> Login </button>
          <button onClick={()=> setState("signup")}> Signup </button>
        </div>      
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
