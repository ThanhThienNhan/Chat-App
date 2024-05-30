import React, { useState, useRef } from 'react';
import { BsSend } from 'react-icons/bs';
import { GrEmoji } from 'react-icons/gr';
import EmojiPicker from 'emoji-picker-react';
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            return;
        }
        await sendMessage(message);
        setMessage("");
    };

    const onEmojiClick = (emojiObject) => {
        const cursor = inputRef.current.selectionStart;
        setMessage(prevMessage => {
            const newMessage = prevMessage.slice(0, cursor) + emojiObject.emoji + prevMessage.slice(cursor);

            const newCursor = cursor + emojiObject.emoji.length;

            setTimeout(() => inputRef.current.setSelectionRange(newCursor, newCursor), 10);

            return newMessage;
        });
    };

    // const onEmojiClick = (emojiObject) => {
    //     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    //     //setShowEmojiPicker(false);
    // };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={inputRef}
                />
                <button type='button' className='absolute inset-y-0 end-10 flex items-center pe-3' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <GrEmoji />
                </button>
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
                {showEmojiPicker && (
                    <div className='absolute bottom-full right-0'>
                        <EmojiPicker width={300} height={350} onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
        </form>
    );
}

export default MessageInput;
