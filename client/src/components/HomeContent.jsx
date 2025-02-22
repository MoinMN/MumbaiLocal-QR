import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import TableContent from './TableContent';
import QRCard from './QRCard';
import Loading from './Loading';

const HomeContent = () => {
  // track input radio
  const [selectedLine, setSelectedLine] = useState('Harbour');
  const [qrcodes, setQrcodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQRCodes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/get?line=${selectedLine}`, { method: "GET" });
      const data = await response.json();
      if (response.ok) setQrcodes(data.qrcodes);
    } catch (error) {
      console.log('Error while fetching qr codes\nError: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (e, searchText) => {
    if (e) e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/get?searchText=${searchText}`, { method: "GET" });
      const data = await response.json();
      if (response.ok) setQrcodes(data.qrcodes);
    } catch (error) {
      console.log('Error while searching qr codes\nError: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchQRCodes();
  }, [selectedLine, setSelectedLine]);

  return (
    <div className="bg-white z-10 md:px-18 max-md:px-8 md:py-6 max-md:py-3 w-full sm:5/6 md:w-4/5 lg:w-2/3 xl:w-1/2">
      <h3 className="montserrat_alternates font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-t from-yellow-300 to-purple-400 text-center">
        UTS QR Codes of Mumbai Locals
      </h3>

      {/* searchbar and button */}
      <form
        onSubmit={(e) => handleSearch(e, e.currentTarget.searchbar.value)}
        className="flex justify-center items-center gap-2 md:gap-6 my-8 text-base max-sm:text-sm"
      >
        <input
          type="text"
          name="searchbar"
          className='border-2 border-gray-500 focus:outline-1 focus:rounded-xl outline-amber-500 w-full md:px-8 max-md:px-4 md:py-2 max-md:py-1 transition-all duration-300 ease-in-out shadow-md'
          placeholder='Search Station Name...'
        />
        <button
          type="submit"
          className="border-2 md:px-8 max-md:px-4 md:py-2 max-md:py-1 cursor-pointer flex justify-between items-center gap-2 bg-amber-600 text-white border-black hover:rounded-xl transition-all duration-300 ease-in-out shadow-md"
        >
          <FaSearch size={20} />
          <span className="max-sm:hidden">
            Search
          </span>
        </button>
      </form>

      <TableContent
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
        fetchQRCodes={handleSearch}
      />

      {isLoading
        ?
        <div className="flex justify-center">
          <Loading />
        </div>
        : qrcodes.length === 0
          ?
          <h3 className="montserrat_alternates font-semibold text-center text-xl md:text-3xl">
            Not Found!
          </h3>
          :
          <QRCard
            qrcodes={qrcodes}
          />
      }
    </div>
  )
}

export default HomeContent
