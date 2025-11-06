import React, { useState, useEffect } from "react";
import Sign from "../Signin/Sign";
import API from "../../api/api";
interface RegisterProps {
  isOpen: boolean;          // ✅ popup open/close state
  onClose: () => void;      // ✅ close function
  onSwitch: () => void;
  defaultTab?: 'getstarted' | 'signin';

}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose, onSwitch, defaultTab = 'getstarted' }) => {
  const [activeTab, setActiveTab] = useState<'getstarted' | 'signin'>(defaultTab);

  const [profileType, setProfileType] = useState("student");
  const [experience, setExperience] = useState("0-1 years");
  const [formData, setFormData] = useState({
    full_Name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_Type: "student",
    current_Role: "",
    experience: "0-1 years",
    bio: "",
    userSkills: "", // <-- this will be comma-separated input
  });

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        experience: experience,
        bio: formData.bio,
        userSkills: formData.userSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter((s) => s.length > 0), // convert to array
      };

      const res = await API.post("/Users/register", payload);
      console.log("✅ Registration success:", res.data);
      alert("✅ Registration successful!");
      onClose();
    } catch (err: any) {
      console.error("❌ Registration failed:", err);
      alert("❌ Registration failed. Check console for details.");
    }
  };

  return (
    <div>


      {isOpen && (
        <div id="overlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-[var(--overlay-bg)] backdrop-blur-[5px] z-50 overflow-auto flex justify-center">
          <div className="bg-[var(--bg-primary)] p-8 rounded-xl shadow-lg w-[70vw] h-[550px] relative top-10 bottom-10 overflow-auto">
            <button onClick={onClose} className="cursor-pointer mt-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl relative left-220  bottom-12 ">&times;</button>
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
                className={`h-[2px] w-1/2 transition-all duration-300 ${activeTab === 'getstarted'
                  ? 'bg-[var(--accent-color)] translate-x-[-50%]'
                  : 'bg-[var(--accent-color)] translate-x-[50%]'
                  }`}
              ></div>
            </div>
            {activeTab === "getstarted" ? (
              <>
                <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] my-8 mt-0">
                  Join SNERA Community
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Name, Email, Password */}
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
                      />
                    </div>
                  </div>

                  {/* Profile Type */}
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

                  {/* Experience + Role */}
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

                  {/* userSkills */}
                  <div className="mb-10">
                    <label className="block text-sm font-medium mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="userSkills"
                      value={formData.userSkills}
                      onChange={handleChange}
                      placeholder="e.g., React, Node.js, SQL"
                      className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black outline-none"
                    />
                  </div>

                  {/* Bio */}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-[var(--accent-color)] text-[var(--button-text)]   text-base    transition-all duration-300 ease-in-out hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--shadow-color)] cursor-pointer      rounded-md font-semibold mt-10"
                  >
                    Create Account & Join Community
                  </button>
                  <div className='border-t border-[var(--border-color)] mt-10 text-center flex items-center justify-center'>
                    <p className="text-center text-sm  mr-1 text-[var(--text-secondary)]">
                      Already have an account? {' '}
                    </p>
                    <button onClick={onSwitch}
                      className="text-[var(--accent-color)] font-bold underline cursor-pointer">
                      Sign in here
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>

                <Sign
                  isOpen={isOpen}
                  onClose={onClose}
                  onSwitch={onSwitch}   // ✅ Use the prop function to switch popup
                  defaultTab='signin'
                />


              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
