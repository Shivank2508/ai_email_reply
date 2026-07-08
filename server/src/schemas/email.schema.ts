import z from "zod";

export const EmailSchemas = z.object({
    reply: z.string().describe(
        "The complete professional email reply generated for the user's received email"
    ),

    tone: z.string().describe(
        "The tone of the generated reply such as professional, friendly, formal, apologetic, or casual"
    )
})