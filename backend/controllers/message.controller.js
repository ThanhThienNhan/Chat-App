const sendMessage=async(req,res)=>{
    try {
        //const message=req.body.message
        const{message}=req.body;
        const{id}=req.params;
        const senderId=req.userId
    } catch (error) {
        console.log("Error in sendMessage controller: ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports={sendMessage};