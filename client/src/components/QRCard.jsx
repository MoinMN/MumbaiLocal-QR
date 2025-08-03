import React from 'react';

const QRCard = ({ qrcodes }) => {
  return (
    <>
      {qrcodes.map((qrcode, index) => (
        <div
          key={index}
          id={qrcode.station_name}
          className='border-t py-4 px-6 flex flex-col justify-between items-center gap-2'
        >
          <h3 className="text-xl montserrat_alternates font-semibold text-center">
            QR Code For{" "}
            <span className="font-bold">
              {qrcode.station_name}
            </span>
          </h3>
          <img
            src={qrcode.qr_code}
            alt={`${qrcode.station_name} QR Code`}
            className='w-96'
          />
        </div>
      ))}
    </>
  )
}

export default QRCard
