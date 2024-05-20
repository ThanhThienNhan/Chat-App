import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const data = res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user")
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right"
            })
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout }
}

export default useLogout