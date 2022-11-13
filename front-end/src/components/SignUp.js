import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    });
    const collectData = async() => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        if (result) {
            navigate('/');
        }
        console.log(result);

    }
    return(
        <div className='registeration_page'>
            <h1>Register</h1>
            <input className='input_box' type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
            <input className='input_box' type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className='input_box' type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className='app_button' onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;