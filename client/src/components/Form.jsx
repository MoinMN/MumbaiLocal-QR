import React from 'react'
import { RxCross2 } from "react-icons/rx";

const FormBox = ({ inputData, setInputData, handleSubmit, message, setMessage, isSubmitting, fileInputRef, showIndex }) => {
  const handleDataChange = (e) => {
    // retrive data
    const { name, value, files } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Store file object instead of string if present
    }));

    // ensure no msg
    setMessage({ text: "", type: "" });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto w-5/6 md:w-1/2 px-6 py-2"
      >
        <div className="flex flex-col">
          <label htmlFor="station_name">Station Name: </label>
          <input
            type="text"
            name="station_name"
            id="station_name"
            value={inputData?.station_name}
            onChange={handleDataChange}
            className='border border-dashed focus:border-none md:px-4 max-md:px-2 md:py-2 max-md:py-1 transition-all duration-300 ease-in-out focus:rounded-xl focus:outline focus:outline-purple-500'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="station_line">Station Line: </label>
          <select
            name="station_line"
            id="station_line"
            onChange={handleDataChange}
            value={inputData?.station_line}
            className='cursor-pointer border border-dashed focus:border-none md:px-4 max-md:px-2 md:py-2 max-md:py-1 transition-all duration-300 ease-in-out focus:rounded-xl focus:outline focus:outline-purple-500'
          >
            <option
              value='Unknown'
              className='text-black'
            >
              Don't Know
            </option>
            <option
              value="Harbour"
              className='text-black'
            >
              Harbour
            </option>
            <option
              value="Central"
              className='text-black'
            >
              Central
            </option>
            <option
              value="Western"
              className='text-black'
            >
              Western
            </option>
          </select>
        </div>
        {showIndex &&
          <div className="flex flex-col">
            <label htmlFor="index">Station Index: </label>
            <input
              type="number"
              name="index"
              id="index"
              value={inputData?.index}
              onChange={handleDataChange}
              className='border border-dashed focus:border-none md:px-4 max-md:px-2 md:py-2 max-md:py-1 transition-all duration-300 ease-in-out focus:rounded-xl focus:outline focus:outline-purple-500'
            />
          </div>
        }
        <div className="flex flex-col">
          <label htmlFor="qr_code">Upload QR Code: </label>
          <input
            type="file"
            name="qr_code"
            id="qr_code"
            ref={fileInputRef}    // for reseting purpose
            onChange={handleDataChange}
            className='cursor-pointer border border-dashed focus:border-none md:px-4 max-md:px-2 md:py-2 max-md:py-1 transition-all duration-300 ease-in-out focus:rounded-xl focus:outline focus:outline-purple-500'
          />
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`bg-purple-500 px-6 py-2 text-white border border-purple-700 focus:outline-dashed focus:outline-purple-700 focus:rounded-xl hover:rounded-xl transition-all duration-200 ease-in-out w-fit ${isSubmitting ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {message.text && (
          <div className={`border px-4 py-2 flex justify-between items-center ${message.type === 'success' ? "border-green-500 bg-green-300" : "border-red-500 bg-red-300"}`}>
            <span className="text-xs sm:text-sm">
              {message.text}
            </span>
            <span className="text-2xl cursor-pointer" onClick={() => setMessage({ text: '', type: "" })}>
              <RxCross2 />
            </span>
          </div>
        )}
      </form>
    </>
  )
}

export default FormBox
