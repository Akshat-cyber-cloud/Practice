import User from "../models/User.js";

const loginUser = async(email,password) => {
    const user = await User.findOne({email});
    return user;
};

export const registerUser = async (email, password) => {
    // check if user exists
    const existing = await User.findOne({ email });
    if(existing){
        throw new Error('User already exists');
    }

    const user = await User.create({ email, password });
    return user;
}

export default loginUser;