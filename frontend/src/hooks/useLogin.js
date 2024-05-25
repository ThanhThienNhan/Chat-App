import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";



function handleInputErrors({username, password}) {
    if (!username || !password) {
        toast.error("Please fill in all fields", {
            position: "bottom-right",
        });
        return false;
    }

    //all pass
    return true;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const login = async ({username, password}) => {
        const success = handleInputErrors({username,password})

        if (!success) return;

        setLoading(true);
        try {

            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

            toast.success("Logged in successfully", {
                position: "bottom-right",
            });

        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right"
            })
        } finally {
            setLoading(false);

        }
    }

    return { loading, login }
}

export default useLogin