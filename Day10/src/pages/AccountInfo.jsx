import { useForm } from "react-hook-form";
import { useContext } from "react";
import SignupContext from "../context/SignupContext";

const AccountInfo = () => {

    function AccountInfo({ setStep }) {
        const { dispatch } = useContext(SignupContext);

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();
    }

    function onSubmit(data) {
        dispatch({
            type: "UPDATE_ACCOUNT",
            payload: data,
        });

        setStep(2);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Account Information</h2>

            <div>
                <label>Email</label>
                <br />
                <input
                    type='text'
                    placeholder='Enter Email'
                    {
                        ...register("email", {
                            required: "Email is required",
                        })
                    }
                />

                <p>{errors.email?.message}</p>
            </div>

            <div>
                <label>Password</label>
                <br />
                <input
                    type='password'
                    placeholder='Enter Password'
                    {
                        ...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimmum 6 characters"
                            },
                        })
                    }
                />

                <p>{errors.email?.message}</p>
            </div>
        </form>
    );
}

export default AccountInfo