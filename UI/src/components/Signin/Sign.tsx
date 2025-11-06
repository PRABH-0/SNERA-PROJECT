import React, { useState, useEffect } from 'react';
import Register from '../Register/Register';


interface SignProps {
    onSwitch: () => void;
    isOpen: boolean;          // ✅ popup open/close state
    onClose: () => void;
    defaultTab?: 'signin' | 'getstarted';
}

const Sign: React.FC<SignProps> = ({ isOpen, onClose, onSwitch, defaultTab = 'signin' }) => {
    const [activeTab, setActiveTab] = useState<'signin' | 'getstarted'>(defaultTab);

    // 🧠 Disable body scroll when modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setActiveTab(defaultTab);
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, defaultTab]);

    // 🖱️ Close when clicked outside popup
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === 'overlay') {
            onClose();
        }
    };




    return (
        <div>


            {isOpen && (
                // Overlay that covers full screen
                <div
                    id="overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex justify-center items-center bg-[var(--overlay-bg)] backdrop-blur-[5px] z-50"
                >
                    <div className="bg-[var(--bg-primary)] p-6 rounded-xl w-[70vw] h-130 shadow-sm relative">
                        <button
                            onClick={onClose}
                            className="cursor-pointer mt-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl absolute top-4 right-6"
                        >
                            &times;
                        </button>
                        {/* 🔹 Tabs Section */}
                        <div className="flex  w-full mb-4 mt-4">
                            <div className="flex w-full  ">
                                <button
                                    onClick={() => setActiveTab('signin')}
                                    className={`w-full flex justify-center text-xl font-semibold ${activeTab === 'signin'
                                        ? 'text-[var(--accent-color)]'
                                        : 'text-[var(--text-secondary)]'
                                        }`}
                                >
                                    Sign In
                                </button>

                                <button
                                    onClick={() => setActiveTab('getstarted')}
                                    className={`w-full flex justify-center text-xl font-semibold ${activeTab === 'getstarted'
                                        ? 'text-[var(--accent-color)]'
                                        : 'text-[var(--text-secondary)]'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* 🔹 Underline */}
                        <div className="flex justify-center w-full m-auto mb-6">
                            <div
                                className={`h-[2px] w-1/2 transition-all duration-300 ${activeTab === 'signin'
                                    ? 'bg-[var(--accent-color)] translate-x-[-50%]'
                                    : 'bg-[var(--accent-color)] translate-x-[50%]'
                                    }`}
                            ></div>
                        </div>

                        {/* 👇 Replace here */}
                        {activeTab === "signin" ? (
                            <>
                                <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 text-center">
                                    Welcome Back
                                </h1>

                                <h4 className="text-[var(--text-primary)] text-sm mt-6 font-medium">
                                    Email Address
                                </h4>
                                <input
                                    className="border w-full p-2 rounded-lg my-1 mb-4 placeholder:text-[#9999a6]"
                                    placeholder="Email"
                                />

                                <h4 className="text-[var(--text-primary)] my-1 text-sm font-medium">
                                    Password
                                </h4>
                                <input
                                    className="border w-full p-2 mb-4 rounded-lg placeholder:text-[#9999a6]"
                                    placeholder="Password"
                                    type="password"
                                />

                                <button className="text-[var(--button-text)] w-full p-2 mt-8 rounded-lg bg-[var(--accent-color)] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--shadow-color)]">
                                    Sign In
                                </button>

                                <div className="border-t border-[var(--border-color)] mt-10">
                                    <div className="text-[var(--text-secondary)] text-center">
                                        Don't have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab("getstarted")}
                                            className="mt-6 underline text-[var(--accent-color)] font-bold cursor-pointer"
                                        >
                                            Sign up here
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (

                            <>
                                <Register
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    onSwitch={() => setActiveTab('signin')}
                                />

                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default Sign;
