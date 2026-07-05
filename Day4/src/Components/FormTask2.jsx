import React from 'react'
import { useState } from 'react'

const FormTask2 = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passcode, setPasscode] = useState("");
    const [age, setAge] = useState("");

    const [submit, setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type='text' placeholder='Enter name' value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email: </label>
                <input type='email' placeholder='Enter mail' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password: </label>
                <input type='password' placeholder='Enter Passcode' value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                />

                <button type='submit'>Submit</button>
            </form>

            {submit && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Submitted Data</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Password:</strong> {passcode}</p>
                    <p><strong>Age:</strong> {age}</p>
                </div>

            )}
        </div>
    )
}

export default FormTask2