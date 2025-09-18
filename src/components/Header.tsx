"use client";

import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 md:min-h-screen">
      <div className="container mx-auto flex justify-between items-start">
        {/* 左側のロゴ */}
        <div className="text-2xl font-bold">
          <Link href="/">HackUp</Link>
        </div>

        {/* 右側のナビゲーションメニュー (lg以上の画面で表示) */}
  <nav className="hidden md:flex mt-64">
          <ul className="flex flex-col space-y-8">
            <li>
              <Link
                href="/about"
                className="hover:text-gray-300 text-2xl px-8 block"
              >
                HackUpとは
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 text-2xl px-8 py-4 block">
                投稿する
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-gray-300 text-2xl px-8 block"
              >
                ログイン
              </Link>
            </li>
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
