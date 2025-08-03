import React, { useState } from 'react'
import Alert from '../Alert';

const Table = ({ qrcodes, fetchQrCodes }) => {
  const [alert, setAlert] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/delete-qr-admin?id=${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        setAlert({ msg: data.msg, type: "danger" });
      }
      setAlert({ msg: data.msg, type: "success" });
      fetchQrCodes();
    } catch (error) {
      console.log('Error while deleting qrcode\nError: ', error);
      setAlert({ msg: 'Internal Server Error!', type: "danger" });
    }
  }

  const approve = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/put-approve?id=${id}`, {
        method: "PUT",
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        setAlert({ msg: data.msg, type: "danger" });
      }
      setAlert({ msg: data.msg, type: "success" });
      fetchQrCodes();
    } catch (error) {
      console.log('Error while approving qrcode\nError: ', error);
      setAlert({ msg: 'Internal Server Error!', type: "danger" });
    }
  }

  const reject = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/put-reject?id=${id}`, {
        method: "PUT",
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        setAlert({ msg: data.msg, type: "danger" });
      }
      setAlert({ msg: data.msg, type: "success" });
      fetchQrCodes();
    } catch (error) {
      console.log('Error while rejecting qrcode\nError: ', error);
      setAlert({ msg: 'Internal Server Error!', type: "danger" });
    }
  }

  const handleDownload = async (qrImageUrl, station_name) => {
    if (!qrImageUrl) return alert("No QR code available!");

    try {
      // Fetch the image from Cloudinary
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${station_name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR Code:", error);
    }
  };


  return (
    <>
      <div className="w-full overflow-x-auto text-sm md:text-base md:px-8 max-md:px-4 md:py-4 max-md:py-2">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-purple-400 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center border" style={{ width: "10%" }}>Sr. No.</th>
              <th className="px-4 py-2 text-center border" style={{ width: "10%" }}>Index</th>
              <th className="px-4 py-2 text-center border" style={{ width: "16%" }}>Station Name</th>
              <th className="px-4 py-2 text-center border" style={{ width: "16%" }}>Station Line</th>
              <th className="px-4 py-2 text-center border" style={{ width: "34%" }}>QR Code</th>
              <th className="px-4 py-2 text-center border" style={{ width: "14%" }}>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {qrcodes?.map((qrcode, index) => (
              <tr key={index} className="even:bg-purple-200 hover:bg-purple-300">
                <td className="px-4 py-2 text-center border">
                  {index + 1}.
                </td>
                <td className="px-4 py-2 text-center border">
                  {qrcode.index}
                </td>
                <td className="px-4 py-2 text-center border">
                  {qrcode.station_name}
                </td>
                <td className="px-4 py-2 text-center border">
                  {qrcode.station_line}
                </td>
                <td className="px-4 py-2 text-center border">
                  <img
                    src={qrcode.qr_code}
                    alt={`QR Code ${qrcode.station_line}`}
                    className="w-64 mx-auto"
                  />
                </td>
                <td className="px-4 py-2 text-center border">
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    <button
                      onClick={() => handleDownload(qrcode.qr_code, qrcode.station_name)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer border border-blue-700 focus:outline focus:outline-blue-700"
                    >
                      Download QR
                    </button>
                    {qrcode?.is_approved
                      ? <button
                        onClick={() => reject(qrcode._id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 cursor-pointer border border-yellow-600 focus:outline focus:outline-yellow-600"
                      >
                        Reject
                      </button>
                      : <button
                        onClick={() => approve(qrcode._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer border border-green-600 focus:outline focus:outline-green-600"
                      >
                        Approve
                      </button>
                    }
                    <button
                      onClick={() => handleDelete(qrcode._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer border border-red-600 focus:outline focus:outline-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <Alert
        message={alert?.msg}
        type={alert?.type}
        onClose={() => setAlert(null)}
      />
    </>
  )
}

export default Table
