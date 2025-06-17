import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, SendHorizontal, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [text,setText] = useState('')
  const [imagePreview,setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const {sendMessage} = useChatStore()
  const[uploading,setUploading] = useState(false)

  const handleImageChange = (e)=>{
    
    const file = e.target.files[0]; //get the file from the input
    if(!file.type.startsWith('image/')){  //check if the file is an image
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader()
    reader.onloadend = ()=>{
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
    } 
  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }
  const handleSendMessage =async(e)=>{
    e.preventDefault()
    if (!text.trim() && !imagePreview) return;
    try {
      setUploading(true)
      await sendMessage({text:text.trim(),image:imagePreview})

      //clear the form
      setUploading(false)
      setText('')
      setImagePreview(null)
      if(fileInputRef.current) fileInputRef.current.value =null
    } catch (error) {
      toast.error('Failed to send message')
      console.log(error)
    }
  }
  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt=""
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImagePreview}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#DEFFF2]
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3 text-[#219ebc] " />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
            <input type="text"
            className='w-full py-3 px-2 rounded-lg text-[#DEFFF2] input-sm sm:input-md bg-[#0a1928] focus:outline-none focus:ring focus:ring-[#219ebc]'
            placeholder='Type a message...' 
            value={text}
            onChange={(e)=>setText(e.target.value)}/>
            <input type="file" className="hidden" accept='image/*' ref={fileInputRef} onChange={handleImageChange}/>
            <button className={`hidden sm:flex items-center mx-2 ${imagePreview ? 'text-emerald-500' : 'text-[#219ebc]'}`} type="button" onClick={()=>fileInputRef.current.click()}><Image size={20} /></button>
        </div>
        <button type='submit' className='disabled:text-[#4f5758] text-[#219ebc]' disabled={!text.trim() && !imagePreview || uploading}><SendHorizontal size={20} className={` `} /></button>
      </form>
    </div>
  )
}

export default MessageInput