import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmailById, RefineAiDraft, sendEmail } from "../api/emailApi";

export function Email() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [draft, setDraft] = useState("");
    const [feedback, setFeedback] = useState("");
    const { emailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!emailId) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        async function fetchData() {
            setLoading(true);
            try {
                const res = await getEmailById(emailId);
                if (!cancelled && res) setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchData();
        return () => {
            cancelled = true;
        };
    }, [emailId]);

    // derive some display values from the static `data` object
    const fromHeader = data.from || "";
    const fromMatch = fromHeader.match(/^(.*)\s+<(.+)>$/);
    const senderName = fromMatch ? fromMatch[1] : fromHeader;
    const senderEmail = fromMatch ? fromMatch[2] : "";
    const avatarInitial = senderName ? senderName.trim().charAt(0).toUpperCase() : "?";
    const emailBodyText = (data.aiResult && data.aiResult.emailBody) || data.snippet || "";

    const aiDraftValue = data.aiResult && data.aiResult.aiDraft;
    const aiDraft = Array.isArray(aiDraftValue)
        ? aiDraftValue.flat(Infinity).join("\n")
        : typeof aiDraftValue === "string"
            ? aiDraftValue
            : "";

    useEffect(() => {
        setDraft(aiDraft);
    }, [aiDraft]);

    const handleRefine = async () => {
        if (!draft.trim()) return;
        setSubmitting(true);
        try {
            const payload = {
                emailID: emailId,
                emailBody: emailBodyText,
                aiDraft: draft,
                userFeedback: feedback,
            };
            const res = await RefineAiDraft(payload);
            setData((prevData) => ({
                ...prevData,
                aiResult: {
                    ...prevData.aiResult,
                    aiDraft: res.data.aiDraft[res.data.aiDraft.length - 1],
                },
            }));
        } catch (err) {
            console.error("Refine failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSendReply = async () => {
        if (!draft.trim()) return;
        setSending(true);
        try {
            const res = await sendEmail(emailId, draft);
            console.log("Send response:", res);
            setSent(true);
            setTimeout(() => {
                navigate("/inbox");
            }, 1200);
        } catch (err) {
            console.error("Send failed:", err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#f6f8fc",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            {/* Header */}
            <div
                style={{
                    height: 64,
                    background: "#fff",
                    borderBottom: "1px solid #dadce0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 24px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <button
                        style={{
                            border: "none",
                            background: "#f1f3f4",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                        onClick={() => navigate(-1)}
                    >
                        ←
                    </button>

                    <div>
                        <h3 style={{ margin: 0 }}>Inbox</h3>
                        <small style={{ color: "#666" }}>
                            AI Reply Assistant
                        </small>
                    </div>
                </div>

                <span
                    style={{
                        background: "#fff3cd",
                        color: "#8a6d3b",
                        padding: "6px 14px",
                        borderRadius: 20,
                        fontWeight: 600,
                        fontSize: 13,
                    }}
                >
                    Draft Mode
                </span>
            </div>

            {/* Body */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    overflow: "hidden",
                    padding: 20,
                    gap: 20,
                }}
            >
                {loading ? (
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #f8fbff 0%, #f3f7ff 100%)",
                            borderRadius: 16,
                            border: "1px solid #e6edf8",
                            padding: 24,
                        }}
                    >
                        <div style={{ textAlign: "center", maxWidth: 420 }}>
                            <div
                                style={{
                                    width: 62,
                                    height: 62,
                                    borderRadius: "50%",
                                    border: "4px solid #e8f0fe",
                                    borderTopColor: "#1a73e8",
                                    margin: "0 auto 18px",
                                    animation: "spin 1s linear infinite",
                                }}
                            />
                            <div style={{ fontSize: 22, fontWeight: 700, color: "#202124", marginBottom: 8 }}>
                                Preparing your inbox view
                            </div>
                            <div style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.6 }}>
                                We are loading the message content and AI draft so you can continue smoothly.
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Email Section */}
                        <div
                            style={{
                                flex: 2,
                                background: "#fff",
                                borderRadius: 12,
                                border: "1px solid #dadce0",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            {/* Mail Header */}
                            <div
                                style={{
                                    padding: "24px 30px",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <h2
                                    style={{
                                        margin: 0,
                                        fontSize: 30,
                                        fontWeight: 600,
                                        color: "#202124",
                                    }}
                                >
                                    {data.subject}
                                </h2>

                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: 20,
                                        gap: 15,
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: "50%",
                                            background: "#246bc8",
                                            color: "#fff",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontWeight: 600,
                                            fontSize: 18,
                                        }}
                                    >
                                        {avatarInitial}
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 16,
                                            }}
                                        >
                                            {senderName}
                                        </div>

                                        <div
                                            style={{
                                                color: "#666",
                                                fontSize: 14,
                                            }}
                                        >
                                            {senderEmail}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Body */}
                            <div
                                style={{
                                    padding: 30,
                                    overflowY: "auto",
                                    lineHeight: 1.9,
                                    fontSize: 17,
                                    color: "#333",
                                }}
                            >
                                {emailBodyText.split(/\n\n|\r\n\r\n|\n/).map((para, idx) => (
                                    para.trim() ? <p key={idx}>{para.trim()}</p> : null
                                ))}
                            </div>
                        </div>

                        {/* AI Section */}
                        <div
                            style={{
                                width: 620,
                                display: "flex",
                                flexDirection: "column",
                                background: "#fff",
                                borderRadius: 12,
                                border: "1px solid #dadce0",
                                overflow: "hidden",
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    padding: 20,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <div>
                                    <h4 style={{ margin: 0 }}>✨ AI Draft</h4>
                                    <small style={{ color: "#666" }}>
                                        Smart email response
                                    </small>
                                </div>
                            </div>

                            {/* Draft */}
                            <textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                disabled={loading || submitting}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    resize: "none",
                                    outline: "none",
                                    padding: 24,
                                    fontSize: 16,
                                    lineHeight: 1.8,
                                    background: loading || submitting ? "#fafafa" : "#fff",
                                    color: loading || submitting ? "#888" : "#202124",
                                }}
                            />

                            {/* Bottom */}
                            <div
                                style={{
                                    borderTop: "1px solid #eee",
                                    padding: 20,
                                    background: "#fafafa",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: 12,
                                    }}
                                >
                                    ✨ Refine Draft
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                    }}
                                >
                                    <input
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Example: Make it more professional..."
                                        disabled={loading || submitting}
                                        style={{
                                            flex: 1,
                                            border: "1px solid #dadce0",
                                            borderRadius: 8,
                                            padding: "9px 9px",
                                            outline: "none",
                                            fontSize: 15,
                                            background: loading || submitting ? "#f5f5f5" : "#fff",
                                        }}
                                    />

                                    <button
                                        onClick={handleRefine}
                                        disabled={loading || submitting || sending}
                                        style={{
                                            background: submitting ? "#6b9de5" : "#1a73e8",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: 8,
                                            padding: "9px 12px",
                                            cursor: loading || submitting || sending ? "not-allowed" : "pointer",
                                            fontWeight: 400,
                                            minWidth: 92,
                                        }}
                                    >
                                        {submitting ? "Refining..." : "Refine"}
                                    </button>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "end",
                                        marginTop: 20,
                                    }}
                                >
                                    <button
                                        onClick={handleSendReply}
                                        disabled={loading || submitting || sending || !draft.trim()}
                                        style={{
                                            background: sending ? "#6b9de5" : "#1a73e8",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: 8,
                                            padding: "10px 24px",
                                            fontWeight: 600,
                                            cursor: loading || submitting || sending || !draft.trim() ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        {sending ? "Sending..." : "Send Reply"}
                                    </button>
                                    {sent && (
                                        <span
                                            style={{
                                                marginLeft: 16,
                                                alignSelf: "center",
                                                padding: "10px 14px",
                                                borderRadius: 8,
                                                background: "#e6f4ea",
                                                color: "#1d4f2f",
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            Sent! Redirecting to inbox...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}