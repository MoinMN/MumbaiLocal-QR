import React, { useRef, useState } from 'react';
import FormBox from '../Form';

const AddNew = () => {
  const [inputData, setInputData] = useState({
    station_name: "",
    station_line: "unknown",
    index: "",
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
      return setMessage("All fields required!");
    }

    try {
      const formData = new FormData();
      formData.append('station_name', inputData?.station_name);
      formData.append('station_line', inputData?.station_line);
      formData.append('index', inputData?.index);
      formData.append('qr_code', inputData?.qr_code);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/post-qr-admin`, {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json" },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitting(false);
        setMessage({ text: data.msg, type: "success" });
        // reset form data
        setInputData({
          station_name: "",
          station_line: "unknown",
          index: "",
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
    <div className='text-sm sm:text-base'>
      <h3 className="montserrat_alternates font-semibold text-3xl md:my-4 max-md:my-2 md:ml-8 max-md:ml-4">
        Add New
      </h3>

      <FormBox
        inputData={inputData}
        setInputData={setInputData}
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        isSubmitting={isSubmitting}
        fileInputRef={fileInputRef}
        showIndex={true}
      />

    </div>
  )
}

export default AddNew
