"use client";

import Link from "next/link";
import { LibraryBig, Sparkles } from "lucide-react";

export default function TopPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[url('/home.png')] text-[#5b3a1e]">

      <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-[#718f45] bg-white/85 p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#e7efdb] shadow-sm">
          <LibraryBig className="h-12 w-12 text-[#718f45]" />
        </div>

        <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-[#718f45]">
          <Sparkles className="h-4 w-4" />
          LIBRARY FOREST
          <Sparkles className="h-4 w-4" />
        </div>

        <h1 className="text-4xl font-bold text-[#6b4226]">
          図書の森へようこそ
        </h1>

        <p className="mt-4 text-[#8a6b4f]">
          図書の検索・登録・変更・削除を行える管理システムです。
        </p>

        <Link
          href="/home"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#718f45] px-10 py-4 font-bold text-white shadow-sm transition hover:bg-orange-500"
        >
          ホームへ
          <span className="ml-2">›</span>
        </Link>
      </div>
    </div>
  );
}