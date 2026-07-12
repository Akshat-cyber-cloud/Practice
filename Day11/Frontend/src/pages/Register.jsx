import React from 'react'
import { useState } from 'react'
import { registerUser } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic client-side validation
        if(!email || !password){
            alert('Email and password are required');
            return;
        }

        if(password.length < 8){
            alert('Password must be at least 8 characters');
            return;
        }

        const userData = { email, password }

        try{
            const response = await registerUser(userData);
            console.log(response);
            navigate('/');
        }catch(error){
            console.log(error.response?.data || error.message || error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    }

  return (
    <div>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
            <input 
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button type='submit'> 
                Register
            </button>
        </form>
    </div>
  )
}

export default Register
