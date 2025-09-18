import { prisma } from "@/lib/prisma";

/**
 * コメントへの「いいね」全件を取得する関数
 * すべてのCommentLikeレコード（誰がどのコメントにいいねしたか）を配列で返します。
 * 例：管理画面や集計などで利用できます。
 */
export async function getCommentLikes() {
  return await prisma.commentLike.findMany({
    select: {
      id: true, // いいねのID
      comment_id: true, // どのコメントへのいいねか
      user_id: true, // どのユーザーがいいねしたか
      created_at: true, // いいねした日時
    },
    orderBy: {
      created_at: "desc", // 新しい順に並べる
    },
  });
}

/**
 * 指定したIDの「コメントいいね」1件を取得する関数
 * @param id 取得したいCommentLikeのID
 * 例：詳細画面や個別操作時に利用します。
 */
export async function getCommentLikeById(id: number) {
  return await prisma.commentLike.findUnique({
    where: { id },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * コメントに「いいね」を新規作成する関数
 * @param data comment_id: いいねするコメントのID, user_id: いいねしたユーザーのID
 * 例：ユーザーがコメントにいいねボタンを押したときに呼び出します。
 */
export async function createCommentLike(data: {
  comment_id: number;
  user_id: number;
}) {
  return await prisma.commentLike.create({
    data: {
      comment_id: data.comment_id,
      user_id: data.user_id,
    },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * IDを指定して「コメントいいね」を削除する関数
 * @param id 削除したいCommentLikeのID
 * 例：管理者が不正な「いいね」を削除したい場合などに使います。
 */
export async function deleteCommentLike(id: number) {
  return await prisma.commentLike.delete({
    where: { id },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * コメントIDとユーザーIDの組み合わせで「コメントいいね」を削除する関数
 * @param comment_id どのコメントか
 * @param user_id どのユーザーか
 * 例：ユーザーが自分の「いいね」を取り消したいときなどに使います。
 */
export async function deleteCommentLikeByCommentAndUser(
  comment_id: number,
  user_id: number
) {
  return await prisma.commentLike.delete({
    where: {
      comment_id_user_id: {
        comment_id,
        user_id,
      },
    },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      created_at: true,
    },
  });
}
