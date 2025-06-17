import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeClosedIcon, Loader2, Lock, Mail, MessageSquare,} from 'lucide-react'
import { motion} from 'framer-motion'
import AuthImagePattern from '../components/AuthImagePattern'
import toast  from 'react-hot-toast'

const LoginPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    })
    const {login,isLoggingIn} = useAuthStore()
  
    const validateForm = () => {
      if (!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
      return true;
    }
    const handleSubmit =(e)=>{
      e.preventDefault()
      const success = validateForm();
      if (success === true) login(formData)
    }
  return (
    <div className='h-screen grid lg:grid-cols-2'>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
      {/* Left side*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 w-full">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-[]:hover:bg-primary/20 transition-colors'>
                <MessageSquare className=' size-6 text-[#219ebc]'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className=' text-white'>Login to your account</p>
            </div>
          </div>
          <form  onSubmit={handleSubmit} className='space-y-6'>
              <div className="flex flex-col items-center justify-center w-full">
                
                <div className="mt-5 flex flex-col gap-2 w-full lg:w-[80%] mx-1 lg:mx-5 relative">
                  <label htmlFor="email" className='text-sm text-[#219ebc] font-semibold'>Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email}
                      onChange={(e)=> setFormData({...formData,email:e.target.value})}
                      placeholder='you@gmail.com'
                      className='rounded-lg p-2 placeholder:text-sm placeholder:tracking-wide bg-[#219ebc]/10 border border-[#265563] w-full focus:outline-none focus:ring-[#219ebc]/30 focus:ring-2 text-[#8ecae6] pl-10 ' 
                    />
                    <Mail className='absolute left-2 top-1/2 transform -translate-y-1/2 text-[#3d97b3] pointer-events-none'/>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2 w-full lg:w-[80%] mx-1 lg:mx-5 relative">
                  <label htmlFor="password" className='text-sm text-[#219ebc] font-semibold'>Password</label>
                  <div className="relative">
                    <input 
                      type={isShowPassword ? "text" : "password"}
                      name="password" 
                      id="password" 
                      value={formData.password}
                      onChange={(e)=> setFormData({...formData,password:e.target.value})}
                      placeholder='**********'
                      className='rounded-lg p-2 placeholder:text-sm placeholder:tracking-wide bg-[#219ebc]/10 border border-[#265563] w-full focus:outline-none focus:ring-[#219ebc]/30 focus:ring-2 text-[#8ecae6] pl-10 ' 
                    />
                    <Lock className='absolute left-2 top-1/2 transform -translate-y-1/2 text-[#3d97b3] pointer-events-none'/>
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#3d97b3]' onClick={()=>setIsShowPassword(!isShowPassword)}>{isShowPassword ? <Eye /> : <EyeClosedIcon />}</div>
                  </div>
                </div>
                
                <motion.button
                  disabled={isLoggingIn}
                  whileHover={{scale:1.05}}
                  whileTap={{scale:0.9}}
                  type='submit'
                  className='bg-[#219ebc] font-semibold text-white py-2 px-4 rounded-lg w-full lg:w-[80%] mx-1 lg:mx-5 mt-8 items-center justify-center flex'
                >{isLoggingIn ? <><Loader2 className="size-6 animate-spin" /></> : "Login"}</motion.button>
                <div className="flex text-sm mt-2 text-[#219ebc]"><p>Not a member? <a href="/signup" className='font-semibold underline cursor-pointer'>Signup</a></p></div>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage