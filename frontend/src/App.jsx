import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser) 
  if(isCheckingAuth){
    return(
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader size={50} className='animate-spin'/>
        <p className='text-xl font-semibold mt-3 animate-bounce transition duration-300'>Loading...</p>
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <Toaster />
      <Navbar />
      <Routes>
        <Route  path='/' element={authUser? <HomePage/> : <Navigate to='/login'/>}/>
        <Route  path='/signup' element={!authUser? <SignupPage/> : <Navigate to='/'/>}/>
        <Route  path='/login' element={!authUser? <LoginPage/> : <Navigate to='/'/>}/>
        <Route  path='/profile' element={authUser?<ProfilePage/>: <Navigate to='/login'/>}/>
      </Routes>
    </div>
  )
}

export default App