const { Server } = require('socket.io');
const http = require('http');
const express = require('express')
const Message=require("../models/message.model")

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('messageSeen', async ({ messageId, senderId }) => {
        try {
            // Update message seen status in the database
            await Message.findByIdAndUpdate(messageId, { seen: true });

            // Notify the sender
            const receiverSocketId = getReceiverSocketId(senderId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('notifyMessageSeen', { messageId });
            }
        } catch (error) {
            console.error('Error marking message as seen:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })


})

module.exports = { app, io, server,getReceiverSocketId };