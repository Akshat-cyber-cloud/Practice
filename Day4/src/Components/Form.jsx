import React from 'react'
import { useState } from 'react'

const Form = () => {
    const[name, setName] = useState("");

  return (
    <div>
        <input 
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <h2>{name}</h2>
    </div>
  )
}

export default Form