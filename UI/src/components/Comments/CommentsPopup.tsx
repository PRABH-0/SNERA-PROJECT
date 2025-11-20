import React, { useEffect, useState } from "react";
import API from "../../api/api";

interface CommentItem {
    comment_Id: string;
    post_Comment: string;
    user_Name: string;
    user_Avatar: string;
    created_Time: string;
}

interface Props {
    isOpen: boolean;
    postId: string;
    onClose: () => void;
    onAddComment: (text: string) => Promise<void>;
}

const CommentsPopup: React.FC<Props> = ({
    isOpen,
    postId,
    onClose,
    onAddComment
}) => {
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (isOpen) fetchComments();
    }, [isOpen]);

    const fetchComments = async () => {
        try {
            const res = await API.get(`/Post/GetComments`, {

                params: { Post_Id: postId }

            });

            setComments(res.data || []);
        } catch (err) {
            console.error("Error loading comments", err);
        }
    };

    const timeAgo = (date: string) => {
        const sec = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        const map: [string, number][] = [
            ["year", 31536000],
            ["month", 2592000],
            ["day", 86400],
            ["hour", 3600],
            ["minute", 60]
        ];
        for (const [u, s] of map) {
            const v = Math.floor(sec / s);
            if (v >= 1) return `${v} ${u}${v > 1 ? "s" : ""} ago`;
        }
        return "Just now";
    };

    // --- FIXED CLEAN FUNCTION ---
    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        // Parent creates comment in DB
        await onAddComment(newComment);

        // Add to popup instantly
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        setComments((prev) => [
            {
                comment_Id: crypto.randomUUID(),
                post_Comment: newComment,
                user_Name: user.userName || "You",
                user_Avatar: (user.userName || "U").slice(0, 2).toUpperCase(),
                created_Time: new Date().toISOString()
            },
            ...prev
        ]);

        setNewComment("");
    };

    if (!isOpen) return null;

    return (
        <div
            id="overlay"
            onClick={(e) => (e.target as HTMLElement).id === "overlay" && onClose()}
            className="fixed inset-0 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm flex justify-center items-center z-[2000]"
        >
            <div className="bg-white w-[700px] max-h-[85vh] rounded-2xl shadow-xl overflow-hidden relative">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-3xl"
                    >
                        &times;
                    </button>
                </div>

                {/* COMMENTS LIST */}
                <div className="px-6 py-4 overflow-y-auto max-h-[55vh] space-y-6">
                    {comments.map((c) => (
                        <div key={c.comment_Id} className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                {c.user_Avatar}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold">{c.user_Name}</div>
                                    <div className="text-sm text-gray-500">
                                        {timeAgo(c.created_Time)}
                                    </div>
                                </div>

                                <p className="text-gray-700 mt-1">{c.post_Comment}</p>
                            </div>
                        </div>
                    ))}

                    {comments.length === 0 && (
                        <p className="text-center text-gray-500">No comments yet.</p>
                    )}
                </div>

                {/* COMMENT INPUT */}
                <div className="p-4 border-t bg-gray-50 flex gap-3">
                    <input
                        className="flex-1 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        onClick={handlePostComment}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentsPopup;
