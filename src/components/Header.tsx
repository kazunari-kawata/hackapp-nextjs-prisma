"use client";

import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* 左側のロゴ */}
        <div className="text-2xl font-bold">
          <a href="/">HackUp</a>
        </div>

        {/* 右側のナビゲーションメニュー (lg以上の画面で表示) */}
        <nav className="hidden md:flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              {/* <a href="/contacts" className="hover:text-gray-300">
                投稿作成
              </a> */}
            </li>
            <li>
              <a href="/login" className="hover:text-gray-300">
                Login
              </a>
            </li>
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
