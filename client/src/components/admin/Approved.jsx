import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Table from './Table'

const Approved = () => {
  const [searchText, setSearchText] = useState('');
  const [line, setLine] = useState('All');
  const [qrcodes, setQrcodes] = useState([]);
  const [filterQrcodes, setFilterQrcodes] = useState([]);

  const fetchApprovedQRCode = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/approved`, { method: "GET" });
      const data = await response.json();
      setQrcodes(data.qrcodes);
      setFilterQrcodes(data.qrcodes);
    } catch (error) {
      console.log('Error while fetching approved qr codes\nError: ', error);
    }
  }

  useEffect(() => {
    const applyFilterQrcodes = qrcodes.filter(qrcode => {
      return (
        (!searchText || qrcode.station_name.toLowerCase().includes(searchText.toLowerCase())) &&
        (line === 'All' || !line || qrcode.station_line === line)
      )
    });
    setFilterQrcodes(applyFilterQrcodes);
  }, [searchText, setSearchText, line, setLine]);

  useEffect(() => {
    fetchApprovedQRCode();
  }, []);


  return (
    <>
      <h3 className="montserrat_alternates font-semibold text-3xl md:my-4 max-md:my-2 md:ml-8 max-md:ml-4">
        Approved
      </h3>

      <Searchbar
        searchText={searchText}
        setSearchText={setSearchText}
        line={line}
        setLine={setLine}
      />
      <Table
        qrcodes={filterQrcodes}
        fetchQrCodes={fetchApprovedQRCode}
      />
    </>
  )
}

export default Approved
