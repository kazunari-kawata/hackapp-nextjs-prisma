"use client";

import { useEffect, useState } from "react";

type ReactionProps = {
  postId: number;
  userId: number;
};

export default function Reaction({ postId, userId }: ReactionProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // 初期ロード
  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`/api/post-likes?postId=${postId}`);
      const likes = await res.json();
      setLikeCount(likes.length);
      setLiked(likes.some((like: undefined) => like.user_id === userId));
    };
    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    if (liked) {
      await fetch(`/api/post-likes?postId=${postId}&userId=${userId}`, {
        method: "DELETE",
      });
      setLikeCount((c) => c - 1);
      setLiked(false);
    } else {
      await fetch(`/api/post-likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
      setLikeCount((c) => c + 1);
      setLiked(true);
    }
  };
  

  return (
    <div>
      <div className="text-xs text-gray-400 mb-2 hidden">Post ID: {postId}</div>
      <ul className="flex space-x-4">
        <li>
          <button onClick={handleLike} className={liked ? "text-blue-500" : ""}>
            👍 いいね <span className="text-gray-400">{likeCount}</span>
          </button>
        </li>
        <li>
          💬 コメント <span className="text-gray-400">0</span>
        </li>
        <li>
          ↑ アゲ <span className="text-gray-400">0</span>
        </li>
        <li>
          ↓ サゲ <span className="text-gray-400">0</span>
        </li>
        <li>
          📥 保存 <span className="text-gray-400">0</span>
        </li>
      </ul>
    </div>
  );
}
