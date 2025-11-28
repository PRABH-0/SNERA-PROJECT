import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import API from "../../api/api";
import MiniLoader from "../Loader/MiniLoader";
import { getAvatarName } from "../../utils/getAvatarName";


interface CommentItem {
  id: string;
  comment_Text: string;
  created_Timestamp: string;
  user_Id: string;
  user_Name: string;
  user_Avatar: string;
}

interface Props {
  isOpen: boolean;
  postId: string;
  onClose: () => void;
  onAddComment: (text: string) => Promise<void>;
  avatarName?: string;

}

const CommentsPopup: React.FC<Props> = ({
  isOpen,
  postId,
  onClose,
  onAddComment
}) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);
  ;


  useEffect(() => {
    const interval = setInterval(() => {
      setComments((prev) => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) fetchComments();
  }, [isOpen, postId]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await API.get(`/Post/GetPostComments/${postId}`);
      console.log("COMMENTS RESPONSE:", res.data);
      console.log("ONE COMMENT OBJECT:", res.data.postComments?.[0]);


      const list = Array.isArray(res.data.postComments)
        ? res.data.postComments
        : [];

      const mapped = list.map((c: any) => {
        return {
          id: c.id,
          comment_Text: c.comment_Text,
          created_Timestamp: c.created_Timestamp,
          user_Id: c.user_Id,
          user_Name: c.author_Name,
          user_Avatar: getAvatarName(c.author_Name),
        };
      });


      setComments(
        mapped.sort(
          (a: any, b: any) =>
            new Date(b.created_Timestamp).getTime() -
            new Date(a.created_Timestamp).getTime()
        )
      );

    } catch (err) {
      console.error("Error loading comments", err);
    } finally {
      setLoadingComments(false);
    }
  };


  const formatTime = (utcDateString: string) => {
    const date = new Date(utcDateString);
    const local = new Date(date.getTime() + (new Date().getTimezoneOffset() * -60000));

    const seconds = Math.floor((Date.now() - local.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;

    const days = Math.floor(seconds / 86400);
    if (days < 10) return `${days} days ago`;
    return local.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    await onAddComment(newComment);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const newLocalComment: CommentItem = {
      id: crypto.randomUUID(),
      comment_Text: newComment,
      created_Timestamp: new Date().toISOString(),
      user_Id: user.userId,
      user_Name: user.userName,
      user_Avatar: getAvatarName(user.userName),


    };
    console.log(newLocalComment)
    setComments(prev => [newLocalComment, ...prev]);

    setNewComment("");
  };

  if (!isOpen) return null;

  return (
    <div
      id="overlay"
      onClick={(e) => (e.target as HTMLElement).id === "overlay" && onClose()}
      className="fixed inset-0 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm flex justify-center items-center z-[2000]"
    >
      <div className="relative bg-[var(--bg-secondary)] w-[800px] h-[85vh] rounded-2xl shadow-xl overflow-hidden relative">

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button onClick={onClose} className="text-[var(--icon-color)] hover:text-[var(--icon-hover)] text-3xl">
            &times;
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto max-h-[60vh] space-y-6  ">
          {loadingComments && <MiniLoader />}

          {comments.map((c) => (
            <div key={c.id} className="flex items-center gap-3 pb-3 ">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {c.user_Avatar}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{c.user_Name}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {formatTime(c.created_Timestamp)}
                  </div>
                </div>
                <p className="text-[var(--text-primary)] mt-1">{c.comment_Text}</p>

              </div>
            </div>

          ))}

          {!loadingComments && comments.length === 0 && (
            <p className="text-center text-[var(--text-primary)]mt-4">No comments yet.</p>
          )}

        </div>

        <div className="  absolute bottom-0 right-0 left-0 p-4 border-t flex gap-3">
          <input
            ref={inputRef}
            className="flex-1 p-3 bg-[var(--bg-tertiary)] border-1 border-[var(--border-color)] rounded-lg  placeholder:text-[var(--text-tertiary)]"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handlePostComment();
              }
            }}
          />
          <button
            onClick={handlePostComment}
            className="px-6 py-3 bg-[var(--accent-color)] text-[var(--button-text)] rounded-lg hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
};

export default CommentsPopup;
