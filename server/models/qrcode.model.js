import mongoose from "mongoose";

const QRCodeScheme = new mongoose.Schema({
  station_name: {
    type: String,
    required: true,
  },
  qr_code: {
    type: String,
    required: true,
  },
  station_line: {
    type: String,
    enum: ['Harbour', 'Central', 'Western', 'Unknown'],
    required: true,
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number
  }
});

const QRCode = mongoose.model("QRCode", QRCodeScheme);
export default QRCode;