import { prisma } from "@/lib/prisma";

/**
 * コメントへの投票（GOOD/BAD）全件を取得する関数
 * すべてのCommentVoteレコード（誰がどのコメントに投票したか）を配列で返します。
 * 例：管理画面や集計などで利用できます。
 */
export async function getCommentVotes() {
  return await prisma.commentVote.findMany({
    select: {
      id: true, // 投票のID
      comment_id: true, // どのコメントへの投票か
      user_id: true, // どのユーザーが投票したか
      vote_type: true, // GOODかBADか
      created_at: true, // 投票した日時
    },
    orderBy: {
      created_at: "desc", // 新しい順に並べる
    },
  });
}

/**
 * 指定したIDのコメント投票1件を取得する関数
 * @param id 取得したいCommentVoteのID
 * 例：詳細画面や個別操作時に利用します。
 */
export async function getCommentVoteById(id: number) {
  return await prisma.commentVote.findUnique({
    where: { id },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * コメントに投票（GOOD/BAD）を新規作成する関数
 * @param data comment_id: 投票するコメントのID, user_id: 投票したユーザーのID, vote_type: "GOOD"または"BAD"
 * 例：ユーザーがコメントにGOOD/BADボタンを押したときに呼び出します。
 */
export async function createCommentVote(data: {
  comment_id: number;
  user_id: number;
  vote_type: "GOOD" | "BAD";
}) {
  return await prisma.commentVote.create({
    data: {
      comment_id: data.comment_id,
      user_id: data.user_id,
      vote_type: data.vote_type,
    },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * IDを指定してコメント投票を削除する関数
 * @param id 削除したいCommentVoteのID
 * 例：管理者が不正な投票を削除したい場合などに使います。
 */
export async function deleteCommentVote(id: number) {
  return await prisma.commentVote.delete({
    where: { id },
    select: {
      id: true,
      comment_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * コメントIDとユーザーIDの組み合わせでコメント投票を削除する関数
 * @param comment_id どのコメントか
 * @param user_id どのユーザーか
 * 例：ユーザーが自分の投票を取り消したいときなどに使います。
 */
export async function deleteCommentVoteByCommentAndUser(
  comment_id: number,
  user_id: number
) {
  return await prisma.commentVote.delete({
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
      vote_type: true,
      created_at: true,
    },
  });
}
