import { prisma } from "@/lib/prisma";

/**
 * 投稿に「いいね」を追加する（DB登録）関数
 * @param post_id いいねする投稿のID
 * @param user_id いいねしたユーザーのID
 * @returns 作成されたPostLikeオブジェクト
 */
export async function createPostLike(post_id: number, user_id: number) {
  return await prisma.postLike.create({
    data: {
      post_id,
      user_id,
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
 * 投稿の「いいね」を削除する（DBから削除）関数
 * @param post_id どの投稿か
 * @param user_id どのユーザーか
 * @returns 削除されたPostLikeオブジェクト
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
