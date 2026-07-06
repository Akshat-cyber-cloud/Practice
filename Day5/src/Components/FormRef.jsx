import React from 'react'
import { useRef } from 'react'

const FormRef = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email);
        console.log(password);

        alert(`Welcome ${email}`);

        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

  return (
    <form onSubmit={handleLogin}>
        <input 
            type='email'
            placeholder='Enter Email'
            ref={emailRef}
        />

        <br /><br />

        <input 
            type='password'
            placeholder='Enter password'
            ref={passwordRef}
        />

        <br /><br />

        <button>Login</button>
    </form>
  )
}

export default FormRef