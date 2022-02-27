import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkUser from "../utils/requests/LoginFuncs";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);


    const submitLogin = async (e) => {
        e.preventDefault()
        const userData =  await checkUser(username, password, gmail);

        if(userData.username) navigate('/user-home/' + userData.username);
        else setAlertVisible(true);
    }

    useEffect(() => {
        if(sessionStorage.getItem('username')) navigate('/user-home/' + sessionStorage.getItem('username'));
    }, [])

    return ( 
        <div className="container-sm mt-5">
            <div className="container-md mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={submitLogin} className="container-sm form">
                    <input type="text" placeholder="Username" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="email" placeholder="Gmail" className="form-control" onChange={(e) => setGmail(e.target.value)}/>
                    <button className="btn btn-primary" type="submit" style={{width: '100%'}}>LOGIN</button>
                    <Link to="/create-user">Create an account</Link>
                </form>
            </div>
            <div className={alertVisible?'alert alert-danger':'d-none'} role="alert">
                User does not exists
            </div>
        </div> 
        
    );
}

export default Login;