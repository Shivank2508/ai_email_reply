import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { email } from "zod";
import { EmailSchemas } from "../schemas/email.schema";

const model=new ChatGoogleGenerativeAI({
    model:"gemini-1.5-flash",
    apiKey:process.env.GOOGLE_API_KEY
})


export const GenerateEmailReply=async(emailBody:string)=>{
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

const structuredOutput=model.withStructuredOutput(EmailSchemas)
const result=await structuredOutput.invoke(prompt)

return result
}