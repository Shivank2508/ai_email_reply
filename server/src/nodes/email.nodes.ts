import { GenerateEmailReply } from "../service/ai.service";
import { EmailState } from "../state/emial.state";

export const generateReplyNode=async(state:EmailState)=>{
    const generatedReply=await GenerateEmailReply(state.emailBody!)

    return{
        ...state,
        aiDraft:[...(state.aiDraft || []),generatedReply.reply]
    }
}


export const reverseNodeReply=async(state:EmailState)=>{
    const lastAiDraft=state.aiDraft?.[state.aiDraft?.length-1]
const revisedReply=await GenerateEmailReply(`
    Original Email:
${state.emailBody}

Previous Draft:
${lastAiDraft}

Feedback:
${state.userFeedback}
    `)

    return {
         ...state,
        aiDraft:[...(state.aiDraft || []),revisedReply.reply]
    }
}