import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    }, []);
    const handleLogin = async() => {
        let result = await fetch('http://localhost:5000/login', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className='login_page'>
            <h1>Login</h1>
            <input id="email_field"className="input_box" type="email" placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="password_field" className="input_box" type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin} className="app_button">Login</button>
        </div>
    )
}

export default Login;