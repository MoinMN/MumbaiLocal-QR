import React, { useRef, useState } from 'react'
import FormBox from '../components/Form'
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';

const PublicForm = () => {
  const [inputData, setInputData] = useState({
    station_name: "",
    station_line: "unknown",
    qr_code: null,
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // for reset purpose
  const fileInputRef = useRef(null); // Reference to file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!inputData?.station_name || !inputData?.station_line || !inputData?.qr_code) {
      setMessage({ text: "All fields required!", type: "danger" });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('station_name', inputData?.station_name);
      formData.append('station_line', inputData?.station_line);
      formData.append('qr_code', inputData?.qr_code);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/post`, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitting(false);
        setMessage({ text: data.msg, type: "success" });
        // reset form data
        setInputData({
          station_name: "",
          station_line: "unknown",
          qr_code: null,
        });

        // Reset file input field manually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }
      setMessage({ text: data.msg, type: "danger" });
    } catch (error) {
      console.log('Error while posting form\nError: ', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className='relative bg-[url(/src/assets/bg-train.jpg)] bg-no-repeat bg-left md:bg-center bg-cover min-h-screen flex justify-center bg-fixed'>
        {/* overlay black filter */}
        <div className="absolute inset-0 bg-black/20 " />

        <div className='bg-white z-10 md:px-18 max-md:px-8 md:py-6 max-md:py-3 w-full sm:5/6 md:w-4/5 lg:w-2/3 xl:w-1/2'>
          <div className="text-center">
            <h3 className="montserrat_alternates font-bold text-3xl">
              Help mumbaikar's!
            </h3>
            <h5 className="montserrat_alternates font-semibold text-xl">
              Send Missing QR Codes Anonymously!
            </h5>
          </div>

          <Link
            to="/"
            className="flex justify-start items-center gap-2 text-base max-sm:text-sm my-6 w-fit p-2 rounded-md bg-slate-200 border border-slate-300 shadow-sm cursor-pointer select-none"
          >
            <IoChevronBackCircle className=' text-xl md:text-2xl' />
            <span className="">
              Go Back
            </span>
          </Link>

          <FormBox
            inputData={inputData}
            setInputData={setInputData}
            handleSubmit={handleSubmit}
            message={message}
            setMessage={setMessage}
            isSubmitting={isSubmitting}
            fileInputRef={fileInputRef}
            showIndex={false}
          />
        </div>
      </div>
    </>
  )
}

export default PublicForm
