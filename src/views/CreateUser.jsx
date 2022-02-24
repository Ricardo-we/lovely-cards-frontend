import { useState, useEffect } from "react";
import { APIURL } from "../App";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);


    const submitUser = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('gmail', gmail);
        console.log('loading');

        const response = await fetch(`${APIURL}/users`, {
            method: 'POST',
            body: formData
        })

        const userData = await response.json();
        console.log(userData);

        if(userData.username) {
            sessionStorage.setItem('username', userData.username)
            sessionStorage.setItem('user_id', userData.id)
            navigate('/user-home/' + userData.username);
        }
        else setAlertVisible(true)
        
    }

    useEffect(() => {
        if(sessionStorage.getItem('username')) navigate('/user-home/' + sessionStorage.getItem('username'));
    }, [])

    return ( 
        <div className="container-sm mt-5">
            <div className="container-md mt-5">
                <h2 className="text-center">Create account</h2>
                <form onSubmit={submitUser} className="container-sm form">
                    <input type="text" placeholder="Username" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="email" placeholder="Gmail" className="form-control" onChange={(e) => setGmail(e.target.value)}/>
                    <button className="btn btn-primary" type="submit" style={{width: '100%'}}>CREATE</button>
                    <Link to="/login">Sign in</Link>
                </form>
                <div className={alertVisible?'alert alert-danger':'d-none'} role="alert">
                    Not valid
                </div>
            </div>
        </div> 
        
    );
}

export default CreateUser;