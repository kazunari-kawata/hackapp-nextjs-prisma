import { prisma } from "@/lib/prisma";

/**
 * すべての投稿への投票（GOOD/BAD）を取得する関数
 * 投稿に対して誰がどんな投票をしたかの全データを配列で返します。
 * 例：管理画面や集計などで利用できます。
 */
export async function getPostVotes() {
  return await prisma.postVote.findMany({
    select: {
      id: true, // 投票のID
      post_id: true, // どの投稿への投票か
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
 * 指定したIDの投稿投票1件を取得する関数
 * @param id 取得したいPostVoteのID
 * 例：詳細画面や個別操作時に利用します。
 */
export async function getPostVoteById(id: number) {
  return await prisma.postVote.findUnique({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * 投稿に投票（GOOD/BAD）を新規作成する関数
 * @param data post_id: 投票する投稿のID, user_id: 投票したユーザーのID, vote_type: "GOOD"または"BAD"
 * 例：ユーザーが投稿にGOOD/BADボタンを押したときに呼び出します。
 */
export async function createPostVote(data: {
  post_id: number;
  user_id: number;
  vote_type: "GOOD" | "BAD";
}) {
  return await prisma.postVote.create({
    data: {
      post_id: data.post_id,
      user_id: data.user_id,
      vote_type: data.vote_type,
    },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * IDを指定して投稿投票を削除する関数
 * @param id 削除したいPostVoteのID
 * 例：管理者が不正な投票を削除したい場合などに使います。
 */
export async function deletePostVote(id: number) {
  return await prisma.postVote.delete({
    where: { id },
    select: {
      id: true,
      post_id: true,
      user_id: true,
      vote_type: true,
      created_at: true,
    },
  });
}

/**
 * 投稿IDとユーザーIDの組み合わせで投稿投票を削除する関数
 * @param post_id どの投稿か
 * @param user_id どのユーザーか
 * 例：ユーザーが自分の投票を取り消したいときなどに使います。
 */
export async function deletePostVoteByPostAndUser(
  post_id: number,
  user_id: number
) {
  return await prisma.postVote.delete({
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
      vote_type: true,
      created_at: true,
    },
  });
}
