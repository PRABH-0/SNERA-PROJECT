import React, { useState } from "react";

const Register: React.FC = () => {
    const [GetOpen, setGetOpen] = useState(false)
    const [profileType, setProfileType] = useState("student");
    const [experience, setExperience] = useState("0-1");

    return (
        <div>
            <button
                onClick={() => setGetOpen(true)}
                className="text-[#2c2c2c] btn border-[#2c2c2c] rounded h-8  bg-white"
            >
                Get Started
            </button>
            {
                GetOpen && (
                    <div className=" fixed inset-0  backdrop-blur bg-[#000c]  overflow-auto flex justify-center h-auto">
                        <div className="bg-white p-8 rounded-xl shadow-lg  w-[70vw]">
                            <h2 className="text-2xl font-bold text-center text-black  ">
                                Join Synera Community
                            </h2>

                            <form > 
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Full Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Email Address *</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Password *</label>
                                        <input
                                            type="password"
                                            placeholder="Create a strong password"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Confirm Password *</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Profile Type */}
                                <div>
                                    <p className="font-medium mb-2">Profile Type</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                                {/* Experience Level */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Current Role/Title</label>
                                        <input
                                            type="text"
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

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Primary Skills (Select up to 3)
                                    </label>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {[
                                            "Frontend Development",
                                            "Backend Development",
                                            "UI/UX Design",
                                            "Mobile Development",
                                        ].map((skill) => (
                                            <label
                                                key={skill}
                                                className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer"
                                            >
                                                <input type="checkbox" className="w-4 h-4" />
                                                <span>{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio/Introduction</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black outline-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-md font-semibold"
                                >
                                    Create Account & Join Community
                                </button>
                                <button onClick={() => GetOpen(false)} className="mt-6 text-gray-600">Close</button>

                                <p className="text-center text-sm mt-4">
                                    Already have an account?{" "}
                                    <a href="#" className="text-black font-semibold hover:underline">
                                        Sign in here
                                    </a>
                                </p>
                            </form>
                        </div>

                    </div>
                )}
        </div>
    )
}

export default Register;
