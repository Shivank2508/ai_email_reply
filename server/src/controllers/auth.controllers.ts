import { Request, Response } from "express";
import { oauth2Client } from "../service/gmail.service";

export const googleAuth = async (req: Request, res: Response) => {
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
        const code = req.query.code as string
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)
        console.log(tokens)
        res.json({
            success: true,
            message: "Gmail connected successfully",
            tokens,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Authentication failed"
        })
    }
}