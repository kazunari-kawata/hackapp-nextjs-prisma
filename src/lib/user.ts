import { prisma } from "@/lib/prisma";

/**
 * すべてのユーザー情報を取得する関数
 * ユーザー管理画面やランキング表示など、全ユーザーの一覧を取得したいときに使います。
 */
export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true, // ユーザーID
      username: true, // ユーザー名
      icon_url: true, // アイコン画像のURL
      karma_score: true, // カルマスコア
    },
    orderBy: {
      id: "asc", // ID順に並べる
    },
  });
}

/**
 * 指定したIDのユーザー情報を取得する関数
 * @param id 取得したいユーザーのID
 * 例：プロフィール画面やユーザー詳細ページで使います。
 */
export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      icon_url: true,
      karma_score: true,
    },
  });
}

/**
 * 新しいユーザーを作成する関数
 * @param data username: ユーザー名, icon_url: アイコン画像のURL（省略可）
 * 例：ユーザー登録画面で新規ユーザーを追加したいときに使います。
 */
export async function createUser(data: {
  username: string;
  icon_url?: string;
}) {
  return await prisma.user.create({
    data: {
      username: data.username,
      icon_url: data.icon_url,
    },
    select: {
      id: true,
      username: true,
      icon_url: true,
      karma_score: true,
    },
  });
}

/**
 * ユーザー情報を更新する関数
 * @param id 更新したいユーザーのID
 * @param data username/icon_url/karma_score など変更したい項目
 * 例：ユーザーがプロフィールを編集したいときや、管理者がスコアを修正したいときに使います。
 */
export async function updateUser(
  id: number,
  data: { username?: string; icon_url?: string; karma_score?: number }
) {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      username: true,
      icon_url: true,
      karma_score: true,
    },
  });
}

/**
 * ユーザーを削除する関数
 * @param id 削除したいユーザーのID
 * 例：ユーザーが退会したいときや、管理者が不正ユーザーを削除したいときに使います。
 */
export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      username: true,
      icon_url: true,
      karma_score: true,
    },
  });
}
