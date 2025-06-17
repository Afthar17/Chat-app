import React from 'react'
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpg"
import img7 from "../assets/7.jpg"
import img8 from "../assets/8.jpg"
import img9 from "../assets/9.jpg"
import {motion } from 'framer-motion'

const AuthImagePattern = ({ title, subtitle }) => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#13293D] p-12">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <motion.div 
        className="grid grid-cols-3 gap-0.5 mb-8">
          {[...Array(9)].map((_, i) => (
            <motion.div
              whileHover={{scale:1.05}}
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 
              `}
            >{<img src={images[i]} className='rounded-md opacity-80' />}</motion.div>
          ))}
        </motion.div>
        
        <p className="text-[#219ebc]">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern