import React, { useState } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';

function Messages() {
    const{messages,loading}=useGetMessages();

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loading&&[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
        
            {!loading&&messages.length===0&&(
                <p className='text-center'>Send a message to start a conversation</p>
            )}

            {!loading&&messages.length>0&&messages.map((message)=>(
                <Message key={message._id} message={message}/>
            ))}
        
        </div>
    )
}

export default Messages