import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message, image) => {
        setLoading(true);
        try {

            let formData=new FormData();
            formData.append("message",message)
            formData.append("image",image)

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right"
            });
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
