import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 非ログイン状態の時はログインページへリダイレクトさせる
export function middleware(request: NextRequest) {
    if(!request.nextUrl.pathname.includes('.')){
        console.log("ミドルウェアのテスト");
    } return NextResponse.next();
}

// ミドルウェアを特定のパスにのみ適用する設定
// 練習でpost配下のパスにのみ適用 -> 後日要検討／変更
export const config = {
    matcher: ['/post/:path*']
}