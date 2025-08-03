import express from 'express';

import {
  approvedQRCode,
  deleteQRCode,
  getQRCode,
  pendingQRCode,
  postQRCode,
  postQRCodeByAdmin,
  putApproved,
  putReject
} from '../controller/qr.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

// => /api routes
const router = express.Router();
// by line or search
router.get('/get', getQRCode);
// public post
router.post('/post', postQRCode);

router.post('/post-qr-admin', authMiddleware, postQRCodeByAdmin);
router.delete('/delete-qr-admin', authMiddleware, deleteQRCode);

router.get('/approved', approvedQRCode);
router.get('/pending-qr-admin', authMiddleware, pendingQRCode);

router.put('/put-approve', authMiddleware, putApproved);
router.put('/put-reject', authMiddleware, putReject);

export default router;