import React from 'react'
import { useState } from 'react'

const FormTask1 = () => {
    const[name, setName] = useState("");

    return (
        <>
            <input 
                type='text'
                placeholder='Enter the value'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />


            <h2>Reverse: {name.split("").reverse().join("")}</h2>
            <h2>Name: {name}</h2>
            <h2>Uppaercase: {name.toUpperCase()}</h2>
        </>
    )
}

export default FormTask1