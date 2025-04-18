import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";


export type SignInFormData={
    email:string;
    password:string;
}
const SignIn=()=>{
    const queryClient=useQueryClient();

    const{showToast}=useAppContext();

    const navigate=useNavigate();

    const{ 
        register,
        formState:{errors},
        handleSubmit,
       }=useForm<SignInFormData>();

    const mutation = useMutation({
        mutationFn: (formData: SignInFormData) => apiClient.signIn(formData), // Correct function signature
        onSuccess: async () => {
            // Show toast message
            showToast({message:"Sign in Successfull",type:"SUCCESS"});
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            // Navigate to home page
            navigate("/")
        },
        onError: (error: Error) => {
            // Show error toast
            showToast({message:error.message,type:"ERROR"});
        },
    });

    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data);

    });

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email",{required:"This field is required"})}></input>
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input 
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password",{
                        required:"This field is required",
                        minLength:{
                            value:6,
                            message:"Password must be atleast 6 characters"
                        },
                    })}>

                    </input>
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
                <span className="flex items-centre justify-between">
                    <span className="text-sm">
                        Not Registered?<Link  className="underline hover:bg-green-200" to="/register">CREATE A NEW ACCOUNT</Link>
                    </span>
                    <button 
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-green-500 text-xl">
                        Login 
                    </button>
                </span>

        </form>
    );
};

export default SignIn;
