import { google } from "googleapis"


const client_id = process.env.GOOGLE_CLIENT_ID!;
const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
const redirect_uris = process.env.GOOGLE_REDIRECT_URI!;

export const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
);

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

export const sendEmail = async (
    to: string,
    subject: string,
    body: string,
    threadId: string,
    messageId: string
) => {
    const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        "Content-Type: text/html; charset=UTF-8",
        "MIME-Version: 1.0",
        `In-Reply-To: ${messageId}`,
        `References: ${messageId}`,
        "",
        body,
    ].join("\n");

    const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: encodedMessage,
            threadId,
        },
    });
};

export const markEmailAsRead = async (emailId: string) => {
    return gmail.users.messages.modify({
        userId: "me",
        id: emailId,
        requestBody: {
            removeLabelIds: ["UNREAD"],
        },
    });
};
