import express from "express";
import { fetchEmailById, fetchUreadEmails, refineEmailReply, sendEmailController } from "../controllers/email.controllers";

const router = express.Router()

router.get("/unread", fetchUreadEmails)
router.get("/fetch-email/:id", fetchEmailById)
router.post("/refine", refineEmailReply);
router.post("/send/:id", sendEmailController);


export default router