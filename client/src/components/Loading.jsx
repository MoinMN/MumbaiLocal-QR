import React from 'react';
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AiOutlineLoading className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};

export default Loading;
