const express= require('express');
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser")

const authRoutes=require("./routes/auth.routes");
const messageRoutes=require("./routes/message.routes")
const userRoutes=require("./routes/user.routes");

const connectToMongoDB = require('./db/connectToMongoDB');

const app =express();
const PORT = process.env.PORT||5000;

dotenv.config();

app.use(express.json());//to parse requests with JSON payloads (from req.body) 
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     res.send("Hello World!")
// })

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});