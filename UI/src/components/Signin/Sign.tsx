import React, { useState, useEffect } from 'react';
import API from "../../api/api";

interface SignProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'signin' | 'getstarted';
}

const Sign: React.FC<SignProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
    const [activeTab, setActiveTab] = useState<'signin' | 'getstarted'>(defaultTab);

    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const [profileType, setProfileType] = useState("student");
    const [experience, setExperience] = useState("0-1 years");
    const [formData, setFormData] = useState({
        full_Name: "",
        email: "",
        password: "",
        confirmPassword: "",
        current_Role: "",
        bio: "",
        userSkills: "",
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setActiveTab(defaultTab);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, defaultTab]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === 'overlay') onClose();
    };
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
 
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };
 
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        try {
            const payload = {
                full_Name: formData.full_Name,
                email: formData.email,
                password: formData.password,
                profile_Type: profileType,
                current_Role: formData.current_Role,
                experience,
                bio: formData.bio,
                userSkills: formData.userSkills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((s) => s.length > 0),
            };

            const res = await API.post("/Users/register", payload);
            console.log("✅ Registration success:", res.data);
 
            alert("✅ Registration successful! Please sign in to continue.");
            setActiveTab("signin"); 
        } catch (err: any) {
            console.error("❌ Registration failed:", err);
            alert("❌ Registration failed. Check console for details.");
        }
    };
 
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await API.post("/Users/login", loginData);
            console.log("✅ Login success:", res.data);

            const token =
                res.data.accessToken ||
                res.data.token ||
                res.data.jwt ||
                res.data.jwtToken ||
                res.data.data?.token;

            if (token) { 

                localStorage.setItem("token", token);
 
                API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                alert("✅ Logged in successfully!");
                onClose();  
                window.location.href = "/Home";  
            } else {
                alert("❌ Token not found in response!");
            }
        } catch (err: any) {
            console.error("❌ Login failed:", err);
            alert("❌ Invalid email or password!");
        }
    };


    if (!isOpen) return null;

    return (
        <div
            id="overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 flex justify-center items-start pt-10 bg-[var(--overlay-bg)] backdrop-blur-[5px] z-50 overflow-auto"
        >
            <div className="bg-[var(--bg-primary)] p-8 rounded-xl shadow-lg w-[70vw] h-[550px] relative overflow-auto  backdrop-blur-[5px] ">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl absolute top-4 right-6"
                >
                    &times;
                </button>
 
                <div className="flex w-full mb-4 mt-4">
                    <div className="flex w-full">
                        <button
                            onClick={() => setActiveTab('signin')}
                            className={`w-full flex justify-center text-xl font-semibold ${activeTab === 'signin'
                                ? 'text-[var(--accent-color)]'
                                : 'text-[var(--text-secondary)]'}`}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => setActiveTab('getstarted')}
                            className={`w-full flex justify-center text-xl font-semibold ${activeTab === 'getstarted'
                                ? 'text-[var(--accent-color)]'
                                : 'text-[var(--text-secondary)]'}`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
 
                <div className="flex justify-center w-full m-auto mb-6">
                    <div
                        className={`h-[2px] w-1/2 transition-all duration-300 ${activeTab === 'signin'
                            ? 'bg-[var(--accent-color)] translate-x-[-50%]'
                            : 'bg-[var(--accent-color)] translate-x-[50%]'
                            }`}
                    ></div>
                </div>
 
                {activeTab === "signin" ? (
                    <>
                        <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 text-center">
                            Welcome Back
                        </h1>

                        <form onSubmit={handleLoginSubmit}>
                            <h4 className="text-[var(--text-primary)] text-sm mt-6 font-medium">
                                Email Address
                            </h4>
                            <input
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className="border w-full p-2 rounded-lg my-1 mb-4 placeholder:text-[#9999a6] "
                                placeholder="Email"
                                type="email"
                                required
                            />

                            <h4 className="text-[var(--text-primary)] my-1 text-sm font-medium">
                                Password
                            </h4>
                            <input
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="border w-full p-2 mb-4 rounded-lg placeholder:text-[#9999a6]"
                                placeholder="Password"
                                type="password"
                                required
                            />

                            <button
                                type="submit"
                                className="text-[var(--button-text)] w-full p-3 mt-8 rounded-lg bg-[var(--accent-color)] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--shadow-color)]"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="border-t border-[var(--border-color)] mt-10">
                            <div className="text-[var(--text-secondary)] text-center">
                                Don’t have an account?{" "}
                                <button
                                    onClick={() => setActiveTab('getstarted')}
                                    className="mt-6 underline text-[var(--accent-color)] font-bold cursor-pointer"
                                >
                                    Sign up here
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div  >
                            <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] my-8 mt-0">
                                Join SNERA Community
                            </h2>

                            <form onSubmit={handleRegisterSubmit}> 
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div>
                                        <label className="block text-sm font-medium">Full Name *</label>
                                        <input
                                            type="text"
                                            name="full_Name"
                                            value={formData.full_Name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a strong password"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Confirm Password *</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                            required
                                        />
                                    </div>
                                </div>
 
                                <div>
                                    <p className="font-medium mb-2">Profile Type</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                        {[
                                            { key: "student", label: "Student/Fresher" },
                                            { key: "professional", label: "Professional" },
                                            { key: "business", label: "Business Owner" },
                                        ].map((type) => (
                                            <button
                                                type="button"
                                                key={type.key}
                                                onClick={() => setProfileType(type.key)}
                                                className={`border rounded-md py-3 font-medium ${profileType === type.key
                                                    ? "bg-black text-white"
                                                    : "bg-white text-black border-gray-300"
                                                    }`}
                                            >
                                                {type.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
 
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div>
                                        <label className="block text-sm font-medium">Current Role/Title</label>
                                        <input
                                            type="text"
                                            name="current_Role"
                                            value={formData.current_Role}
                                            onChange={handleChange}
                                            placeholder="e.g., Frontend Developer"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Experience Level</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                                                <button
                                                    key={exp}
                                                    type="button"
                                                    onClick={() => setExperience(exp)}
                                                    className={`px-4 py-2 rounded-md border ${experience === exp
                                                        ? "bg-black text-white"
                                                        : "bg-white text-black border-gray-300"
                                                        }`}
                                                >
                                                    {exp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
 
                                <div className="mb-10">
                                    <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        name="userSkills"
                                        value={formData.userSkills}
                                        onChange={handleChange}
                                        placeholder="e.g., React, Node.js, SQL"
                                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black outline-none"
                                    />
                                </div>
 
                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio/Introduction</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black outline-none"
                                    ></textarea>
                                </div>
 
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-[var(--accent-color)] text-[var(--button-text)] text-base rounded-md font-semibold mt-10 transition-all duration-300 ease-in-out hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--shadow-color)]"
                                >
                                    Create Account & Join Community
                                </button>
 
                                <div className="border-t border-[var(--border-color)] mt-10  text-center flex items-center justify-center">
                                    <p className="text-center text-sm mr-1 mt-10 text-[var(--text-secondary)]">
                                        Already have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab('signin')}
                                            className="text-[var(--accent-color)] font-bold underline cursor-pointer"
                                        >
                                            Sign in here
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sign;
