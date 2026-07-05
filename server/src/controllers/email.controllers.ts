import { Response, Request } from "express";
import { getEmailById, getUnreadEmails } from "../service/gmail.service";


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

        const email = await getEmailById(id);
        const headers = email.payload?.headers || [];

        const subject =
            headers.find((h) => h.name === "Subject")?.value || "No Subject";

        const from =
            headers.find((h) => h.name === "From")?.value || "Unknown Sender";
        res.json({
            success: true,
            data: {
                id: email.id,
                subject,
                from,
                snippet: email.snippet,
                email
            }
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            mesaage: "Unread emails did not get"
        })

    }
} 