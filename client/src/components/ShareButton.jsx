import React from 'react'
import { Link } from 'react-router-dom';
import { FaShareNodes } from "react-icons/fa6";

const ShareButton = () => {
  return (
    <Link to='/post'>
      <div className="fixed text-white z-10 h-20 w-20 bottom-4 right-4 rounded-full overflow-hidden flex items-center justify-center bg-radial-[at_50%_100%] from-green-200 via-green-400 to-green-900 to-90% shadow-lg hover:scale-105 transition-transform cursor-pointer select-none animate-pulse hover:animate-none">
        <span className="text-xs md:text-sm font-semibold text-center leading-tight">
          <FaShareNodes className='mx-auto text-lg' />
          Share <br /> QR Code
        </span>
      </div>
    </Link>
  )
}

export default ShareButton
