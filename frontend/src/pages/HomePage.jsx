import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'

const HomePage = () => {
  const {selectedUser} = useChatStore()
  return (
    <div className='h-screen flex items-center w-full justify-center '>
      <div className="flex bg-[#13293D] p-2 lg:p-6 w-full mx-2 lg:mx-0 lg:w-7xl h-[calc(100vh-3rem)] gap-5 my-4 rounded-xl">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  )
}

export default HomePage