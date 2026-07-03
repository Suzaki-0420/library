"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchBook } from "@/components/hooks/useSearchBook";
import { AlertCircle, BookOpen, Search, Sparkles } from "lucide-react";
import { HomeButton } from "@/components/common/HomeButton";
import { Sidebar } from "@/components/common/Sidebar";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

export const BookSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const { Books, isLoading, error, search } = useSearchBook();

    const handleSearchClick = () => {
        search(keyword);
    };

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar />

                <SidebarInset>
                    <main className="min-h-screen bg-[url('/bule_back.png')] px-6 py-10 text-[#5b3a1e]">
                        <div className="absolute inset-0 bg-[#fffdf7]/40" />
                        <div className="relative z-10">
                            <Card className="mx-auto max-w-5xl rounded-[2rem] border-sky-100 bg-white/90 shadow-sm">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
                                        <BookOpen className="h-8 w-8 text-sky-500" />
                                    </div>

                                    <CardTitle className="text-3xl font-bold text-[#6b4226]">
                                        図書キーワード検索
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="mb-8 rounded-[1.5rem] border border-sky-100 bg-sky-50/70 p-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
                                            <Input
                                                type="text"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                placeholder="1～50文字で検索したいキーワードを入力してください"
                                                className="h-12 max-w-md rounded-full border-sky-200 bg-white px-5"
                                            />

                                            <Button
                                                onClick={handleSearchClick}
                                                disabled={isLoading || !keyword.trim()}
                                                className="h-12 rounded-full bg-sky-500 px-10 font-bold hover:bg-sky-600"
                                            >
                                                <Search className="mr-2 h-4 w-4" />
                                                {isLoading ? "検索中..." : "検索する"}
                                            </Button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                                            <AlertCircle className="h-5 w-5" />
                                            <span className="font-medium">{error}</span>
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div className="space-y-3">
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                        </div>
                                    )}

                                    {Books.length === 0 && !isLoading && (
                                        <div className="rounded-[1.5rem] border border-sky-100 bg-white/80 p-10 text-center">
                                            <div className="mb-3 text-5xl">🌳</div>
                                            <p className="font-semibold text-[#8a6b4f]">
                                                図書が見つかりません。キーワードを入力して検索してください。
                                            </p>
                                        </div>
                                    )}

                                    {Books.length > 0 && !isLoading && (
                                        <div className="overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-sm">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-orange-50">
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            タイトル
                                                        </TableHead>
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            カテゴリ
                                                        </TableHead>
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            著者
                                                        </TableHead>
                                                        <TableHead className="text-right font-bold text-[#6b4226]">
                                                            在庫数
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>

                                                <TableBody>
                                                    {Books.map((book) => (
                                                        <TableRow
                                                            key={book.bookId}
                                                            className="hover:bg-green-50/60"
                                                        >
                                                            <TableCell className="font-bold text-[#5b3a1e]">
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <span className="inline-flex cursor-help items-center gap-2">
                                                                            <Sparkles className="h-4 w-4 text-amber-400" />
                                                                            {book.title}
                                                                        </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        図書ID：{book.bookId}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TableCell>

                                                            <TableCell className="text-[#6b4226]">
                                                                {book.category.name}
                                                            </TableCell>

                                                            <TableCell className="text-[#6b4226]">
                                                                {book.author}
                                                            </TableCell>

                                                            <TableCell className="text-right">
                                                                {book.stock} 冊
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <HomeButton />
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};