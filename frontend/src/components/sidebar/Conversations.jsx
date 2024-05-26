import React, { useState } from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import SearchInput from './SearchInput';

function Conversations() {
  const { loading, conversations } = useGetConversations();
  const [filteredConversations, setFilteredConversations] = useState([]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conversation =>
        conversation.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  };

  return (<>
    <SearchInput onSearch={handleSearch} />
    <div className='divider px-3'></div>
    <div className='py-2 flex flex-col overflow-auto'>

      {(filteredConversations.length > 0 ? filteredConversations : conversations).map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  </>
  );
}

export default Conversations;
