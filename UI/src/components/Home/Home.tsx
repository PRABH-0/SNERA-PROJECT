import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../Loader/FullScreenLoader";
import CommentsPopup from "../Comments/CommentsPopup";
import { getAvatarName } from "../../utils/getAvatarName";
import postApi from "../../api/postApi";

type Post = {
  id?: string;
  author_Name?: string;
  avtar_Name?: string;
  budget: string;
  commentCount: number;
  description?: string;
  end_Date: string;
  experienceLevel: string;
  isLiked?: boolean;
  likeCount: number;
  projectTitle?: string;
  projectType?: string;
  resourceLinks: string[];
  skillsHave?: string[];
  skillsNeed?: string[];
  start_Date: string;
  teamSize: string;
  team_Name: string;
  timeline: string;
  timeAgo?: string;
  likes?: number;
  comments?: number;
  createdAt?: string;
  project_Status: string;
  project_Visibility: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [mainLoading, setMainLoading] = useState(false);
  // filters
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const lastScrollY = useRef(0);

  const didFetch = useRef(false);

  const formatCount = (num: number = 0) => {
    if (num < 1000) return num;
    if (num < 1_000_000) return (num / 1000).toFixed(1) + "k";
    return (num / 1_000_000).toFixed(1) + "M";
  };

  const formatTime = (utcDateString: string) => {
    const date = new Date(utcDateString);
    const local = new Date(
      date.getTime() + new Date().getTimezoneOffset() * -60000
    );

    const seconds = Math.floor((Date.now() - local.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;

    const days = Math.floor(seconds / 86400);
    if (days < 15) return `${days} days ago`;
    return local.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatStaticDate = (dateString?: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleLike = async (projectId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await postApi.updateLike(user.userId, projectId);
      console.log("like data: ", res);
 
      const updatedIsLiked = res.data.isLike === true;
      const updatedLikeCount = res.data.postLikes;

      setPosts((prev) =>
        prev.map((p) =>
          String(p.id) === String(projectId)
            ? {
                ...p,
                isLiked: updatedIsLiked,
                likeCount: updatedLikeCount,
              }
            : p
        )
      );
    } catch (err) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                isLiked: !p.isLiked,
                likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
              }
            : p
        )
      );
      console.error("Like failed:", err);
    }
  };

  const handleComment = async (
    postId: string | number,
    commentText: string
  ) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        userId: user.userId,
        projectId: String(postId),
        comment: commentText,
      };

      await postApi.createComment(payload);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prev) => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.accessToken) {
      navigate("/");
      return;
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScrollY.current;

      lastScrollY.current = currentScroll;

      if (!isScrollingDown) return;

      if (!hasMore) return;

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !mainLoading
      ) {
        setMainLoading(true);
        setPageNumber((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mainLoading]);

  useEffect(() => {
    if (pageNumber === 1) return;
    fetchPosts();
  }, [pageNumber]);

  const fetchPosts = async () => {
    setMainLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await postApi.getAll({
        pageNumber: pageNumber,
        pageSize: pageSize,
        user_Id: user.userId,
        isDescending: true,
      });

      console.log("API DATA => ", res.data);
      const items = res.data.projects ?? [];

      const postsArr = Array.isArray(items) ? items : [];
      if (postsArr.length < pageSize) {
        setHasMore(false);
      }

      const normalized = postsArr.map((p: any) => ({
        id: String(p.project_Id),
        projectTitle: p.projectTitle,
        projectType: p.projectType,
        description: p.description,
        resourceLinks: p.resourceLinks,
        skillsHave: p.skillsHave ?? [],
        skillsNeed: p.skillsNeed ?? [],
        teamSize: p.teamSize,
        team_Name: p.team_Name,
        timeline: p.timeline,
        author_Name: p.author_Name || "Unknown",
        avtar_Name: getAvatarName(p.author_Name || "U"),
        budget: p.budget,
        end_Date: p.end_Date,
        start_Date: p.start_Date,
        experienceLevel: p.experienceLevel,
        createdAt: p.createdAt ? formatTime(p.createdAt) : "Just now",
        likeCount: p.likeCount ?? 0,
        commentCount: p.commentCount ?? 0,
        comments: p.comments,
        isLiked: Boolean(p.isLiked),
        project_Status: p.project_Status,
        project_Visibility: p.project_Visibility,
      }));

      setPosts((prev) => [...prev, ...normalized]);
    } catch (err) {
      console.error("Failed to fetch posts: ", err);
    } finally {
      setMainLoading(false);
    }
  };

  return (
    <main>
      {mainLoading && <FullScreenLoader />}

      <div className="bg-[var(--bg-quadra)] ml-[50px] mt-[60px] p-[30px]  ">
        <div className="flex min-h-[80vh] ">
          <div className="flex-1">
            <div>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="
                  bg-[var(--card-bg)]
                  rounded-xl
                  p-6
                  mb-5
                  shadow-[var(--card-shadow)]
                  border border-[var(--post-border)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]
                  transition-all
                   
                "
                >
                  {/* Header */}
                  <div className="flex items-start mb-[16px]">
                    <div
                      className="
                      w-12 h-12 rounded-full
                      bg-[linear-gradient(135deg,var(--accent-color),#0099ff)]
                      text-white flex items-center justify-center
                      font-semibold text-base mr-3
                    "
                    >
                      {post.avtar_Name || "U"}
                    </div>

                    <div className="flex-1">
                      <div className="font-bold text-[var(--text-primary)] mb-1">
                        {post.author_Name}
                      </div>

                      <div className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
                        {/* FIXED POST TYPE BADGE */}
                        <span
                          className="
                          inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-[0.5px]
                          bg-[var(--badge-partner-bg)] text-[var(--badge-partner-text)]
                          border border-[var(--badge-partner-text)]
                        "
                        >
                          {post.projectType || "POST"}
                        </span>

                        <span>• {post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className="rounded-lg bg-[var(--card-bg)]  shadow-[var(--card-shadow)]
        border border-[var(--post-border)] p-5 mb-2"
                  >
                    <div>
                      <div className="mb-3 flex items-start justify-between gap-4 ">
                        <div>
                          <h2 className="mb-1 text-3xl font-bold text-[var(--text-primary)]">
                            {post.projectTitle}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-primary) pt-2 ">
                            {post.team_Name && (
                              <span className="rounded-full    px-3 py-1 font-medium text-[var(--text-primary)">
                                Team name: {post.team_Name}
                              </span>
                            )}
                            {post.start_Date && (
                              <span className="rounded-full  px-3 py-1 font-medium text-[var(--text-primary)">
                                Start: {formatStaticDate(post.start_Date)}
                              </span>
                            )}
                            {post.end_Date && (
                              <span className="rounded-full  px-3 py-1 font-medium text-[var(--text-primary)">
                                End: {formatStaticDate(post.end_Date)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide   `}
                          >
                            {post.projectType}
                          </span>
                          {post.experienceLevel && (
                            <span className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-primary)] ">
                              {post.experienceLevel}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-5 text-sm leading-relaxed text-[var(--text-primary)">
                        {post.description}
                      </div>

                      {/* Skills */}
                      <div className="my-4 space-y-4">
                        <div>
                          <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
                            Skills We Have
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(post.skillsHave ?? []).map((skill: any) => (
                              <span
                                key={skill}
                                className="rounded-full bg-[var(--skill-have)] border border-blue-700 px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
                            Skills We Need
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(post.skillsNeed ?? []).map((skill: any) => (
                              <span
                                key={skill}
                                className="rounded-full bg-[var(--skill-need)] border border-red-500 px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)]"
                              >
                                {skill}
                              </span>
                            ))}
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
                            {post.teamSize}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-primary)">
                            Time Commitment
                          </span>
                          <span className="text-sm font-medium">
                            {post.timeline}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-primary)">
                            Status / Visibility
                          </span>
                          <span className="text-sm font-medium">
                            {post.project_Status}
                            {" • "}
                            {post.project_Visibility}
                          </span>
                        </div>
                      </div>

                      {/* Resources Summary */}
                      {(post.resourceLinks ?? []).length > 0 && (
                        <div className="mt-5">
                          <div className="mb-2 text-sm font-semibold text-[var(--text-primary)">
                            Resources
                          </div>
                          <ul className="space-y-1 text-xs">
                            {(post.resourceLinks ?? []).map((url) => (
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

                  {/* Footer Buttons */}
                  <div className="flex justify-between border-t border-[var(--border-color)] pt-4">
                    <div className="flex gap-5">
                      <button
                        onClick={() => {
                            handleLike(String(post.id));
                        }}
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] px-3 py-2 rounded-lg"
                      >
                        {post.isLiked ? (
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                          </svg>
                        )}

                        <span>{formatCount(post.likeCount)} Likes</span>
                      </button>

                      <button
                        onClick={() => {
                          setOpenComments(String(post.id));
                        }}
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] px-3 py-2 rounded-lg"
                      >
                        <svg
                          className="fill-current size-[18px] "
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1z" />
                        </svg>
                        <span>{formatCount(post.comments)} Comments</span>
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-5 py-2 border-2 border-[var(--accent-color)] text-[var(--accent-color)] rounded-lg hover:bg-[var(--accent-hover)] hover:text-white transition">
                        Save
                      </button>

                      <button className="px-5 py-2 border-2 border-[var(--accent-color)] text-[var(--accent-color)] rounded-lg hover:bg-[var(--accent-hover)] hover:text-white transition">
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {openComments && (
              <CommentsPopup
                isOpen={true}
                postId={openComments}
                onClose={() => setOpenComments(null)}
                onAddComment={(text) => handleComment(openComments!, text)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
