import React, { useState } from "react";
import {
    FaGoogle,
    FaEnvelope,
    FaShieldAlt,
    FaRobot,
    FaArrowRight,
} from "react-icons/fa";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        setLoading(true);
        window.location.href = "http://localhost:8000/auth/google";
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-6 py-6">

            <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl border border-gray-200 overflow-hidden grid lg:grid-cols-2">

                {/* LEFT */}

                <div className="hidden lg:flex flex-col  bg-white p-10">
                    <div>
                        <div className="flex items-center gap-3">

                            <img
                                src="https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png"
                                alt=""
                                className="w-12 h-12"
                            />

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Gmail AI
                                </h2>

                                <p className="text-gray-500">
                                    Smart Email Assistant
                                </p>

                            </div>

                        </div>

                        <h1 className="mt-10 text-5xl font-semibold text-gray-900 leading-tight">

                            Write better emails
                            <br />

                            with
                            <span className="text-[#1a73e8]">
                                {" "}AI
                            </span>

                        </h1>

                        <p className="mt-8 text-lg text-gray-600 leading-8">

                            Connect your Gmail account and let AI help you
                            summarize emails, generate replies, and organize
                            your inbox faster than ever.

                        </p>

                    </div>

                    <div className="space-y-5 mt-14">

                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8f9fa]">

                            <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center">

                                <FaEnvelope className="text-[#1a73e8]" />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    Read Unread Emails

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    Securely access unread Gmail messages.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8f9fa]">

                            <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center">

                                <FaRobot className="text-[#1a73e8]" />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    AI Reply Generator

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    Personalized replies based on email context.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8f9fa]">

                            <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center">

                                <FaShieldAlt className="text-[#1a73e8]" />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    Google OAuth Security

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    We never ask for your Gmail password.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <div className="flex justify-center lg:hidden mb-8">
                            <img
                                src="https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_96dp.png"
                                alt=""
                                className="w-20"
                            />
                        </div>
                        <img
                            src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                            alt=""
                            className="h-10 mb-8"
                        />

                        <h2 className="text-4xl font-semibold text-gray-900">

                            Sign in

                        </h2>

                        <p className="mt-3 text-gray-600 text-lg">

                            Continue with your Google Account to access
                            AI-powered Gmail assistance.

                        </p>

                        <button
                            disabled={loading}
                            onClick={handleGoogleLogin}
                            className="mt-10 w-full h-14 rounded-full border border-gray-300 hover:border-[#1a73e8] hover:bg-[#f6fafe] transition flex items-center justify-center gap-3 text-gray-800 font-medium cursor-pointer"
                        >

                            {loading ? (
                                <>

                                    <span className="w-5 h-5 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin"></span>

                                    Connecting...

                                </>
                            ) : (
                                <>

                                    <FaGoogle className="text-[#4285F4]" />

                                    Continue with Google

                                </>
                            )}

                        </button>

                        <div className="mt-12 rounded-3xl border border-gray-200 p-6">

                            <h3 className="font-semibold text-lg">

                                What you'll get

                            </h3>

                            <div className="mt-5 space-y-4 text-gray-600">

                                <div className="flex gap-3">

                                    ✅ AI-generated professional replies

                                </div>

                                <div className="flex gap-3">

                                    ✅ One-click reply suggestions

                                </div>

                                <div className="flex gap-3">

                                    ✅ Email summaries

                                </div>

                                <div className="flex gap-3">

                                    ✅ Smart inbox organization

                                </div>

                                <div className="flex gap-3">

                                    ✅ Secure Google authentication

                                </div>

                            </div>

                        </div>



                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;