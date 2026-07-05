import express from "express";
import { fetchEmailById, fetchUreadEmails } from "../controllers/email.controllers";

const router = express.Router()

router.get("/unread", fetchUreadEmails)
router.get("/fetch-email/:id", fetchEmailById)


export default router