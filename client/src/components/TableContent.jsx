import React, { useState } from 'react';
import { FaArrowCircleDown } from "react-icons/fa";
import { stations } from "../utility/stations";
import { AnimatePresence, motion } from "motion/react";

const TableContent = ({ selectedLine, setSelectedLine, fetchQRCodes }) => {
  // for table of content 
  const [showTableContent, setShowTableContent] = useState(true);
  // input radio options
  const inputRadioLine = ['Harbour', 'Central', 'Western'];

  return (
    <div className='text-sm max-sm:text-xs bg-gray-100 sm:w-2/3 md:w-3/4 mx-auto px-6 py-4 border border-gray-400 shadow-md mb-8 select-none'>

      {/* header  */}
      <div className="flex justify-between items-center">
        <h3 className='text-lg font-medium'>
          Table of Contents
        </h3>
        <FaArrowCircleDown
          size={25}
          className={`cursor-pointer ${showTableContent ? '' : "rotate-90"} transition-all duration-300 ease-in-out`}
          onClick={() => setShowTableContent((prev) => !prev)}
        />
      </div>

      <AnimatePresence>
        {showTableContent &&
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <hr className='my-2 border border-gray-400' />
            {/* input radio */}
            <div className="flex gap-1 md:gap-4 justify-between max-sm:flex-col flex-wrap max-sm:ml-6">
              {inputRadioLine.map((line, index) => (
                <div className="flex gap-2" key={index}>
                  <input
                    type="radio"
                    name="railway_line"
                    value={line}
                    id={line}
                    className='cursor-pointer'
                    checked={selectedLine === line}
                    onChange={(e) => setSelectedLine(e.target.value)}
                  />
                  <label
                    htmlFor={line}
                    className='cursor-pointer'
                  >
                    {line} Line
                  </label>
                </div>
              ))}
            </div>

            <hr className='my-2 border border-gray-400' />

            {/* content  */}
            <ol className="grid grid-cols-2 pl-8 mx-auto">
              {(stations.filter(station => selectedLine === station.line)).map((station, index) => (
                <li
                  key={index}
                  onClick={(e) => fetchQRCodes(null, station.name)}
                  className="list-decimal cursor-pointer hover:text-blue-500 hover:underline transition-colors duration-200 ease-in-out"
                >
                  {station.name}
                </li>
              ))}
            </ol>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default TableContent
