import { User } from "./schemas/user.schema";
import { oauth2Client } from "./service/gmail.service";

export const setUserTokens = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Google account not connected");
    }

    oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
        expiry_date: user.expiryDate,
    });
};