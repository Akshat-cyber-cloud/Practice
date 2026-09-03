import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            await register(name, email, password);
            navigate("/dashboard");
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;