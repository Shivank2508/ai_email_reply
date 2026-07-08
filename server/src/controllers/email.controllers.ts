import { Response, Request } from "express";
import { getEmailById, getUnreadEmails, markEmailAsRead, sendEmail } from "../service/gmail.service";
import { emailGraph } from "../graph/email.graph";


export const fetchUreadEmails = async (req: Request, res: Response) => {
    try {
        const emails = await getUnreadEmails()
        res.json({
            success: true,
            emails
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            mesaage: "Unread emails did not get"
        })
    }
}

export const fetchEmailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emailID = Array.isArray(id) ? id[0] : id;
        const email = await getEmailById(emailID);
        const headers = email.payload?.headers || [];

        const subject =
            headers.find((h) => h.name === "Subject")?.value || "No Subject";

        const from =
            headers.find((h) => h.name === "From")?.value || "Unknown Sender";

        const aiResult = await emailGraph.invoke({
            emailID: emailID,
            emailBody: Array.isArray(email.snippet)
                ? email.snippet.join("\n")
                : (email.snippet ?? ""),
            aiDraft: [],
            userFeedback: "",
            approved: false,
            finalReply: "",
        });
        res.json({
            success: true,
            data: {
                id: email.id,
                subject,
                from,
                snippet: email.snippet,
                email,
                aiResult
            }
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            mesaage: "Unread emails did not get"
        })

    }
}

export const refineEmailReply = async (req: Request, res: Response) => {
    try {
        const {
            emailID,
            emailBody,
            aiDraft,
            userFeedback
        } = req.body;

        const result = await emailGraph.invoke({
            emailID,
            emailBody,
            aiDraft,
            userFeedback,
            approved: false,
            finalReply: "",
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to refine email reply.",
        });
    }
};

export const sendEmailController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { body } = req.body;

        const email = await getEmailById(id);
        const headers = email.payload?.headers || [];

        const subject =
            headers.find((h) => h.name === "Subject")?.value || "";

        const from =
            headers.find((h) => h.name === "From")?.value || "";

        const messageId =
            headers.find((h) => h.name === "Message-ID")?.value || "";

        const threadId = email.threadId!;

        const to = from.match(/<(.+?)>/)?.[1] || from;

        const result = await sendEmail(
            to,
            subject.startsWith("Re:")
                ? subject
                : `Re: ${subject}`,
            body,
            threadId,
            messageId
        );

        // Mark the original email as read
        await markEmailAsRead(id);

        res.json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable to send email",
        });
    }
};