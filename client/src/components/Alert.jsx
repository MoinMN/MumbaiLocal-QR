import React, { useEffect, useState } from "react";

const Alert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <>
      {message &&
        <div
          className={`fixed top-20 right-5 px-4 py-3 rounded-lg shadow-md text-white text-sm sm:text-base transition-all duration-500 ease-in-out ${type === "danger" ? "bg-red-500" : "bg-green-500"} animate-fade`}
        >
          {message}
        </div>
      }
    </>
  );
};

export default Alert;
