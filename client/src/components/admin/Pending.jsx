import React, { useEffect, useState } from 'react'
import Table from './Table'

const Pending = () => {
  const [qrcodes, setQrcodes] = useState([]);

  const fetchPendingQRCode = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/pending-qr-admin`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      setQrcodes(data.qrcodes)
    } catch (error) {
      console.log('Error while fetching pending qr codes\nError: ', error);
    }
  }

  useEffect(() => {
    fetchPendingQRCode();
  }, []);

  return (
    <>
      <h3 className="montserrat_alternates font-semibold text-3xl md:my-4 max-md:my-2 md:ml-8 max-md:ml-4">
        Pending
      </h3>
      {qrcodes.length === 0
        ? <h5 className='montserrat_alternates font-medium text-xl text-center'>
          No Pending QR Code!
        </h5>
        : <>
          <Table
            qrcodes={qrcodes}
            fetchQrCodes={fetchPendingQRCode}
          />
        </>
      }
    </>
  )
}

export default Pending
