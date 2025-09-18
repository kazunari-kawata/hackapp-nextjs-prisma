import { prisma } from "@/lib/prisma";

export async function getPosts() {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

/**
 * すべての投稿データ（Post）を取得する関数
 * 投稿一覧ページやトップページなどで、全ての投稿を新しい順に取得したいときに使います。
 * タイトル・本文・IDのみを返します。
 */

export type Post = { id: number; title: string; content: string };
