import {useForm} from "react-hook-form";

const ReactForm = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <h2>Student Registration Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <br />

                    <input 
                        type="text"
                        placeholder="Enter your name"
                        {...register("name")}
                    />
                </div>

                <br />
                <div>
                    <label>Email</label>
                    <br />
                    <input 
                        type="email"
                        placeholder="Enter Your Email"
                        {...register("email")}
                    />
                </div>

                <br />

                <div>
                    <label>Age</label>
                    <br />
                    <input 
                        type="number"
                        placeholder="Enter your age"
                        {...register("age")}
                    />
                </div>

                <br />

                <button type="submit">Submit</button>
                <button 
                    type="button"
                    onClick={reset}
                    style={{ marginLeft: "10px" }}
                >Reset</button>
            </form>
        </div>
    )
}

export default ReactForm;