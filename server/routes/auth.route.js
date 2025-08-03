import express from "express";

// auth router
const router = express.Router();

// all import here
import { loginAuth, checkAuth, logoutAuth } from "../controller/auth.controller.js";

router.post('/login', loginAuth);
router.get('/check-auth', checkAuth);
router.post('/logout', logoutAuth);

export default router;