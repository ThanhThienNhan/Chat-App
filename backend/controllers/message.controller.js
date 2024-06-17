const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require('../socket/socket');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const file = req.files?.image

        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        let imageUrl = "";
        if (file) {
            const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'chatapp',
            });
            imageUrl = uploadResponse.url;
            
            // Clean up the temporary file
            fs.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.error('Failed to delete temp file:', err);
                }
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            img: imageUrl || ""
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getMessages, sendMessage };
