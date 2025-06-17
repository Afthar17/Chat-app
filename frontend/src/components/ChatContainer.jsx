import {useEffect, useRef} from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeltons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const {messages,getMessages,ismessagesloading,selectedUser,subscribeToMessages,unSubscribeToMessages} = useChatStore()  
  const {authUser} = useAuthStore()
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    //cleanup function
    return () => unSubscribeToMessages()
  }, [getMessages,selectedUser._id,subscribeToMessages,unSubscribeToMessages]);

  useEffect(()=>{
    if(!messageEndRef.current) return
    messageEndRef.current?.scrollIntoView({behavior:'smooth'})
  },[messages])

  if(ismessagesloading) {return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )}

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message=>(
            <div key={message._id} className={`chat ${message.senderId === selectedUser._id ? "chat-start" : "chat-end"}`} ref={messageEndRef}>
              <div className="chat-image">
                <div className="size-10 rounded-full border-2 border-[#219ebc] relative">
                  <img src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'} className='w-9 h-9 absolute rounded-full' alt="" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50">{message.createdAt.split('T')[1].split('.')[0]}</time>
              </div>
              <div className="chat-bubble flex flex-col bg-[#219ebc]">
                {message.image&& (<img src={message.image} alt="" className='sm:max-w-[200px] rounded-md mb-2'/>)}
                <p className='text-sm text-[#14241d]'>{message.text}</p>
              </div>
            </div>
          )))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer