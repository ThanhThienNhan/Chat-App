import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { toast } from 'react-toastify';

function SearchInput({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input 
        type='text' 
        placeholder='Search' 
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h06 outline-none' />
      </button>
    </form>
  );
}

export default SearchInput;
