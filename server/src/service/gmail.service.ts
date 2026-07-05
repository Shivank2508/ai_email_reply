import { google } from "googleapis"
import credentials from "../config/credentials.json"


const { client_id, client_secret, redirect_uris } = credentials.web

export const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
)

export const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client
})

export const getUnreadEmails = async () => {
    console.log("testing purpose")

    const res = await gmail.users.messages.list({
        userId: "me",
        q: "is:unread category:primary"
    })

    const messages = res.data.messages || []

    const emails = await Promise.all(
        messages.map(async (msg) => {
            const message = await gmail.users.messages.get({
                userId: "me",
                id: msg.id!,
            })

            const headers = message.data.payload?.headers || []

            const subject = headers.find(
                (header) => header.name === "Subject"
            )?.value

            const from = headers.find(
                (header) => header.name === "From"
            )?.value

            return {
                id: msg.id,
                threadId: msg.threadId,
                subject,
                from,
                snippet: message.data.snippet
            }
        })
    )

    return emails
}


export const getEmailById = async (id: string) => {
    const res = await gmail.users.messages.get({
        userId: "me",
        id
    })

    return res.data
}