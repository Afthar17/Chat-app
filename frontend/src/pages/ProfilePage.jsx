import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react';

const ProfilePage = () => {
  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async(e)=>{
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async() => {

      const img = reader.result;
      setSelectedImg(img);
      await updateProfile({profilePic:img})
    }
  }
  const Time = authUser?.createdAt?.split("T")[0] || '';
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-center mt-5 bg-[#13293D] p-12 w-full mx-2 lg:mx-0 lg:w-lg rounded-xl">
        <h1 className='text-2xl font-bold mb-4'>Profile</h1>
        <p className='text-[#219ebc] text-sm font-semibold mb-4'>Update your profile</p>
        <div className="flex flex-col items-center relative w-full">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || '/avatar.png'}
                alt=""
                className="w-32 h-32 rounded-full mb-4 border-4 border-[#219ebc]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-[#13293D] border-2 border-[#219ebc] hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-[#219ebc] bg-[#13293D]" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-[#219ebc] text-sm mt-4 font-semibold animate-pulse'>{isUpdatingProfile && "Updating..." }</p>
            <div className="flex flex-col gap-2 w-full mb-2">
              <p className="text-[#E0E2DB] text-sm font-semibold mr-4">Name</p>
              <input className="text-[#219ebc] bg-[#219ebc]/10] text-sm font-semibold px-3 py-2 w-[100%] border-2 border-[#219ebc] rounded-2xl" value={authUser.name} id='email' name='email' disabled/>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-[#E0E2DB] text-sm font-semibold mr-4">Email</label>
              <input className="text-[#219ebc] bg-[#219ebc]/10] text-sm font-semibold px-3 py-2 w-[100%] border-2 border-[#219ebc] rounded-2xl" value={authUser.email} id='email' name='email' disabled/>
            </div>
            <div className="flex flex-col gap-2 w-full items-start">
                  <h1 className='text-[#E0E2DB] text-sm font-semibold mt-6'>Account Information</h1>
                  <div className='flex py-2 border-b-2 mt-3 border-[#219ebc] w-full '/>
                  <div className="flex justify-between w-full">
                    <span className='text-[#E0E2DB] text-sm font-semibold mt-6'>Member since</span>
                    <span className='text-[#E0E2DB] text-sm font-semibold mt-6'>{Time}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className='text-[#E0E2DB] text-sm font-semibold mt-4'>Status</span>
                    <span className='text-green-500 text-sm font-semibold mt-4'>Active</span>
                  </div>
                  </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage