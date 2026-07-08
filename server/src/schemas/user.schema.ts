import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        accessToken: {
            type: String,
            required: true,
        },

        refreshToken: {
            type: String,
        },

        expiryDate: {
            type: Number,
        },

        scope: {
            type: String,
        },

        tokenType: {
            type: String,
        },

        historyId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", UserSchema);
