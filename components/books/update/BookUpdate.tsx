"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchBook } from "@/components/hooks/useSearchBook";
import { useUpdateBook } from "@/components/hooks/useUpdateBook";
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
    BookOpen,
    CheckCircle2,
    Home,
    Loader2,
    Pencil,
    Search,
} from "lucide-react";

export const BookUpdate = () => {
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
        editTitle,
        editAuthor,
        editStock,
        isLoading,
        isConfirmOpen,
        isSuccess,
        errors,

        setEditTitle,
        setEditAuthor,
        setEditStock,
        selectBook,
        update,
        handleTitleBlur,
        handleAuthorBlur,
        openConfirm,
        closeConfirm,
        confirmUpdate,
    } = useUpdateBook();

    const handleSearchClick = () => {
        search(keyword);
    };

    const hasError =
        !!errors.title ||
        !!errors.author ||
        !!errors.stock ||
        !!errors.submit ||
        !!errors.system;

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar />

                <SidebarInset>
                    <main className="min-h-screen bg-[url('/orange_back.png')] px-6 py-10 text-[#5b3a1e]">
                        <div className="absolute inset-0 bg-[#fffdf7]/60" />
                        <div className="relative z-10">
                            <Card className="mx-auto max-w-5xl rounded-[2rem] border-amber-100 bg-white/90 shadow-sm">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                                        <Pencil className="h-8 w-8 text-amber-500" />
                                    </div>

                                    <CardTitle className="text-3xl font-bold text-[#6b4226]">
                                        図書情報の変更
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-8">
                                    <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50/60 p-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
                                            <Input
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                placeholder="変更したい図書名を検索してください"
                                                className="h-12 max-w-md rounded-full border-amber-200 bg-white px-5"
                                            />

                                            <Button
                                                onClick={handleSearchClick}
                                                disabled={isSearching || !keyword.trim()}
                                                className="h-12 rounded-full bg-amber-500 px-10 font-bold hover:bg-amber-600"
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

                                    {searchError && (
                                        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                                            <AlertCircle className="h-5 w-5" />
                                            <span className="font-medium">{searchError}</span>
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
                                                            className="hover:bg-amber-50/70"
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
                                                                    onClick={() => selectBook(book)}
                                                                    className="rounded-full bg-amber-500 px-5 font-bold hover:bg-amber-600"
                                                                >
                                                                    選択
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {!selectedBook && Books.length === 0 && !isSearching && (
                                        <div className="rounded-[1.5rem] border border-orange-100 bg-white/80 p-10 text-center">
                                            <div className="mb-3 text-5xl">🦊</div>
                                            <p className="font-semibold text-[#8a6b4f]">
                                                変更したい図書を検索してください。
                                            </p>
                                        </div>
                                    )}

                                    {selectedBook && (
                                        <div className="rounded-[1.5rem] border border-amber-100 bg-white p-6 shadow-sm">
                                            <div className="mb-5 flex items-center gap-2">
                                                <BookOpen className="h-5 w-5 text-amber-500" />
                                                <h3 className="text-xl font-bold text-[#6b4226]">
                                                    選択中の図書を編集
                                                </h3>
                                            </div>

                                            {(errors.submit || errors.system) && (
                                                <div className="mb-5 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                                                    <AlertCircle className="h-5 w-5" />
                                                    {errors.submit || errors.system}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-[2fr_1.5fr_1fr]">
                                                <div className="space-y-2">
                                                    <label className="font-bold">図書名</label>
                                                    <Input
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        onBlur={handleTitleBlur}
                                                        className={`h-12 rounded-full bg-white px-5 ${errors.title
                                                            ? "border-red-300"
                                                            : "border-amber-200"
                                                            }`}
                                                    />
                                                    {errors.title && (
                                                        <p className="flex items-center gap-1 text-sm text-red-500">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {errors.title}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-bold">著者</label>
                                                    <Input
                                                        value={editAuthor}
                                                        onChange={(e) => setEditAuthor(e.target.value)}
                                                        onBlur={handleAuthorBlur}
                                                        className={`h-12 rounded-full bg-white px-5 ${errors.author
                                                            ? "border-red-300"
                                                            : "border-amber-200"
                                                            }`}
                                                    />
                                                    {errors.author && (
                                                        <p className="flex items-center gap-1 text-sm text-red-500">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {errors.author}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-bold">在庫数</label>
                                                    <Input
                                                        type="number"
                                                        value={editStock}
                                                        onChange={(e) => setEditStock(e.target.value)}
                                                        className={`h-12 rounded-full bg-white px-5 ${errors.stock
                                                            ? "border-red-300"
                                                            : "border-amber-200"
                                                            }`}
                                                    />
                                                    {errors.stock && (
                                                        <p className="flex items-center gap-1 text-sm text-red-500">
                                                            <AlertCircle className="h-4 w-4" />
                                                            {errors.stock}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
                                                <p className="mb-2 font-bold text-amber-700">
                                                    変更後の内容
                                                </p>
                                                <p>図書名：{editTitle}</p>
                                                <p>著者：{editAuthor}</p>
                                                <p>在庫数：{Number(editStock).toLocaleString()} 冊</p>
                                            </div>

                                            <Button
                                                type="button"
                                                onClick={openConfirm}
                                                disabled={isLoading || hasError}
                                                className="mt-6 h-12 w-full rounded-full bg-amber-500 font-bold hover:bg-amber-600 disabled:bg-gray-400"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        更新中...
                                                    </>
                                                ) : (
                                                    "更新内容を保存する"
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <HomeButton />

                            {isSuccess && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="w-96 rounded-[2rem] bg-white p-8 text-center shadow-lg">
                                        <div className="mb-3 text-5xl">📚</div>

                                        <h3 className="mb-4 text-xl font-bold text-[#6b4226]">
                                            更新完了
                                        </h3>

                                        <p className="mb-8 text-[#8a6b4f]">
                                            図書情報の更新が完了しました。
                                        </p>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => window.location.reload()}
                                                className="flex-1 rounded-full"
                                            >
                                                続けて更新する
                                            </Button>

                                            <Button
                                                onClick={() => router.push("/home")}
                                                className="flex-1 rounded-full bg-amber-500 hover:bg-amber-600"
                                            >
                                                <Home className="mr-2 h-4 w-4" />
                                                ホームへ戻る
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <AlertDialog open={isConfirmOpen} onOpenChange={closeConfirm}>
                                <AlertDialogContent className="rounded-[2rem] border-amber-100 bg-[#fffdf7] p-8 text-[#5b3a1e] shadow-xl">
                                    <AlertDialogHeader className="text-center">
                                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-4xl">
                                            ✏️
                                        </div>

                                        <AlertDialogTitle className="flex w-full justify-center text-2xl font-bold text-[#6b4226]">
                                            図書情報を変更しますか？
                                        </AlertDialogTitle>

                                        <div className="flex w-full justify-center pt-4 text-[#8a6b4f]">
                                            <div className="mx-auto w-fit min-w-48 space-y-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-left">
                                                <div>
                                                    <span className="font-bold text-[#6b4226]">図書名：</span>
                                                    {editTitle}
                                                </div>

                                                <div>
                                                    <span className="font-bold text-[#6b4226]">著者：</span>
                                                    {editAuthor}
                                                </div>

                                                <div>
                                                    <span className="font-bold text-[#6b4226]">在庫数：</span>
                                                    {Number(editStock).toLocaleString()} 冊
                                                </div>
                                            </div>
                                        </div>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter className="mt-6 gap-3 sm:justify-center">
                                        <AlertDialogCancel
                                            onClick={closeConfirm}
                                            className="rounded-full border-amber-200 px-8 text-[#6b4226] hover:bg-amber-50"
                                        >
                                            キャンセル
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={confirmUpdate}
                                            className="rounded-full !bg-[#d98c3f] px-8 font-bold text-white hover:bg-amber-600"
                                        >
                                            変更する
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};