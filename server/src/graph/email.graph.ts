import { END, START, StateGraph } from "@langchain/langgraph";

import { generateReplyNode, reverseNodeReply, sendEmailNode } from "../nodes/email.nodes";
import { EmailState } from "../state/email.state";


const graph = new StateGraph(EmailState)
    .addNode("generateReply", generateReplyNode)
    .addNode("reverseReply", reverseNodeReply)
    .addNode("sendEmail", sendEmailNode)
    .addEdge(START, "generateReply")

    .addConditionalEdges("generateReply", (state) => {
        if (state.userFeedback) {
            return "reverseReply"
        }

        if (state.approved) {
            return "sendEmail"
        }

        return END
    })

    .addConditionalEdges("reverseReply", (state) => {
        if (state.approved) {
            return "sendEmail"
        }

        return END
    })

    .addEdge("sendEmail", END)

export const emailGraph = graph.compile()



