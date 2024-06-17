import { useSocketContext } from "../context/SocketContext"
import useConversation from '../zustand/useConversation';
import { useEffect } from "react";
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // Check if the message belongs to the currently selected conversation
            if (newMessage.senderId === selectedConversation?._id) {
                newMessage.shouldShake = true;
                const sound = new Audio(notificationSound);
                sound.play();

                setMessages([...messages, newMessage]);
            }
        })

        return () => {
            socket?.off("newMessage")
        }
    }, [socket, setMessages, messages])

}

export default useListenMessages