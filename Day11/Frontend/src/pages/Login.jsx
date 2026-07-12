import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/auth.service';

const Login = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        try{
            const response = await loginUser(userData);
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
        <h1>Login</h1>

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
                Login
            </button>
        </form>
        <p>
            Don't have an account? <Link to="/register">Register</Link>
        </p>
    </div>
  );
}

export default Login