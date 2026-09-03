import { createContext , useContext,  useState } from "react";
import API from "../api/axios";

// Creating a context
const AuthContext = createContext();

// Provider

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const register = async (name, email , password) => {
        try{
            const res = await API.post('/auth/register', {name,email,password});
            localStorage.setItem("accessToken", res.data.accessToken);
            setUser(res.data.user);
        }catch(error){
            console.error("Registration failed:", error.response ? error.response.data : error.message);
        }
    }

    const login = async (email, password) => {
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("accessToken", res.data.accessToken);
            setUser(res.data.user);
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

