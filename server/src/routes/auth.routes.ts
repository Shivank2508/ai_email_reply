import express from "express";
import { googleAuth, googleCallback } from "../controllers/auth.controllers";

const router = express.Router()

router.get("/google", googleAuth)
router.get("/google/callback", googleCallback)

export default router