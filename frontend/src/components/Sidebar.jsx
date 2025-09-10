import {  useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeltons/SidebarSkelton'
import {  Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const {selectedUser,users,getUsers,setSelectedUser,isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore(); 
  const [showOnlineOnly,setshowOnlineOnly] = useState(false)

  useEffect(()=>{getUsers()},[])

  const filteredUsers = showOnlineOnly? users.filter(user => onlineUsers.includes(user._id)) : users
  if(isUsersLoading) return <SidebarSkeleton />
  return (
    <aside className='w-18 lg:w-60 bg-blue-300/10 h-full rounded-2xl'>
      <div className="flex flex-col items-center justify-top h-full border rounded-2xl border-[#219ebc]/10 ">
        <div className="flex gap-2 mt-3 border-b border-[#219ebc]/10 w-full items-center justify-center p-2 ">
          <Users className="text-[#DEFFF2]" /> 
          <h1 className="text-[#DEFFF2] text-sm hidden lg:block font-semibold">Contacts</h1>
        </div>
        <div className="flex gap-2 my-2">
          <h1 className="text-[#DEFFF2] text-sm hidden lg:block font-semibold">Online</h1>
          <p className='text-[#DEFFF2] text-sm font-semibold'>{onlineUsers.length - 1}</p>
          <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setshowOnlineOnly(e.target.checked)}/>
          
        </div>
        <div className="overflow-y-auto w-full flex flex-col items-center border border-[#219ebc]/10">
          {filteredUsers.map((user, idx) => (
            <button key={idx}
             onClick={() => setSelectedUser(user)}
             className={`w-full flex items-center gap-3 border-b border-[#219ebc]/10 transition-all duration-200 hover:bg-[#219ebc]/10 ${selectedUser?._id === user._id ? "bg-[#219ebc]/10 ring-2 rounded-xl ring-[#219ebc]/5" : ""}`}>
              {/* Avatar */}
              <div className="relative mx-auto lg:mx-2 mt-1">
                <img
                  src={user.profilePic || '/avatar.png'}
                  alt=""
                  className="w-12 h-12 rounded-full mb-1 border-3 border-[#219ebc]"
                />
                <span className={`absolute top-0 right-0 w-3 h-3 ${!onlineUsers.includes(user._id) ? 'bg-red-400' : 'bg-green-400'} border-2 border-white rounded-full`}/>
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden  text-left min-w-0 lg:flex flex-col">
                <p className="text-[#DEFFF2] truncate">{user.name}</p>
                <p className='text-gray-400 font-extralight text-xs'>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</p>
              </div>
            </button>
          ))}
        </div>
        {filteredUsers.length === 0 && <div className="flex flex-col items-center justify-center h-full w-full text-[#DEFFF2] text-sm font-semibold">No users Online...</div>}
      </div>
    </aside>
  )
}

export default Sidebar