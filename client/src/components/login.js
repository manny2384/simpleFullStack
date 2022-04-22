function handleSubmit(){
    fetch("", ()=>{

    });
}


function Login(){
    return(<div className="login">
        
        <div className="login-form">
            <form>
                <label>username: <input type="text" /> </label>
                <label>password: <input type="password" /> </label>
                <input type="submit" value="Submit" />
            </form>
        </div>

    </div>)
}

export default Login;