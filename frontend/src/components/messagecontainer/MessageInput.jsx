import React, { useState, useRef } from 'react';
import { GrEmoji } from 'react-icons/gr';
import EmojiPicker from 'emoji-picker-react';
import useSendMessage from '../../hooks/useSendMessage';
import { BsSend, BsFillImageFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

function MessageInput() {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !image) {
            return;
        }
        
    
        // Check if an image is selected and validate its type
        if (image) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(image.type)) {
                toast.error("Only accept jpg, jpeg, png", {
                    position: "bottom-right"
                });
                return;
            }
        }
    
        console.log("MESSAGE",message);
        console.log("IMAGE",image);
        await sendMessage(message, image);
     
        setMessage('');
        setImage(null);
    };

    const onEmojiClick = (emojiObject) => {
        const cursor = inputRef.current.selectionStart;
        setMessage((prevMessage) => {
            const newMessage = prevMessage.slice(0, cursor) + emojiObject.emoji + prevMessage.slice(cursor);
            const newCursor = cursor + emojiObject.emoji.length;
            setTimeout(() => inputRef.current.setSelectionRange(newCursor, newCursor), 10);
            return newMessage;
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            e.target.value = null;
        }
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 pl-10 bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={inputRef}
                />
                <button type="button" className="absolute inset-y-0 end-10 flex items-center pe-3" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <GrEmoji />
                </button>
                <button type="button" className="absolute inset-y-0 end-20 flex items-center pe-3" onClick={() => fileInputRef.current.click()}>
                    <BsFillImageFill />
                </button>
                <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} accept=".jpg, .jpeg, .png" />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                </button>
                {showEmojiPicker && (
                    <div className="absolute bottom-full right-0">
                        <EmojiPicker width={300} height={350} onEmojiClick={onEmojiClick} />
                    </div>
                )}
                {image && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="max-w-sm w-full bg-white rounded-lg p-6 shadow-lg">
                            <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-auto rounded-lg mb-4" />
                            <div className="flex justify-end">
                                <button className="text-gray-600 hover:text-gray-900" onClick={() => setImage(null)}>Close</button>
                                {loading ? (
                                    <div className="loading loading-spinner"></div>
                                ) : (
                                    <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmit}>Send</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}

export default MessageInput;
