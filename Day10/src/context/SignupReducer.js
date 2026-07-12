export const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
};

export function signupReducer(state,action){
    switch(action.type){
        case "UPDATE_ACCOUNT":
            return{
                ...state,
                email: action.payload.email,
                password: action.payload.password
            };

        case "UPDATE_PROFILE":
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phone: action.payload.phone
            };

        case "RESET_FORM":
            return initialState;

        default: 
            return state;
    }
}