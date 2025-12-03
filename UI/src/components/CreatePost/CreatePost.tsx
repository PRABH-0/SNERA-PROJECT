import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import MiniLoader from "../Loader/MiniLoader";

const CreatePost: React.FC = () => {
  const [form, setForm] = useState({
    post_Type: "",
    title: "",
    description: "",
    budget: "",
    timeline: "",
    teamSize: "",
    experienceLevel: "",
  });

  const [skillsHave, setSkillsHave] = useState<string[]>([]);
  const [skillsNeed, setSkillsNeed] = useState<string[]>([]);
  const [skillHaveInput, setSkillHaveInput] = useState("");
  const [skillNeedInput, setSkillNeedInput] = useState("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch { }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const addSkillHave = () => {
    if (skillHaveInput.trim() !== "") {
      setSkillsHave([...skillsHave, skillHaveInput.trim()]);
      setSkillHaveInput("");
    }
  };

  const addSkillNeed = () => {
    if (skillNeedInput.trim() !== "") {
      setSkillsNeed([...skillsNeed, skillNeedInput.trim()]);
      setSkillNeedInput("");
    }
  };

  const removeSkillHave = (index: number) => {
    setSkillsHave(skillsHave.filter((_, i) => i !== index));
  };

  const removeSkillNeed = (index: number) => {
    setSkillsNeed(skillsNeed.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
  post: form.title,   

  title: form.title,
  description: form.description,
  post_Type: form.post_Type,
  budget: Number(form.budget || 0),
  user_Id: user?.userId ?? null,

  project_Duration: form.timeline,
  
  team_Size: Number(form.teamSize.replace(/[^0-9]/g, "")) || 0,

  author_Experience: form.experienceLevel,
  requirements: "",
  team_Info: "",
  author_Bio: "",
  author_Rating: 0,
  project_Status: "active",

  skills: [
    ...skillsHave.map((s) => ({ skill_Name: s, skill_Type: "have" })),
    ...skillsNeed.map((s) => ({ skill_Name: s, skill_Type: "need" })),
  ],

  roles: []
};


    setLoading(true);
    try {

      const res = await API.post(
        "/Post",
        payload);
setLoading(false); 
      setShowSuccessPopup(true);
    } catch (err: any) {
      setLoading(false); 
      console.error("Create post error:", err); 
    }

  };

  return (
    <main className="ml-[50px] mt-[56px] p-6 min-h-[calc(100vh-56px)]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-[28px] text-[var(--text-primary)] leading-[1.3]">
            Create New Post
          </h1>
          <p className="text-[16px] text-[var(--text-secondary)]">
            Share your project, find collaborators, or showcase your work
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="
        bg-[var(--card-bg)] rounded-xl p-[30px] shadow-[var(--card-shadow)]
        border border-[var(--post-border)] mb-[30px]
      ">

        {/* --- POST TYPE SECTION --- */}
        <div className="mb-[30px] pb-[20px] border-b border-[var(--border-color)]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-6 h-6 fill-[var(--accent-color)] rounded-sm "><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
            Post Type
          </h2>

          <label className="font-semibold text-[14px] text-[var(--text-primary)]">
            Post Category<span className="text-red-500"> *</span>
          </label>
          <select
            id="post_Type"
            value={form.post_Type}
            onChange={handleChange}
            required
            className="
              w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)]
              rounded-lg text-[var(--text-primary)]
            "
          >
            <option value="" >Select category</option>
            <option value="partner">Looking for Partner</option>
            <option value="client">Client Project</option>
            <option value="showcase">Project Showcase</option>
            <option value="team">Looking for Team</option>
            <option value="freelance">Freelance Work</option>
          </select>
          <div className="text-[12px] mt-2.5">Choose the purpose of your post</div>
        </div>

        {/* --- BASIC INFORMATION --- */}
        <div className="mb-[30px] pb-[20px] border-b border-[var(--border-color)]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-6 h-6 fill-[var(--accent-color)]">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            Basic Information
          </h2>

          <label className="font-semibold text-[14px] text-[var(--text-primary)]">
            Project Title<span className="text-red-500"> *</span>
          </label>
          <input
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg placeholder:text-[var(--text-tertiary)]"
            placeholder="Enter project title"
          />
          <div className="text-[12px] mt-3">Make it clear and descriptive</div>

          <label className="font-semibold mt-4 block text-[14px] text-[var(--text-primary)]">
            Description<span className="text-red-500"> *</span>
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg min-h-[120px] placeholder:text-[var(--text-tertiary)]"
            placeholder="Describe your project..."
          ></textarea>
          <div className="text-[12px] mt-3">Be specific about your goals, requirements, or achievements</div>

        </div>

        {/* --- SKILLS SECTION --- */}
        <div className="mb-[30px] pb-[20px] border-b border-[var(--border-color)]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-6 h-6 fill-[var(--accent-color)]">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Skills & Requirements
          </h2>

          {/* Skills Have */}
          <label className="font-semibold text-[14px]">Skills I Have</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillsHave.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-[var(--skill-have)] border border-[var(--accent-color)] text-sm font-semibold"
              >
                {skill}
                <button
                  className="ml-2 text-gray-400"
                  onClick={() => removeSkillHave(index)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              value={skillHaveInput}
              onChange={(e) => setSkillHaveInput(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg placeholder:text-[var(--text-tertiary)]"
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkillHave();
              }
            }}
            />
            <button
              type="button"
              onClick={addSkillHave}
              className="px-4 py-2 bg-[var(--accent-color)] text-[var(--button-text)] hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Skills Need */}
          <label className="font-semibold text-[14px] mt-6 block">Skills I Need</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillsNeed.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-[var(--skill-need)] border border-red-500 text-sm font-semibold"
              >
                {skill}
                <button
                  className="ml-2 text-gray-400"
                  onClick={() => removeSkillNeed(index)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              value={skillNeedInput}
              onChange={(e) => setSkillNeedInput(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg placeholder:text-[var(--text-tertiary)]"
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkillNeed();
              }
            }}
            />
            <button
              type="button"
              onClick={addSkillNeed}
              className="px-4 py-2 bg-[var(--accent-color)] text-[var(--button-text)] hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* --- ADDITIONAL DETAILS --- */}
        <div className="mb-[30px]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-6 h-6 fill-[var(--accent-color)]">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            Additional Details
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Budget */}
            <div>
              <label className="font-semibold text-[14px]">Budget (if applicable)</label>
              <input
                id="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg placeholder:text-[var(--text-tertiary)]"
                placeholder="₹15,000"
              />
              <div className="text-[12px] mt-2">Leave empty if not applicable</div>
            </div>

            {/* Timeline */}
            <div>
              <label className="font-semibold text-[14px]">Timeline</label>
              <select
                id="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg"
              >
                <option value="">Select timeline</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3+ months">3+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Team Size */}
            <div>
              <label className="font-semibold text-[14px]">Team Size</label>
              <select
                id="teamSize"
                value={form.teamSize}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg"
              >
                <option value="">Select team size</option>
                <option value="1">Just me</option>
                <option value="2-3">2-3 people</option>
                <option value="4-5">4-5 people</option>
                <option value="6+">6+ people</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="font-semibold text-[14px]">Experience Level</label>
              <select
                id="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg"
              >
                <option value="">Select experience</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 border-t pt-6 border-[var(--border-color)]">
          <button type="button"
            onClick={() => setShowCancelPopup(true)}
            className="px-6 py-3 bg-[var(--accent-color)] text-[var(--button-text)] rounded-lg flex items-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition">
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[var(--accent-color)] text-[var(--button-text)] rounded-lg flex items-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition"
          >
            <svg width="22" height="22" fill="currentColor"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            Create Post
          </button>
        </div>
      </form>
      {showCancelPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl shadow-lg w-[350px] text-center">

            <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Leave this page?</h2>
            <p className="text-[var(--text-primary)] mb-6">
              Are you sure you want to discard this post and go back?
            </p>

            <div className="flex justify-center gap-4">
              {/* No button */}
              <button
                onClick={() => setShowCancelPopup(false)}
                className="px-6 py-3 bg-[var(--accent-color)] text-[var(--button-text)] rounded-lg flex items-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition"
              >
                No
              </button>

              {/* Yes button */}
              <button
                onClick={() => navigate("/Home")}
                className="  bg-red-500 px-6 py-3  text-[var(--button-text)] rounded-lg flex items-center gap-2   hover:-translate-y-1 transition"
              >
                Yes
              </button>
            </div>

          </div>
        </div>
      )}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl shadow-lg w-[350px] text-center">

            <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Post Created!</h2>
            <p className="text-[var(--text-primary)] mb-6">
              Your post has been successfully created.
            </p>

            <button
              onClick={() => navigate(-1)}  
              className="px-6 py-2 bg-green-600 text-[var(--button-text)] rounded-lg  hover:-translate-y-1 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}


    </main>
  );
};

export default CreatePost;
