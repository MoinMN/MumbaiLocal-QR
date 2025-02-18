import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setSection }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.log('Error while logging out\nError: ', error);
    }
  }

  return (
    <nav className='bg-purple-300 sticky top-0 py-4 px-6 text-white flex flex-col gap-4 sm:flex-row justify-between items-center text-base md:text-lg shadow-md select-none'>
      <h3
        onClick={() => navigate('/admin/dashboard')}
        className="playwrite_in text-2xl font-semibold cursor-pointer select-none"
      >
        Admin Panel
      </h3>
      <div className="flex gap-4">
        <span
          className='cursor-pointer'
          onClick={() => setSection('approved')}
        >
          Approved
        </span>
        <span
          className='cursor-pointer'
          onClick={() => setSection('pending')}
        >
          Pending
        </span>
        <span
          className='cursor-pointer'
          onClick={() => setSection('add-new')}
        >
          Add New
        </span>
        <span
          className='cursor-pointer text-red-500 font-medium'
          onClick={() => logout()}
        >
          Log Out
        </span>
      </div>
    </nav>
  )
}

export default Navbar
