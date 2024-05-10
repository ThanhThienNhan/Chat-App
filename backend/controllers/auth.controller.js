const signup=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
    }catch(error){

    }
}

const login=(req,res)=>{
    console.log("loginUser");
}

const logout=(req,res)=>{
    console.log("logoutUser");
}

module.exports={signup,login,logout}