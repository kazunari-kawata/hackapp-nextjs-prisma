import { NextResponse } from "next/server";
import {
  getPostLikes,
  createPostLike,
  deletePostLikeByPostAndUser,
} from "@/lib/dao/post_like";

// GET: 投稿のいいね一覧を返す
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));
  const likes = await getPostLikes(postId);
  return NextResponse.json(likes);
}

// POST: 投稿にいいね追加
export async function POST(req: Request) {
  const { post_id, user_id } = await req.json();
  const like = await createPostLike({ post_id, user_id });
  return NextResponse.json(like);
}

// DELETE: 投稿のいいねを削除
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));
  const userId = Number(searchParams.get("userId"));
  await deletePostLikeByPostAndUser(postId, userId);
  return NextResponse.json({ ok: true });
}
