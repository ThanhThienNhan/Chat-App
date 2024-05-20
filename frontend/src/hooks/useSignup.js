import { useState } from "react"
import { toast } from "react-toastify";
import {useAuthContext} from '../context/AuthContext'

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields", {
      position: "bottom-right",
    });
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match", {
      position: "bottom-right",
    });
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters", {
      position: "bottom-right",
    });
    return false;
  }

  //all pass
  return true;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      })

      const data = await res.json();

      if(data.error){
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user",JSON.stringify(data));
      setAuthUser(data);

      console.log(data);

      toast.success("Sign up successfully", {
        position: "bottom-right",
      });
      
    } catch (error) {
      toast.error(error.message,{
        position:"bottom-right"
      })
    } finally {
      setLoading(false);
      
    }

  }

  return { loading, signup }

}
export default useSignup