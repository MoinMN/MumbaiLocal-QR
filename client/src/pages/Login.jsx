import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../utility/AuthVerify';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { RxCross2 } from "react-icons/rx";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.username || !user?.password) return setErrorMsg("All Fields Required!");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",   // allow cookies to be sent
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        return navigate('/admin/dashboard');
      }
      setErrorMsg(data.msg);
    } catch (error) {
      console.log("Error while logging in\nError: ", error);
      setErrorMsg('Internal Server Error!');
    }
  }

  useEffect(() => {
    isAuthenticated()
      .then(res => {
        if (res) return navigate('/admin/dashboard');     // user is authenticated so redirect
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading
        ?
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
        :
        <div className='bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% min-h-screen flex flex-col justify-center items-center text-base max-sm:text-sm px-6'>
          {errorMsg &&
            <div className="py-4 px-2 border border-red-500 bg-red-300/70 my-2 flex justify-between items-center gap-8">
              <span className="text-sm max-sm:text-xs">
                {errorMsg}
              </span>
              <span className="text-2xl cursor-pointer" onClick={() => setErrorMsg('')}>
                <RxCross2 />
              </span>
            </div>
          }
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50/20 md:py-8 md:px-6 max-md:py-4 max-md:px-3 w-full sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-1/2 border border-white rounded-lg shadow-md"
          >
            <h3 className='playwrite_in font-medium text-2xl text-center'>
              Admin Login
            </h3>

            {/* input data  */}
            <div className="flex flex-col gap-4 items-center md:my-12 max-md:my-8 sm:w-5/6 md:w-4/5 lg:w-1/2 mx-auto">
              <div className="flex justify-center items-end gap-2 w-full">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete='off'
                  className='w-full border-b-2 outline-none md:px-2 max-md:px-1.5 md:py-1.5 max-md:py-1 text-gray-600'
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-end gap-2 w-full">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete='off'
                  className='w-full border-b-2 outline-none md:px-2 max-md:px-1.5 md:py-1.5 max-md:py-1 text-gray-600'
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* login btn  */}
            <button
              type="submit"
              className="md:px-12 max-md:px-8 md:py-2 max-md:py-1.5 cursor-pointer border border-blue-500 bg-gray-100 shadow-md hover:rounded-xl transition-all duration-200 ease-in-out hover:bg-gray-200 focus:outline-blue-200 focus:rounded-xl"
            >
              Log In
            </button>
          </form>

        </div>
      }
    </>
  )
}

export default Login
