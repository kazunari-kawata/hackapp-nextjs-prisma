import { Post as PostType } from "@/lib/dao/post"; // 投稿データの型
import UserHeader from "./UserHeader"; // UserHeaderコンポーネントをインポート

// 仮のユーザー情報（実際にはPostTypeに含めるか、別途取得します）
// 例としてPostTypeにuserNameとuserAvatarUrlを追加したと仮定します
// export type Post = { id: string; title: string; content: string; userName: string; userAvatarUrl?: string; created_at?: string; };

export default function Post({ post }: { post: PostType }) {
  // 投稿日時を整形する関数（例）
  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    // 実際には日付ライブラリなどを使ってより複雑な整形を行います
    return date.toLocaleString(); // 例: "2023/10/27 15:30:00"
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      {/* ユーザーヘッダーコンポーネントを使用 */}
      {/* TODO: 投稿データのuserNameとuserAvatarUrl（またはPostTypeのcreated_at）を渡すことを想定 */}
      <UserHeader
        userName={post.user_name || "匿名ユーザー"} // PostTypeにuserNameがあることを想定
        userAvatarUrl={post.user_avatar_url} // PostTypeにuserAvatarUrlがあることを想定
        timestamp={formatTimestamp(post.created_at)} // PostTypeにcreated_atがあることを想定
      />

      <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      {/* ここに「いいね」ボタンやコメント数、シェアボタンなどを追加していくことができます */}
      <div className="flex justify-end text-sm text-gray-500 mt-3">
        {/* 例: <span>いいね: 12</span> <span>コメント: 3</span> */}
      </div>
    </div>
  );
}
