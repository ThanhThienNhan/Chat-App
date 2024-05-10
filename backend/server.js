const express= require('express');
const dotenv=require("dotenv");
const authRoutes=require("./routes/auth.routes");
const connectToMongoDB = require('./db/connectToMongoDB');
const app =express();

dotenv.config();
const PORT = process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});