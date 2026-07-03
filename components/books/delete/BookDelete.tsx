"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchBook } from "@/components/hooks/useSearchBook";
import { useDeleteBook } from "@/components/hooks/useDeleteBook";
import { HomeButton } from "@/components/common/HomeButton";
import { Sidebar } from "@/components/common/Sidebar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
    AlertCircle,
    Home,
    Loader2,
    Search,
    Trash2,
} from "lucide-react";

export const BookDelete = () => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const {
        Books,
        isLoading: isSearching,
        error: searchError,
        search,
    } = useSearchBook();

    const {
        selectedBook,
        isLoading,
        isConfirmOpen,
        isSuccess,
        errors,
        selectBook,
        openConfirm,
        closeConfirm,
        confirmDelete,
        resetDelete,
    } = useDeleteBook();

    const handleSearchClick = () => {
        search(keyword);
    };

    const handleDeleteClick = (book: any) => {
        selectBook(book);
        openConfirm();
    };

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar />

                <SidebarInset>
                    <main className="min-h-screen bg-[url('/pink_back.png')] px-6 py-10 text-[#5b3a1e]">
                        <div className="absolute inset-0 bg-[#fffdf7]/40" />
                        <div className="relative z-10">
                            <Card className="mx-auto max-w-5xl rounded-[2rem] border-red-100 bg-white/90 shadow-sm">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                                        <Trash2 className="h-8 w-8 text-red-500" />
                                    </div>

                                    <CardTitle className="text-3xl font-bold text-[#6b4226]">
                                        図書削除
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-8">
                                    <div className="rounded-[1.5rem] border border-red-100 bg-red-50/50 p-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
                                            <Input
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                placeholder="削除したい図書名を検索してください"
                                                className="h-12 max-w-md rounded-full border-red-200 bg-white px-5"
                                            />

                                            <Button
                                                onClick={handleSearchClick}
                                                disabled={isSearching || !keyword.trim()}
                                                className="h-12 rounded-full bg-red-400 px-10 font-bold hover:bg-red-500"
                                            >
                                                {isSearching ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        検索中...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Search className="mr-2 h-4 w-4" />
                                                        検索する
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {(searchError || errors.submit) && (
                                        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                                            <AlertCircle className="h-5 w-5" />
                                            <span className="font-medium">
                                                {searchError || errors.submit}
                                            </span>
                                        </div>
                                    )}

                                    {Books.length > 0 && (
                                        <div className="overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-sm">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-orange-50">
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            タイトル
                                                        </TableHead>
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            著者
                                                        </TableHead>
                                                        <TableHead className="font-bold text-[#6b4226]">
                                                            カテゴリ
                                                        </TableHead>
                                                        <TableHead className="text-right font-bold text-[#6b4226]">
                                                            在庫数
                                                        </TableHead>
                                                        <TableHead className="text-center font-bold text-[#6b4226]">
                                                            操作
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>

                                                <TableBody>
                                                    {Books.map((book) => (
                                                        <TableRow
                                                            key={book.bookId}
                                                            className="hover:bg-red-50/50"
                                                        >
                                                            <TableCell className="font-bold">
                                                                {book.title}
                                                            </TableCell>
                                                            <TableCell>{book.author}</TableCell>
                                                            <TableCell>{book.category.name}</TableCell>
                                                            <TableCell className="text-right">
                                                                {book.stock} 冊
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    onClick={() => handleDeleteClick(book)}
                                                                    className="rounded-full border-red-200 px-5 font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    削除
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {Books.length === 0 && !isSearching && (
                                        <div className="rounded-[1.5rem] border border-orange-100 bg-white/80 p-10 text-center">
                                            <div className="mb-3 text-5xl">🐇</div>
                                            <p className="font-semibold text-[#8a6b4f]">
                                                削除したい図書を検索してください。
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <HomeButton />

                            <AlertDialog open={isConfirmOpen} onOpenChange={closeConfirm}>
                                <AlertDialogContent className="rounded-[2rem] border-red-100 bg-[#fffdf7] p-8 text-[#5b3a1e] shadow-xl">
                                    <AlertDialogHeader className="text-center">
                                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-4xl">
                                            🗑️
                                        </div>

                                        <AlertDialogTitle className="flex w-full justify-center text-2xl font-bold text-[#6b4226]">
                                            この図書を削除しますか？
                                        </AlertDialogTitle>

                                        <div className="flex w-full justify-center pt-4 text-[#8a6b4f]">
                                            <div className="mx-auto w-fit min-w-48 space-y-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 text-left">
                                                <div>
                                                    <span className="font-bold text-[#6b4226]">図書名：</span>
                                                    {selectedBook?.title}
                                                </div>

                                                <div>
                                                    <span className="font-bold text-[#6b4226]">著者：</span>
                                                    {selectedBook?.author}
                                                </div>

                                                <div>
                                                    <span className="font-bold text-[#6b4226]">在庫数：</span>
                                                    {selectedBook?.stock} 冊
                                                </div>
                                            </div>
                                        </div>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter className="mt-6 gap-3 sm:justify-center">
                                        <AlertDialogCancel className="rounded-full border-red-200 px-8 text-[#6b4226] hover:bg-red-50">
                                            キャンセル
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={confirmDelete}
                                            className="rounded-full !bg-red-400 px-8 font-bold text-white hover:!bg-red-500"
                                        >
                                            {isLoading ? "削除中..." : "削除する"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {isSuccess && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="w-96 rounded-[2rem] bg-white p-8 text-center shadow-lg">
                                        <div className="mb-3 text-5xl">🗑️</div>

                                        <h3 className="mb-4 text-xl font-bold text-[#6b4226]">
                                            削除完了
                                        </h3>

                                        <p className="mb-8 text-[#8a6b4f]">
                                            図書の削除が完了しました。
                                        </p>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    resetDelete();
                                                    search(keyword);
                                                }}
                                                className="flex-1 rounded-full"
                                            >
                                                続けて削除する
                                            </Button>

                                            <Button
                                                onClick={() => router.push("/home")}
                                                className="flex-1 rounded-full bg-orange-400 hover:bg-orange-500"
                                            >
                                                <Home className="mr-2 h-4 w-4" />
                                                ホームへ戻る
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};