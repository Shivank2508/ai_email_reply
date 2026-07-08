import { GenerateEmailReply } from "../service/ai.service";
import { EmailStateType } from "../state/email.state";

export const generateReplyNode = async (state: EmailStateType) => {
    const generatedReply = await GenerateEmailReply(state.emailBody!)

    return {
        ...state,
        aiDraft: [...(state.aiDraft || []), generatedReply.reply]
    }
}


export const reverseNodeReply = async (state: EmailStateType) => {
    const lastAiDraft = state.aiDraft?.[state.aiDraft?.length - 1]
    const revisedReply = await GenerateEmailReply(`
    Original Email:
${state.emailBody}

Previous Draft:
${lastAiDraft}

Feedback:
${state.userFeedback}
    `)

    return {
        ...state,
        aiDraft: [...(state.aiDraft || []), revisedReply.reply]
    }
}

export const sendEmailNode = async (state: EmailStateType) => {
    console.log("Sending:", state.finalReply)

    return state
}