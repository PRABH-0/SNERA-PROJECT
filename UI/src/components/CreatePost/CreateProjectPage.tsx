import React, { useState } from "react";
import type { FormEvent } from "react";

type ProjectType =
    | ""
    | "learning"
    | "practice"
    | "portfolio"
    | "open-source"
    | "client"
    | "freelance"
    | "other";

type DifficultyLevel = "" | "beginner" | "intermediate" | "advanced" | "expert";

type TeamSize = "" | "1" | "2-3" | "4-6" | "7+";

type TimeCommitment = "" | "5-10" | "10-20" | "20-30" | "30+" | "flexible";

type ProjectStatus = "" | "planning" | "development" | "testing";

type ProjectVisibility = "" | "public" | "private" | "team";

const CreateProjectPage: React.FC = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectType, setProjectType] = useState<ProjectType>("");
    const [projectDescription, setProjectDescription] = useState("");
    const [teamName, setTeamName] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [teamSize, setTeamSize] = useState<TeamSize>("");
    const [timeCommitment, setTimeCommitment] = useState<TimeCommitment>("");

    const [skillsHave, setSkillsHave] = useState<string[]>([]);
    const [skillsNeed, setSkillsNeed] = useState<string[]>([]);
    const [skillHaveInput, setSkillHaveInput] = useState("");
    const [skillNeedInput, setSkillNeedInput] = useState("");

    const [resourceInput, setResourceInput] = useState("");
    const [resources, setResources] = useState<string[]>([]);

    const [projectStatus, setProjectStatus] = useState<ProjectStatus>("");
    const [projectVisibility, setProjectVisibility] =
        useState<ProjectVisibility>("");

    const handleAddSkillHave = () => {
        const value = skillHaveInput.trim();
        if (!value) return;
        if (skillsHave.includes(value)) return;
        setSkillsHave((prev) => [...prev, value]);
        setSkillHaveInput("");
    };

    const handleAddSkillNeed = () => {
        const value = skillNeedInput.trim();
        if (!value) return;
        if (skillsNeed.includes(value)) return;
        setSkillsNeed((prev) => [...prev, value]);
        setSkillNeedInput("");
    };

    const handleRemoveSkillHave = (skill: string) => {
        setSkillsHave((prev) => prev.filter((s) => s !== skill));
    };

    const handleRemoveSkillNeed = (skill: string) => {
        setSkillsNeed((prev) => prev.filter((s) => s !== skill));
    };

    const handleAddResource = () => {
        const url = resourceInput.trim();
        if (!url) return;
        if (resources.includes(url)) return;
        setResources((prev) => [...prev, url]);
        setResourceInput("");
    };

    const handleRemoveResource = (url: string) => {
        setResources((prev) => prev.filter((r) => r !== url));
    };

    const handleCancel = () => {
        setProjectTitle("");
        setProjectType("");
        setProjectDescription("");
        setTeamName("");
        setDifficultyLevel("");
        setStartDate("");
        setEndDate("");
        setTeamSize("");
        setTimeCommitment("");
        setSkillsHave([]);
        setSkillsNeed([]);
        setSkillHaveInput("");
        setSkillNeedInput("");
        setResources([]);
        setResourceInput("");
        setProjectStatus("");
        setProjectVisibility("");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            projectTitle,
            projectType,
            projectDescription,
            teamName,
            difficultyLevel,
            startDate,
            endDate,
            teamSize,
            timeCommitment,
            skillsHave,
            skillsNeed,
            resources,
            projectStatus,
            projectVisibility,
        };
        console.log("Create Project Payload:", payload);
        // TODO: call API here
    };

    const showPreview =
        projectTitle.trim().length > 0 ||
        projectDescription.trim().length > 0 ||
        skillsHave.length > 0 ||
        skillsNeed.length > 0 ||
        resources.length > 0;

    const getProjectTypeBadgeClasses = () => {
        switch (projectType) {
            case "learning":
                return "bg-green-50 text-green-700 border border-green-500";
            case "practice":
                return "bg-amber-50 text-amber-700 border border-amber-500";
            case "portfolio":
                return "bg-sky-50 text-sky-700 border border-sky-500";
            default:
                return "bg-slate-100 text-slate-700 border border-slate-400";
        }
    };

    const projectTypeLabel = () => {
        switch (projectType) {
            case "learning":
                return "Learning Project";
            case "practice":
                return "Practice Project";
            case "portfolio":
                return "Portfolio Project";
            case "open-source":
                return "Open Source";
            case "client":
                return "Client Project";
            case "freelance":
                return "Freelance Work";
            case "other":
                return "Other";
            default:
                return "Project Type";
        }
    };

    return (
        <div className="ml-[50px] mt-[56px] p-6 min-h-[calc(100vh-56px)] bg-slate-50">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-[28px] font-bold leading-snug text-slate-900">
                        Create Project
                    </h1>
                    <p className="text-base text-slate-500">
                        Define your project details, skills, and resources to find the
                        perfect team.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                className="mb-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
                id="createProjectForm"
                onSubmit={handleSubmit}
            >
                {/* Project Details */}
                <div className="form-section mb-8 border-b border-slate-200 pb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                        <svg
                            className="h-5 w-5 fill-blue-600"
                            viewBox="0 0 24 24"
                            aria-hidden
                        >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                        </svg>
                        Project Details
                    </h2>

                    <div className="mb-4 flex gap-5">
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Project Title<span className="text-red-500"> *</span>
                            </label>
                            <input
                                type="text"
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="projectTitle"
                                placeholder="e.g., E-commerce Platform Development"
                                required
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                            />
                            <div className="text-xs text-slate-500">
                                Make it descriptive and specific
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Project Type<span className="text-red-500"> *</span>
                            </label>
                            <select
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition hover:cursor-pointer focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="projectType"
                                required
                                value={projectType}
                                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                            >
                                <option value="">Select type</option>
                                <option value="learning">Learning Project</option>
                                <option value="practice">Practice Project</option>
                                <option value="portfolio">Portfolio Project</option>
                                <option value="open-source">Open Source</option>
                                <option value="client">Client Project</option>
                                <option value="freelance">Freelance Work</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Project Description<span className="text-red-500"> *</span>
                        </label>
                        <textarea
                            className="min-h-[120px] resize-y rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            id="projectDescription"
                            placeholder="Describe your project goals, scope, and what you aim to achieve..."
                            required
                            rows={5}
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                        <div className="text-xs text-slate-500">
                            Include the purpose, main features, and learning objectives
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Team Name<span className="text-red-500"> *</span>
                            </label>
                            <input
                                type="text"
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="teamName"
                                placeholder="e.g., Web Dev Warriors"
                                required
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                            <div className="text-xs text-slate-500">
                                What will your team be called?
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Difficulty Level<span className="text-red-500"> *</span>
                            </label>
                            <select
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition hover:cursor-pointer focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="difficultyLevel"
                                required
                                value={difficultyLevel}
                                onChange={(e) =>
                                    setDifficultyLevel(e.target.value as DifficultyLevel)
                                }
                            >
                                <option value="">Select difficulty</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Technology Stack & Skills */}
                <div className="form-section mb-8 border-b border-slate-200 pb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                        <svg
                            className="h-5 w-5 fill-blue-600"
                            viewBox="0 0 24 24"
                            aria-hidden
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Technology Stack & Skills
                    </h2>

                    {/* Skills We Have */}
                    <div className="mb-5 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Skills We Have
                        </label>
                        <div className="min-h-[60px] rounded-lg border-2 border-slate-200 bg-slate-50 p-2 flex flex-wrap gap-2">
                            {skillsHave.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-1 rounded-full border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-semibold text-slate-900"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        className="flex h-4 w-4 items-center justify-center rounded-full text-xs text-slate-500 hover:bg-black/10 hover:text-slate-900"
                                        onClick={() => handleRemoveSkillHave(skill)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {skillsHave.length === 0 && (
                                <span className="text-xs text-slate-400">
                                    No skills added yet.
                                </span>
                            )}
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                id="skillHaveInput"
                                placeholder="Add a skill (e.g., React, Node.js)"
                                value={skillHaveInput}
                                onChange={(e) => setSkillHaveInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddSkillHave();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                id="addSkillHaveBtn"
                                onClick={handleAddSkillHave}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Skills We Need */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Skills We Need
                        </label>
                        <div className="min-h-[60px] rounded-lg border-2 border-slate-200 bg-slate-50 p-2 flex flex-wrap gap-2">
                            {skillsNeed.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-1 rounded-full border border-red-500 bg-red-50 px-3 py-1 text-xs font-semibold text-slate-900"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        className="flex h-4 w-4 items-center justify-center rounded-full text-xs text-slate-500 hover:bg-black/10 hover:text-slate-900"
                                        onClick={() => handleRemoveSkillNeed(skill)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {skillsNeed.length === 0 && (
                                <span className="text-xs text-slate-400">
                                    No skills needed added yet.
                                </span>
                            )}
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-100"
                                id="skillNeedInput"
                                placeholder="Add a skill we need to find"
                                value={skillNeedInput}
                                onChange={(e) => setSkillNeedInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddSkillNeed();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                id="addSkillNeedBtn"
                                onClick={handleAddSkillNeed}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="form-section mb-8 border-b border-slate-200 pb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                        <svg
                            className="h-5 w-5 fill-blue-600"
                            viewBox="0 0 24 24"
                            aria-hidden
                        >
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        Timeline
                    </h2>

                    <div className="flex gap-5">
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Start Date<span className="text-red-500"> *</span>
                            </label>
                            <input
                                type="date"
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="startDate"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                End Date (Optional)
                            </label>
                            <input
                                type="date"
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <div className="text-xs text-slate-500">
                                Leave empty for ongoing projects
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team & Collaboration */}
                <div className="form-section mb-8 border-b border-slate-200 pb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                        <svg
                            className="h-5 w-5 fill-blue-600"
                            viewBox="0 0 24 24"
                            aria-hidden
                        >
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        Team & Collaboration
                    </h2>

                    <div className="mb-4 flex gap-5">
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Team Size Needed<span className="text-red-500"> *</span>
                            </label>
                            <select
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition hover:cursor-pointer focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="teamSize"
                                required
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value as TeamSize)}
                            >
                                <option value="">Select size</option>
                                <option value="1">Solo Project</option>
                                <option value="2-3">Small (2-3 people)</option>
                                <option value="4-6">Medium (4-6 people)</option>
                                <option value="7+">Large (7+ people)</option>
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Time Commitment<span className="text-red-500"> *</span>
                            </label>
                            <select
                                className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition hover:cursor-pointer focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                id="timeCommitment"
                                required
                                value={timeCommitment}
                                onChange={(e) =>
                                    setTimeCommitment(e.target.value as TimeCommitment)
                                }
                            >
                                <option value="">Select commitment</option>
                                <option value="5-10">5-10 hours/week</option>
                                <option value="10-20">10-20 hours/week</option>
                                <option value="20-30">20-30 hours/week</option>
                                <option value="30+">30+ hours/week</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Resources & Additional Info */}
                <div className="form-section pb-0">
                    <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                        <svg
                            className="h-5 w-5 fill-blue-600"
                            viewBox="0 0 24 24"
                            aria-hidden
                        >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        Resources & Additional Info
                    </h2>

                    {/* Resource Links */}
                    <div className="mb-5 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Resource Links
                        </label>
                        <div className="mb-2 flex gap-3">
                            <input
                                type="url"
                                className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                id="resourceUrl"
                                placeholder="https://github.com/your-project"
                                value={resourceInput}
                                onChange={(e) => setResourceInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddResource();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                id="addResourceBtn"
                                onClick={handleAddResource}
                            >
                                Add
                            </button>
                        </div>
                        <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
                            {resources.length === 0 && (
                                <div className="text-xs text-slate-400">
                                    No resources added yet.
                                </div>
                            )}
                            {resources.map((url) => (
                                <div
                                    key={url}
                                    className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm"
                                >
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="break-all text-blue-600 hover:underline"
                                    >
                                        {url}
                                    </a>
                                    <button
                                        type="button"
                                        className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                                        onClick={() => handleRemoveResource(url)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-slate-500">
                            Add GitHub repository, Figma designs, documentation, etc.
                        </div>
                    </div>

                    {/* Project Status */}
                    <div className="mb-4 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Project Status
                        </label>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                { value: "planning", label: "Planning Phase" },
                                { value: "development", label: "In Development" },
                                { value: "testing", label: "Testing Phase" },
                            ].map((status) => {
                                const isSelected = projectStatus === status.value;
                                return (
                                    <label
                                        key={status.value}
                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-slate-50 px-4 py-3 text-sm transition ${isSelected
                                                ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                                                : "border-transparent hover:bg-slate-100 hover:shadow"
                                            }`}
                                        onClick={() =>
                                            setProjectStatus(status.value as ProjectStatus)
                                        }
                                    >
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${isSelected
                                                    ? "border-blue-600 bg-blue-600"
                                                    : "border-slate-300"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <span>{status.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Project Visibility */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-900">
                            Project Visibility
                        </label>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                { value: "public", label: "Public (Anyone can view)" },
                                { value: "private", label: "Private (Invite only)" },
                                { value: "team", label: "Team Only" },
                            ].map((vis) => {
                                const isSelected = projectVisibility === vis.value;
                                return (
                                    <label
                                        key={vis.value}
                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-slate-50 px-4 py-3 text-sm transition ${isSelected
                                                ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                                                : "border-transparent hover:bg-slate-100 hover:shadow"
                                            }`}
                                        onClick={() =>
                                            setProjectVisibility(vis.value as ProjectVisibility)
                                        }
                                    >
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${isSelected
                                                    ? "border-blue-600 bg-blue-600"
                                                    : "border-slate-300"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <span>{vis.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 pt-6">
                    <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        id="cancelBtn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[2px] hover:bg-blue-700 hover:shadow-lg disabled:translate-y-0 disabled:bg-slate-400 disabled:shadow-none"
                        id="submitBtn"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        Create Project
                    </button>
                </div>
            </form>

            {/* Preview Section */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-[20px] font-semibold text-slate-900">
                    <svg
                        className="h-5 w-5 fill-blue-600"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                    Project Preview
                </h2>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    {!showPreview ? (
                        <div className="py-10 text-center text-sm text-slate-500">
                            Your project preview will appear here as you fill out the form
                        </div>
                    ) : (
                        <div>
                            {/* Preview Header */}
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="mb-1 text-2xl font-bold text-slate-900">
                                        {projectTitle || "Untitled Project"}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                        {teamName && (
                                            <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                                                Team: {teamName}
                                            </span>
                                        )}
                                        {startDate && (
                                            <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                                                Start: {startDate}
                                            </span>
                                        )}
                                        {endDate && (
                                            <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                                                End: {endDate}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${getProjectTypeBadgeClasses()}`}
                                    >
                                        {projectTypeLabel()}
                                    </span>
                                    {difficultyLevel && (
                                        <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                                            {difficultyLevel} level
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-5 text-sm leading-relaxed text-slate-600">
                                {projectDescription || "No description added yet."}
                            </div>

                            {/* Skills */}
                            <div className="my-4 space-y-4">
                                <div>
                                    <div className="mb-2 text-sm font-semibold text-slate-900">
                                        Skills We Have
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsHave.length === 0 ? (
                                            <span className="text-xs text-slate-400">
                                                Not specified.
                                            </span>
                                        ) : (
                                            skillsHave.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 text-sm font-semibold text-slate-900">
                                        Skills We Need
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsNeed.length === 0 ? (
                                            <span className="text-xs text-slate-400">
                                                Not specified.
                                            </span>
                                        ) : (
                                            skillsNeed.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="mt-5 grid gap-4 rounded-lg bg-slate-100 p-5 text-xs text-slate-700 md:grid-cols-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                        Team Size
                                    </span>
                                    <span className="text-sm font-medium">
                                        {teamSize || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                        Time Commitment
                                    </span>
                                    <span className="text-sm font-medium">
                                        {timeCommitment
                                            ? `${timeCommitment} hrs/week`.replace("flexible hrs/week", "Flexible")
                                            : "Not specified"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                        Status / Visibility
                                    </span>
                                    <span className="text-sm font-medium">
                                        {(projectStatus &&
                                            projectStatus[0].toUpperCase() +
                                            projectStatus.slice(1)) ||
                                            "Status N/A"}
                                        {" • "}
                                        {(projectVisibility &&
                                            projectVisibility[0].toUpperCase() +
                                            projectVisibility.slice(1)) ||
                                            "Visibility N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* Resources Summary */}
                            {resources.length > 0 && (
                                <div className="mt-5">
                                    <div className="mb-2 text-sm font-semibold text-slate-900">
                                        Resources
                                    </div>
                                    <ul className="space-y-1 text-xs">
                                        {resources.map((url) => (
                                            <li key={url}>
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {url}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;
