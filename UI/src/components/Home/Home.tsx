import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import FullScreenLoader from "../Loader/FullScreenLoader";
import CommentsPopup from "../Comments/CommentsPopup";

type SkillItem = { name: string; type?: "have" | "need" };

type Post = {
  id?: number | string;
  author_Name?: string;
  avtar_Name?: string;
  title?: string;
  description?: string;
  skills?: SkillItem[];
  postType?: string;
  timeAgo?: string;
  skillsHave?: string[];
  skillsNeed?: string[];
  likes?: number;
  comments?: number;
};



const Home: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // filters
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [openComments, setOpenComments] = useState<string | null>(null);


  const timeSince = (dateString: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / 1000
    );
    const intervals: [string, number][] = [
      ["year", 31536000],
      ["month", 2592000],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ];
    for (const [label, secs] of intervals) {
      const value = Math.floor(seconds / secs);
      if (value >= 1) return `${value} ${label}${value > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };
  const handleLike = async (postId: string | number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      await API.post("/Post/UpdateLike", { post_Id: postId });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };


  const handleComment = async (postId: string | number, commentText: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.userId) {
        alert("User ID missing! Please login again.");
        return;
      }

      await API.post("/Post/CreateComment", {
        post_Comment: commentText,
        user_Id: user.userId,
        post_Id: postId
      });


      // update UI instantly
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  // Load posts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    

    try {
      const res = await API.get("/Post", {
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          Search: search,
          SortBy: sortBy,
          IsDescending: isDescending,
          Type: typeFilter,
          State: stateFilter,
        }
      });
      const items = res.data.items ?? res.data.data ?? res.data;
      const postsArr = Array.isArray(items) ? items : [];
      postsArr.forEach((p: any) => console.log("RAW ITEM:", p));
      const normalized = postsArr.map((p: any) => ({
        id: p.id || p.post_Id || "",
        title: p.title,
        description: p.description,
        postType: p.post_Type,

        author_Name: p.author_Name,
        avtar_Name: p.avtar_Name,


        skills: p.skills?.map((s: any) => ({
          name: s.skill_Name,
          type: s.skill_Type
        })),

        timeAgo: p.created_Timestamp
          ? timeSince(p.created_Timestamp)
          : "just now",


        likes: p.likes ?? 0,
        comments: p.comments ?? 0,
        
      }));


      setPosts(normalized);
    } catch (err: any) {
      
      console.error("Failed to fetch posts: ", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };


  // Render skill badge (UI same)
  const renderSkill = (skillObj: SkillItem | string, idx: number) => {
    let name = typeof skillObj === "string" ? skillObj : skillObj.name;
    let type = typeof skillObj === "string" ? undefined : skillObj.type;

    const base =
      "px-3 py-1.5 rounded-full text-xs font-semibold border transition duration-200 hover:-translate-y-0.5";

    const haveClass = "border-blue-500 text-blue-500";
    const needClass = "border-red-500 text-red-500";
    const defaultClass =
      "border-[var(--border-color)] text-[var(--text-primary)]";

    const cls =
      type === "have"
        ? `${base} ${haveClass}`
        : type === "need"
          ? `${base} ${needClass}`
          : `${base} ${defaultClass}`;

    return (
      <span key={idx} className={cls}>
        {name}
      </span>
    );
  };

  return (
    <main>
      {loading && <FullScreenLoader />}

      <div className="bg-[var(--bg-quadra)] ml-[50px] mt-[60px] p-[30px] min-h-[100vh]">


        <div className="flex">
          <div className="flex-1">
            {posts.map((post, idx) => (
              <div
                key={idx}
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
                    {(post.avtar_Name || "U")}

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
                        {post.postType || "POST"}
                      </span>

                      <span>• {post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-[20px]">
                  <h2 className="font-bold text-[var(--text-primary)] text-[20px] mb-3">
                    {post.title}
                  </h2>

                  <p className="text-[var(--text-tertiary)] mb-4">
                    {post.description}
                  </p>

                  {/* FIXED SKILLS LIST */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.skills && post.skills.length > 0
                      ? post.skills.map((s, i) => renderSkill(s, i))
                      : null}

                    {post.skillsHave?.map((s, i) =>
                      renderSkill({ name: s, type: "have" }, i)
                    )}

                    {post.skillsNeed?.map((s, i) =>
                      renderSkill(
                        { name: s, type: "need" },
                        i + (post.skillsHave?.length ?? 0)
                      )
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between border-t border-[var(--border-color)] pt-4">
                  <div className="flex gap-5">
                    <button onClick={() => handleLike(post.id!)}
                      className="flex items-center gap-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] px-3 py-2 rounded-lg">
                      <svg className="fill-current size-[18px] " viewBox="0 0 24 24">
                        <path
                          d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                      </svg>{post.likes ?? 0} Likes
                    </button>

                    <button onClick={() => {setOpenComments(String(post.id))}}

                      className="flex items-center gap-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] px-3 py-2 rounded-lg">
                      <svg className="fill-current size-[18px] " viewBox="0 0 24 24">
                        <path
                          d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1z" />
                      </svg> {post.comments ?? 0} Comments
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-5 py-2 border-2 border-[var(--accent-color)] text-[var(--accent-color)] rounded-lg hover:bg-[var(--accent-hover)] hover:text-white transition">
                      Save
                    </button>

                    <button className="px-5 py-2 border-2 border-[var(--accent-color)] text-[var(--accent-color)] rounded-lg hover:bg-[var(--accent-hover)] hover:text-white transition">
                      View More
                    </button>
                    <CommentsPopup
                      isOpen={openComments !== null}
                      postId={openComments || ""}
                      onClose={() => setOpenComments(null)}
                      onAddComment={(text) => handleComment(openComments!, text)}
                    />



                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
