import { Annotation } from "@langchain/langgraph";

export const EmailState = Annotation.Root({
    emailID: Annotation<string | undefined>(),
    emailBody: Annotation<string | undefined>(),
    aiDraft: Annotation<string[]>({
        value: (_, next) => next,
        default: () => [],
    }),
    userFeedback: Annotation<string>(),
    approved: Annotation<boolean>(),
    finalReply: Annotation<string>(),
});

export type EmailStateType = typeof EmailState.State;
