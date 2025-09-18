"use server";

import { redirect } from "next/navigation";
import { PostSchema } from "@/validations/contact";
import { prisma } from "@/lib/prisma";

// ActionStateの型定義
type ActionState = {
  success: boolean;
  errors: {
    title?: string[];
    content?: string[];
  };
  serverError?: string;
};

export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // バリデーション
  const validationResult = PostSchema.safeParse({ title, content });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    console.log("サーバー側でエラー", errors);
    return {
      success: false,
      errors: {
        title: errors.title || [],
        content: errors.content || [],
      },
    };
  }
  // DB登録
  //タイトルが存在しているかの確認
  const existingRecord = await prisma.post.findUnique({
    where: { title },
  });

  if (existingRecord) {
    return {
      success: false,
      errors: {
        title: ["この投稿内容は既に登録されています"],
        content: [],
      },
    };
  }

  await prisma.post.create({
    data: { title, content, user: { connect: { id: 1 } } },
  });

  console.log("送信されたデータ", title, content);
  redirect("/");
}
