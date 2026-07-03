"use client";

import Link from "next/link";
import {
    Search,
    Plus,
    Pencil,
    UserPlus,
    BookOpen,
    LogOut,
    Home,
    LibraryBig,
    TreePine,
    Rabbit,
    Bird,
    BookMarked,
} from "lucide-react";
import Image from "next/image";
import { Sidebar } from "@/components/common/Sidebar";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function MenuPage() {
    const menuItems = [
        {
            title: "図書キーワード検索",
            description: "図書の検索・確認ができます",
            href: "/books",
            icon: Search,
            buttonText: "検索する",
            color: "border-sky-200 bg-[#eef6fd]/80 text-sky-600",
            buttonColor: "bg-sky-500 hover:bg-sky-600",
            emoji: "📖",
            src: "/1.png",
        },
        {
            title: "図書の登録",
            description: "新しい図書を登録します",
            href: "/books/new",
            icon: Plus,
            buttonText: "登録する",
            color: "border-green-200 bg-[#f1f8ec]/80 text-green-600",
            buttonColor: "bg-green-500 hover:bg-green-600",
            emoji: "🐿️",
            src: "/2.png",
        },
        {
            title: "図書の変更",
            description: "登録済みの図書を変更します",
            href: "/books/edit",
            icon: Pencil,
            buttonText: "変更する",
            color: "border-amber-200 bg-[#fef7ec]/80 text-amber-600",
            buttonColor: "bg-amber-500 hover:bg-amber-600",
            emoji: "✏️",
            src: "/3.png",
        },

        {
            title: "図書の削除",
            description: "図書の削除が行えます",
            href: "/books/delete",
            icon: BookOpen,
            buttonText: "削除する",
            color: "border-pink-200 bg-[#fef3f0]/80 text-[#eb6fde]",
            buttonColor: "bg-[#eb6fde] hover:bg-[#c652ba]",
            emoji: "🛒",
            src: "/4.png",
        },

    ];

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar />

                <SidebarInset className="bg-[url('/back.png')] bg-cover bg-center bg-fixed">
                    <main className="relative min-h-screen w-full overflow-hidden p-10 text-[#5b3a1e]">
                        {/* メイン */}
                        <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-green-100/80 to-transparent" />
                        <div className="absolute right-10 top-8 text-5xl"></div>
                        <div className="absolute bottom-8 right-10 text-6xl"></div>

                        <div className="relative z-10 mb-8 rounded-[2rem] border border-orange-100 bg-white/80 p-8 shadow-sm">
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-4xl font-bold text-[#6b4226]">
                                        こんにちは、図書の森へ！
                                    </h2>
                                    <p className="mt-3 text-[#8a6b4f]">
                                        今日もわくわくしながら図書管理をしていきましょう♪
                                    </p>
                                </div>

                                <div className="hidden rounded-full bg-green-50 p-6 text-6xl shadow-sm md:block">
                                    🌿
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 justify-items-center">
                            {menuItems.map((item) => {
                                return (
                                    <div
                                        key={item.title}
                                        className={`w-full max-w-2xl rounded-[2rem] border-2 ${item.color} p-3 shadow-sm transition `}
                                    >
                                        <h3 className="text-center text-xl font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-center text-sm text-gray-600">
                                            {item.description}
                                        </p>

                                        <div className="mt-4 flex h-[140px] items-center justify-center">
                                            <Image
                                                src={item.src}
                                                alt={`${item.title}のイラスト`}
                                                width={220}
                                                height={140}
                                                className="object-contain"
                                                priority
                                            />
                                        </div>

                                        <Link
                                            href={item.href}
                                            className={`mt-4 flex items-center justify-center rounded-full px-4 py-3 font-bold text-white shadow-sm transition ${item.buttonColor}`}
                                        >
                                            {item.buttonText}
                                            <span className="ml-2">›</span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative z-10 mt-8 rounded-[2rem] border border-orange-100 bg-white/80 p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Bird className="h-6 w-6 text-orange-400" />
                                <div>
                                    <p className="font-bold text-[#6b4226]">お知らせ</p>
                                    <p className="text-sm text-gray-500">
                                        図書管理システムのメンテナンス予定：毎週日曜日 2:00〜4:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}