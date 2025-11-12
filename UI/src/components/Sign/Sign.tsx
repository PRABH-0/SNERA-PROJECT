import React, { useState, useEffect } from "react";
import API from "../../api/api";
import SignInForm from "../Sign/SignInForm";
import RegisterForm from "../Sign/RegisterForm";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
import { useNavigate } from "react-router-dom";



interface SignProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: "signin" | "getstarted";
}

const Sign: React.FC<SignProps> = ({ isOpen, onClose, defaultTab = "signin" }) => {
    const [activeTab, setActiveTab] = useState<"signin" | "getstarted">(defaultTab);
    const [loading, setLoading] = useState(false);

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
            document.body.style.overflow = "hidden";
            setActiveTab(defaultTab);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, defaultTab]);

    const navigate = useNavigate();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "overlay") onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };
    const LoadingOverlay = () => (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-[var(--bg-primary)] z-[1000] backdrop-blur-sm text-center">
            <Lottie animationData={loadingAnimation} loop={true} className="w-40 h-40 text-" />
            <p className="text-[var(--text-primary)] text-lg  font-semibold">Please wait...</p>
        </div>
    );


    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            alert("❌ Passwords do not match!");
            setLoading(false);
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
            setTimeout(() => {
                setActiveTab("signin");
                setLoading(false);  
            }, 800);  
        } catch (err: any) {
            console.error("❌ Registration failed:", err);
            alert("❌ Registration failed. Check console for details.");
        }
        finally {
            setLoading(false); 
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
                navigate("/Home");

            }
        } catch (err: any) {
            console.error("❌ Login failed:", err);
            alert("❌ Invalid email or password!");
        }
        finally {
            setLoading(false);  
        }
    };
    if (loading) return <LoadingOverlay />;
    if (!isOpen) return null;

    return (
        <div
            id="overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 flex justify-center items-start pt-10 bg-[var(--overlay-bg)] backdrop-blur-[5px] z-50 overflow-auto"
        >
            <div className="bg-[var(--bg-primary)] p-8 rounded-xl shadow-lg w-[70vw] h-[550px] relative overflow-auto backdrop-blur-[5px] ">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl absolute top-4 right-6"
                >
                    &times;
                </button>

                <div className="flex w-full mb-4 mt-4">
                    <div className="flex w-full">
                        <button
                            onClick={() => setActiveTab("signin")}
                            className={`w-full flex justify-center text-xl font-semibold ${activeTab === "signin" ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"
                                }`}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => setActiveTab("getstarted")}
                            className={`w-full flex justify-center text-xl font-semibold ${activeTab === "getstarted" ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"
                                }`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="flex justify-center w-full m-auto mb-6">
                    <div
                        className={`h-[2px] w-1/2 transition-all duration-300 ${activeTab === "signin" ? "bg-[var(--accent-color)] translate-x-[-50%]" : "bg-[var(--accent-color)] translate-x-[50%]"
                            }`}
                    />
                </div>

                {activeTab === "signin" ? (
                    <SignInForm
                        loginData={loginData}
                        onLoginChange={handleLoginChange}
                        onLoginSubmit={handleLoginSubmit}
                        switchToRegister={() => setActiveTab("getstarted")}
                    />
                ) : (
                    <RegisterForm
                        formData={formData}
                        profileType={profileType}
                        setProfileType={setProfileType}
                        experience={experience}
                        setExperience={setExperience}
                        onRegisterSubmit={handleRegisterSubmit}
                        onChange={handleChange}
                        switchToSignin={() => setActiveTab("signin")}
                    />
                )}
            </div>
        </div>
    );
};

export default Sign;
