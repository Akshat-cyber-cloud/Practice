import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            await login(email, password);
            navigate("/dashboard");
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Enter Passcode" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>

                <p>No Account? <Link to="/register">Register</Link></p>
            </form>
        </>
    )
}

export default Login;