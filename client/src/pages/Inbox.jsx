import React, { useEffect, useState } from "react";
import { fetchUnreadEmails } from "../api/emailApi";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
    const [emails, setEmails] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const loadEmails = async () => {
            setLoading(true); // Start loader

            try {
                const data = await fetchUnreadEmails();
                setEmails(data.emails || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Stop loader
            }
        };

        loadEmails();
    }, [refresh]);

    const formatTime = (date) => {
        if (!date) return "";

        const d = new Date(Number(date));
        const today = new Date();

        if (d.toDateString() === today.toDateString()) {
            return d.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
            });
        }

        return d.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF3FB]">

            {/* Header */}

            <header className="h-18 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">

                <div className="flex items-center gap-4">

                    <img
                        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
                        alt="gmail"
                        className="h-10"
                    />

                    <input
                        type="text"
                        placeholder="Search mail"
                        className="w-[500px] bg-[#EAF1FB] rounded-full px-6 py-3 outline-none text-sm"
                    />

                </div>

                <div className="flex items-center gap-4">

                    <span className="text-gray-600 text-sm">
                        shivanktyagi1506@gmail.com
                    </span>

                    <div className="w-10 h-10 rounded-full bg-[#1A73E8] text-white flex items-center justify-center font-semibold">
                        S
                    </div>

                </div>

            </header>

            <div className="flex">




                {/* Main */}

                <main className="flex-1 px-19 pt-10">

                    {/* Toolbar */}

                    <div className="bg-white border border-gray-200 border-b-0 rounded-t-xl px-6 py-5 flex items-center justify-between">

                        {/* Left */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Good Morning 👋
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {emails.length} unread {emails.length === 1 ? "email" : "emails"}
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-sm font-medium text-gray-700">
                                    Unread Emails only
                                </span>

                            </div>

                            <button
                                onClick={() => setRefresh((prev) => !prev)}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                                title="Refresh"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 4v6h6M20 20v-6h-6M20 9a8 8 0 00-14-3M4 15a8 8 0 0014 3"
                                    />
                                </svg>
                            </button>

                        </div>

                    </div>
                    {/* Email List */}

                    <div className="bg-white rounded-b-xl border border-gray-200 overflow-hidden">

                        {loading && (
                            <div className="text-center py-20 text-gray-500">
                                Loading emails...
                            </div>
                        )}

                        {!loading && emails.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                No unread emails
                            </div>
                        )}

                        {!loading &&
                            emails.map((email, index) => (
                                <div
                                    key={email.id}
                                    className="grid grid-cols-[40px_220px_minmax(0,1fr)_90px] items-center px-5 py-4 border-b border-gray-200 hover:shadow hover:bg-[#F8FAFF] cursor-pointer transition"
                                    onClick={() => navigate(`/inbox/${email.id}`)}
                                >

                                    {/* Star */}

                                    <div className="text-gray-400 text-xl">
                                        ☆
                                    </div>

                                    {/* Sender */}

                                    <div className="font-semibold text-[#202124] truncate">
                                        {email.from.split("<")[0].trim()}
                                    </div>

                                    {/* Subject */}

                                    <div className="truncate">

                                        <span className="font-semibold text-[#202124]">
                                            {email.subject || "(No Subject)"}
                                        </span>

                                        <span className="text-gray-500 ml-2">
                                            - {email.snippet}
                                        </span>

                                    </div>

                                    {/* Time */}

                                    <div className="text-right text-sm text-gray-500">
                                        {formatTime(email.internalDate)}
                                    </div>

                                </div>
                            ))}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default Inbox;