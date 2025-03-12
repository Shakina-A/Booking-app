import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient=useQueryClient();
        
     const{showToast}=useAppContext();

     const mutation = useMutation({
        mutationFn: () => apiClient.signOut(), // Explicit function signature
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] }); // ✅ FIXED
            // Show toast
            showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            // Show toast
            showToast({ message: error.message, type: "ERROR" });
        },
    });
const handleClick=()=>{
    mutation.mutate();
};


    return(
        <button onClick={handleClick}
        className="text-blue-600 px-3 font-bold bg-white hover:bg-red-300">
            Sign Out
        </button>
    );
};

export default SignOutButton;