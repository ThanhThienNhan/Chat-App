const path = require('path');
const fileUpload = require('express-fileupload')
const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes")
const userRoutes = require("./routes/user.routes");

const connectToMongoDB = require('./db/connectToMongoDB');

const { app, server } = require('./socket/socket')

const cloudinary = require('cloudinary').v2;

dotenv.config();

__dirname = path.resolve();

const PORT = process.env.PORT || 5000;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 }
}));

app.use(express.json({ limit: '10mb' })); //to parse requests with JSON payloads (from req.body) 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend', 'dist', 'index.html'));
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});