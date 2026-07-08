import { Request, Response } from "express";
import { gmail, oauth2Client } from "../service/gmail.service";
import { User } from "../schemas/user.schema";

export const googleAuth = async (req: Request, res: Response) => {
    console.log("googleAuth")
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.send",
            "https://www.googleapis.com/auth/gmail.modify",
        ]
    })

    res.redirect(url)
}


export const googleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const profile = await gmail.users.getProfile({
            userId: "me",
        });

        const email = profile.data.emailAddress;

        await User.findOneAndUpdate(
            { email },
            {
                email,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiryDate: tokens.expiry_date,
                scope: tokens.scope,
                tokenType: tokens.token_type,
                historyId: profile.data.historyId,
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.redirect("https://dazzling-cobbler-99aa5b.netlify.app/inbox");

    } catch (err) {
        console.error(err);
        res.status(500).send("Authentication failed");
    }
};
