import { useState } from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Register = () => {

    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const[error, setError] = useState('');
    const navigate =  useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:3000/api/auth/register', formData);
            navigate('/dashboard');
        }catch(error){
            setError(error.response.data.message);
        }
    }

  return (
    <div>
      <h2>Register</h2>
      
      {error && <p style={{color:'red'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;