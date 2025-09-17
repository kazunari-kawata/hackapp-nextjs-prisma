type ReactionProps = {
  postId: number;
};

export default function Reaction({ postId }: ReactionProps) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-2 hidden">Post ID: {postId}</div>
      <ul className="flex space-x-4">
        <li>👍 いいね</li>
        <li>💬 コメント</li>
        <li>↑ アゲ</li>
        <li>↓ サゲ</li>
        <li>📥 保存</li>
      </ul>
    </div>
  );
}
