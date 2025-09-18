import { Post as PostType } from "@/lib/dao/post";
import Reaction from "./Reaction";
import UserHeader from "./UserHeader";

export default function Post({ post }: { post: PostType }) {
  return (
    <>
      {/* ユーザーデータが反映されるように */}
      {/* <div>
        <UserHeader username={post.userName} avatarUrl={post.userAvatarUrl} />
      </div> */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 leading-relaxed">{post.content}</p>
        <div className={"mt-4 flex justify-center"}>
          <Reaction postId={post.id} />
        </div>
      </div>
    </>
  );
}
