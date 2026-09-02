import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must"],
        minlength: 2,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, "Email is must"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Password is must"],
        minlength: 6
    },
    refreshToken:{
        type: String,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.refreshToken;
            return ret;
        }
    }
});

const User = mongoose.model("User" , UserSchema);
export default User;