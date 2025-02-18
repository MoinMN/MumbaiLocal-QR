import cloudinary from "../config/cloudinary.js";
import QRCode from "../models/qrcode.model.js"

// post from admin,
// get approved,
// get pending from admin,
// delete from admin
export const postQRCodeByAdmin = async (req, res) => {
  try {
    const { station_name, station_line, index } = req.body;
    const qrCodeFile = req.files.qr_code;

    if (!station_name || !station_line || !index) {
      return res.status(400).json({ msg: "Station name, line & index is required!" });
    }
    if (!qrCodeFile) {
      return res.status(400).json({ msg: "QR Code Image is required!" });
    }

    const isExists = await QRCode.findOne({ station_name: station_name });
    if (isExists) return res.status(400).json({ msg: `${station_name} already exists!` });

    // Convert file buffer to base64
    const fileBase64 = qrCodeFile.data.toString("base64");
    const fileDataUri = `data:${qrCodeFile.mimetype};base64,${fileBase64}`;

    // Upload directly to Cloudinary without temp files
    const qrUploadRes = await cloudinary.uploader.upload(fileDataUri, {
      folder: "MumbaiLocal-QR",
    });

    const newQRCode = new QRCode({
      station_name: station_name.charAt(0).toUpperCase() + station_name.slice(1),
      station_line,
      qr_code: qrUploadRes.secure_url,
      is_approved: true,
      index: Number(index),
    });

    await newQRCode.save();

    return res.status(201).json({ msg: "QR Code Saved Successfully!" });
  } catch (error) {
    console.log('Error while posting qr code\nError: ', error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export const approvedQRCode = async (req, res) => {
  try {
    const qrcodes = await QRCode.find({ is_approved: true });
    res.status(200).json({ qrcodes });
  } catch (error) {
    console.log('Error while getting approved qr code\nError: ', error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export const pendingQRCode = async (req, res) => {
  try {
    const qrcodes = await QRCode.find({ is_approved: false });
    res.status(200).json({ qrcodes });
  } catch (error) {
    console.log('Error while getting pending qr code\nError: ', error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export const deleteQRCode = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ msg: "QR Code ID Required!" });

    const qrcode = await QRCode.findById(id);

    const imageUrl = qrcode.qr_code;
    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extracts public_id

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`MumbaiLocal-QR/${publicId}`);

    // Delete from DB
    await QRCode.findByIdAndDelete(id);

    res.status(200).json({ msg: "QR Code deleted successfully!" });
  } catch (error) {
    console.log('Error while deleting qr code\nError: ', error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
}

export const putApproved = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: "QR Code ID Required!" });

  const qrcode = await QRCode.findById(id);
  if (!qrcode) return res.status(400).json({ msg: "QR Code Not Found!" });
  qrcode.is_approved = true;

  await qrcode.save();
  res.status(200).json({ msg: `${qrcode.station_name} Approved!` });
}

export const putReject = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: "QR Code ID Required!" });

  const qrcode = await QRCode.findById(id);
  if (!qrcode) return res.status(400).json({ msg: "QR Code Not Found!" });
  qrcode.is_approved = false;

  await qrcode.save();
  res.status(200).json({ msg: `${qrcode.station_name} Rejected!` });
}

// by line or search
export const getQRCode = async (req, res) => {
  try {
    const { line, searchText } = req.query;
    let query = {}; // Empty query object

    if (line) query.station_line = line; // Filter by station_line

    if (searchText) query.station_name = { $regex: searchText, $options: "i" }; // Case-insensitive search

    // only approved
    query.is_approved = true;

    // Perform a single query with all filters
    const qrcodes = await QRCode.find(query).sort({ index: 1 });

    res.status(200).json({ qrcodes });
  } catch (error) {
    console.log('Error while getting qr code\nError: ', error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
}

// public post qr code
export const postQRCode = async (req, res) => {
  try {
    const { station_name, station_line } = req.body;
    const qrCodeFile = req.files.qr_code;

    if (!station_name || !station_line) {
      return res.status(400).json({ msg: "Station name, line is required!" });
    }
    if (!qrCodeFile) {
      return res.status(400).json({ msg: "QR Code Image is required!" });
    }

    // Convert file buffer to base64
    const fileBase64 = qrCodeFile.data.toString("base64");
    const fileDataUri = `data:${qrCodeFile.mimetype};base64,${fileBase64}`;

    // Upload directly to Cloudinary without temp files
    const qrUploadRes = await cloudinary.uploader.upload(fileDataUri, {
      folder: "MumbaiLocal-QR",
    });

    const newQRCode = new QRCode({
      station_name: station_name.charAt(0).toUpperCase() + station_name.slice(1),
      station_line,
      qr_code: qrUploadRes.secure_url,
      is_approved: false,
    });

    await newQRCode.save();

    return res.status(201).json({ msg: "QR Code Saved Successfully!" });
  } catch (error) {
    console.log('Error while posting qr code\nError: ', error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
}