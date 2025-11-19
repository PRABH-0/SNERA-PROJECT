import React, { useState, useEffect } from "react";
import API from "../../api/api";

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

  const [user, setUser] = useState<any>(null);

  // Load logged in user
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
      title: form.title,
      description: form.description,
      post_Type: form.post_Type,
      budget: Number(form.budget),
      user_Id: user?.userId ?? null,
      project_Duration: form.timeline,
      team_Size: Number(form.teamSize),
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
      roles: [],
    };

    console.log("FINAL PAYLOAD:", payload);
    try {
       
   const token = JSON.parse(localStorage.getItem("user") || "{}")?.accessToken;


       

      if (!token) {
        alert("Token missing. Please login again.");
        return;
      }

      const res = await API.post(
        "/Post", 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Post Created Successfully!");
      console.log(res.data);
    } catch (err: any) {
      console.error("Create post error:", err);
      alert("Post creation failed! See console.");
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
            <svg className="w-5 h-5 fill-[var(--accent-color)]"><path d="M19 3H5v18h14V3zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
            Post Type
          </h2>

          <label className="font-semibold text-[14px] text-[var(--text-primary)]">
            Post Category<span className="text-red-500">*</span>
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
            <option value="">Select category</option>
            <option value="partner">Looking for Partner</option>
            <option value="client">Client Project</option>
            <option value="showcase">Project Showcase</option>
            <option value="team">Looking for Team</option>
            <option value="freelance">Freelance Work</option>
          </select>
        </div>

        {/* --- BASIC INFORMATION --- */}
        <div className="mb-[30px] pb-[20px] border-b border-[var(--border-color)]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-5 h-5 fill-[var(--accent-color)]"><path d="M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2z" /></svg>
            Basic Information
          </h2>

          <label className="font-semibold text-[14px] text-[var(--text-primary)]">
            Project Title<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg"
            placeholder="Enter project title"
          />

          <label className="font-semibold mt-4 block text-[14px] text-[var(--text-primary)]">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg min-h-[120px]"
            placeholder="Describe your project..."
          ></textarea>
        </div>

        {/* --- SKILLS SECTION --- */}
        <div className="mb-[30px] pb-[20px] border-b border-[var(--border-color)]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-5 h-5 fill-[var(--accent-color)]"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7L2 9l7-1z" /></svg>
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
              className="flex-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg"
            />
            <button
              type="button"
              onClick={addSkillHave}
              className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-lg"
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
              className="flex-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg"
            />
            <button
              type="button"
              onClick={addSkillNeed}
              className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* --- ADDITIONAL DETAILS --- */}
        <div className="mb-[30px]">
          <h2 className="text-[20px] font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-5 h-5 fill-[var(--accent-color)]"><path d="M19 3H5v18h14V3z" /></svg>
            Additional Details
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Budget */}
            <div>
              <label className="font-semibold text-[14px]">Budget</label>
              <input
                id="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] rounded-lg"
                placeholder="₹15,000"
              />
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
          <button type="button" className="px-6 py-3 bg-transparent text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg">
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg flex items-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition"
          >
            <svg width="16" height="16" fill="currentColor"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            Create Post
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
