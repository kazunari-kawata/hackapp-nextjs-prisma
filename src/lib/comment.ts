import { prisma } from "@/lib/prisma";

/**
 * すべてのコメントを取得する関数
 * 投稿された全コメントを配列で返します。
 * 例：記事詳細ページや管理画面でコメント一覧を表示したいときに使います。
 */
export async function getComments() {
  return await prisma.comment.findMany({
    select: {
      id: true, // コメントのID
      post_id: true, // どの投稿へのコメントか
      user_id: true, // コメントしたユーザーのID
      content: true, // コメント本文
      created_at: true, // コメントした日時
    },
    orderBy: {
      created_at: "desc", // 新しい順に並べる
    },
  });
}

/**
 * 指定したIDのコメント1件を取得する関数
 * @param id 取得したいコメントのID
 * 例：コメント詳細画面や編集時に使います。
 */
export async function getCommentById(id: number) {
  return await prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      content: true,
      created_at: true,
    },
  });
}

/**
 * 新しいコメントを作成する関数
 * @param data post_id: コメントする投稿のID, user_id: コメントしたユーザーのID, content: コメント本文
 * 例：ユーザーがコメントを投稿したときに呼び出します。
 */
export async function createComment(data: {
  post_id: number;
  user_id: number;
  content: string;
}) {
  return await prisma.comment.create({
    data: {
      post_id: data.post_id,
      user_id: data.user_id,
      content: data.content,
    },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      content: true,
      created_at: true,
    },
  });
}

/**
 * コメント内容を更新する関数
 * @param id 更新したいコメントのID
 * @param data content: 新しいコメント本文
 * 例：ユーザーが自分のコメントを編集したいときに使います。
 */
export async function updateComment(id: number, data: { content?: string }) {
  return await prisma.comment.update({
    where: { id },
    data,
    select: {
      id: true,
      post_id: true,
      user_id: true,
      content: true,
      created_at: true,
    },
  });
}

/**
 * コメントを削除する関数
 * @param id 削除したいコメントのID
 * 例：ユーザーが自分のコメントを削除したいときや、管理者が不適切なコメントを消したいときに使います。
 */
export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      content: true,
      created_at: true,
    },
  });
}
