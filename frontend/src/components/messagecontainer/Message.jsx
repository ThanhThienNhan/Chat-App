import React, { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import { FaCheckCircle } from "react-icons/fa";
import { useSocketContext } from '../../context/SocketContext';

function Message({ message }) {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { socket } = useSocketContext();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
    const formattedTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? 'shake' : '';
    const seenTickColor = message.seen ? '3B82F6' : '';

    useEffect(() => {
        if (!fromMe && !message.seen) {
            socket.emit('messageSeen', { messageId: message._id, senderId: message.senderId });
        }
    }, [message, fromMe, socket]);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Chat bubble' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass}`}>
                {message.img ? (
                    <img src={message.img} alt='Message' className='rounded-md' width={200}/>
                ) : (
                    message.message
                )}
            </div>
            <div className='chat-footer text-white py-1 text-xs flex gap-1 items-center'>
                <div className='opacity-50'>
                    {formattedTime}
                </div>
                {fromMe ? (<FaCheckCircle color={`${seenTickColor}`} size={16} />) : ''}
            </div>
        </div>
    );
}

export default Message;
