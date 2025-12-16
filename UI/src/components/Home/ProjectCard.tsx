import React, { useState } from 'react'
type ProjectStatus = "" | "planning" | "development" | "testing";

type ProjectVisibility = "" | "public" | "private" | "team";

const ProjectCard: React.FC = () => {

    const [projectStatus, setProjectStatus] = useState<ProjectStatus>("");
    const [projectVisibility, setProjectVisibility] =
        useState<ProjectVisibility>("");
    const getProjectTypeBadgeClasses = () => {
        switch (form.project_Type) {
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
        switch (form.project_Type) {
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

    const fetchPosts = async () => {
        setMainLoading(true);
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const res = await postApi.getAll({
            pageNumber: pageNumber,
            pageSize: pageSize,
            user_Id: user.userId,
            isDescending: true
          });
    
          console.log("API DATA => ", res.data);
          const items = res.data.projects ?? [];
    
          const postsArr = Array.isArray(items) ? items : [];
          if (postsArr.length < pageSize) {
            setHasMore(false);
          }
    
          const normalized = postsArr.map((p: any) => ({
            id: String(p.project_Id),
    
    
            title: p.projectTitle,
            postType: p.projectType,
    
    
            description: p.description,
    
    
            author_Name: p.author_Name || "Unknown",
            avtar_Name: getAvatarName(p.author_Name || "U"),
    
    
            skillsHave: p.skillsHave ?? [],
            skillsNeed: p.skillsNeed ?? [],
    
    
            timeAgo: p.createdAt ? formatTime(p.createdAt) : "Just now",
            created_Timestamp: p.createdAt,
    
    
            likes: p.likeCount ?? 0,
            comments: p.commentCount ?? 0,
            isLiked: Boolean(p.isLiked),
    
    
    
          }));
    
          setPosts(prev => [...prev, ...normalized]);
    
        } catch (err) {
          console.error("Failed to fetch posts: ", err);
        } finally {
          setMainLoading(false);
    
        }
      };

    return (
        <div>
            <div className="rounded-lg bg-[var(--card-bg)]  shadow-[var(--card-shadow)]
        border border-[var(--post-border)] p-5">

                <div>

                    <div className="mb-5 flex items-start justify-between gap-4 ">
                        <div>
                            <h2 className="mb-1 text-3xl font-bold text-[var(--text-primary)]">
                                {form.project_Title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-primary) pt-2 ">
                                {form.team_Name && (
                                    <span className="rounded-full    px-3 py-1 font-medium text-[var(--text-primary)">
                                        Team name: {form.team_Name}
                                    </span>
                                )}
                                {form.start_Date && (
                                    <span className="rounded-full  px-3 py-1 font-medium text-[var(--text-primary)">
                                        Start: {form.start_Date}
                                    </span>
                                )}
                                {form.end_Date && (
                                    <span className="rounded-full  px-3 py-1 font-medium text-[var(--text-primary)">
                                        End: {form.end_Date}
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
                            {form.experience_Level && (
                                <span className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-primary)] ">
                                    {form.experience_Level}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5 text-sm leading-relaxed text-[var(--text-primary)">
                        {form.project_Description}
                    </div>

                    {/* Skills */}
                    <div className="my-4 space-y-4">
                        <div>
                            <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
                                Skills We Have
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillsHave.length === 0 ? (
                                    <span className="text-xs text-[var(--text-primary)">
                                        Not specified.
                                    </span>
                                ) : (
                                    skillsHave.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-[var(--skill-have)] border border-blue-700 px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)]"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
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
                                            className="rounded-full bg-[var(--skill-need)] border border-red-500 px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)]"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-5 grid gap-4 rounded-lg bg-[var(--card-bg)] shadow-sm shadow-[--card-shadow] border border-[var(--post-border)]  p-5 text-xs text-[var(--text-primary) md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-primary)">
                                Team Size
                            </span>
                            <span className="text-sm font-medium">
                                {form.team_Size}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-primary)">
                                Time Commitment
                            </span>
                            <span className="text-sm font-medium">
                                {form.project_Timeline
                                    ? `${form.project_Timeline} hrs/week`.replace("flexible hrs/week", "Flexible")
                                    : "Not specified"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-primary)">
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
                            <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
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

            </div>
        </div>
    )
}

export default 
