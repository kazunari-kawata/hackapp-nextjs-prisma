import { prisma } from "@/lib/prisma";

/**
 * すべての投稿への「いいね」を取得する関数
 * 投稿に対して誰が「いいね」したかの全データを配列で返します。
 * 例：管理画面や集計などで利用できます。
 */
export async function getPostLikes() {
  return await prisma.postLike.findMany({
    select: {
      id: true, // いいねのID
      post_id: true, // どの投稿へのいいねか
      user_id: true, // どのユーザーがいいねしたか
      created_at: true, // いいねした日時
    },
    orderBy: {
      created_at: "desc", // 新しい順に並べる
    },
  });
}

/**
 * 指定したIDの「投稿いいね」1件を取得する関数
 * @param id 取得したいPostLikeのID
 * 例：詳細画面や個別操作時に利用します。
 */
export async function getPostLikeById(id: number) {
  return await prisma.postLike.findUnique({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * 投稿に「いいね」を新規作成する関数
 * @param data post_id: いいねする投稿のID, user_id: いいねしたユーザーのID
 * 例：ユーザーが投稿にいいねボタンを押したときに呼び出します。
 */
export async function createPostLike(data: {
  post_id: number;
  user_id: number;
}) {
  return await prisma.postLike.create({
    data: {
      post_id: data.post_id,
      user_id: data.user_id,
    },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * IDを指定して「投稿いいね」を削除する関数
 * @param id 削除したいPostLikeのID
 * 例：管理者が不正な「いいね」を削除したい場合などに使います。
 */
export async function deletePostLike(id: number) {
  return await prisma.postLike.delete({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      created_at: true,
    },
  });
}

/**
 * 投稿IDとユーザーIDの組み合わせで「投稿いいね」を削除する関数
 * @param post_id どの投稿か
 * @param user_id どのユーザーか
 * 例：ユーザーが自分の「いいね」を取り消したいときなどに使います。
 */
export async function deletePostLikeByPostAndUser(
  post_id: number,
  user_id: number
) {
  return await prisma.postLike.delete({
    where: {
      post_id_user_id: {
        post_id,
        user_id,
      },
    },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      created_at: true,
    },
  });
}
