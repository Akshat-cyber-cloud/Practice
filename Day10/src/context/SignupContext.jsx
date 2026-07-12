import { createContext, useReducer } from "react";
import { signupReducer, initialState } from "./SignupReducer";

const SignupContext = createContext();

export function SignupProvider({children}){
    const [state, dispatch] = useReducer(signupReducer,initialState);

    return (
        <SignupContext.Provider value={{state,dispatch}}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupContext;