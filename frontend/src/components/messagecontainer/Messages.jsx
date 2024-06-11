import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import { useSocketContext } from '../../context/SocketContext';

function Messages() {
    const { messages, loading } = useGetMessages();
    const { socket } = useSocketContext();

    useListenMessages();

    const lastMessageRef = useRef();
    const [seenMessages, setSeenMessages] = useState({});

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    useEffect(() => {
        if (socket) {
            socket.on('notifyMessageSeen', ({ messageId }) => {
                setSeenMessages((prev) => ({ ...prev, [messageId]: true }));
            });
        }
    }, [socket]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-200'>Send a message to start a conversation</p>
            )}

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id}
                    ref={lastMessageRef}
                >
                    <Message message={{ ...message, seen: seenMessages[message._id] || message.seen }} />
                </div>
            ))}
        </div>
    );
}

export default Messages;
