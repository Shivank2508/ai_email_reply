import { ChatGroq } from "@langchain/groq";
import { EmailSchemas } from "../schemas/email.schema";

const model = new ChatGroq({
    model: "llama-3.3-70b-versatile", // or another Groq-supported model
    apiKey: process.env.GROQ_URL,
    temperature: 0,
});

export const GenerateEmailReply = async (emailBody: string) => {
    const prompt = `
You are an expert professional email assistant.

Read the email below and generate a clear, professional, and context-aware reply.

Instructions:
- Understand the intent of the sender.
- Keep the reply concise, polite, and relevant.
- Match the tone of the original email.
- If the email asks a question, answer it properly.
- If action is required, acknowledge it clearly.
- Do not add unnecessary details.
- Do not use placeholders like [Your Name].
- Return only the email reply text.

Original Email:
${emailBody}
`;

    const structuredOutput = model.withStructuredOutput(EmailSchemas)
    const result = await structuredOutput.invoke(prompt)

    return result
}