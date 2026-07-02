"use client";

import { useRegisterBook } from "@/components/hooks/useRegisterBook";
import { HomeButton } from "@/components/common/HomeButton";
import { Sidebar } from "@/components/common/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AlertCircle, BookPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BookRegister = () => {
    const {
        formData,
        categories,
        errors,
        isLoading,
        isSuccess,
        handleChange,
        handleCategoryChange,
        handleNameBlur,
        handleSubmit,
        resetForm,
    } = useRegisterBook();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmit();
    };

    const router = useRouter();

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar />

                <SidebarInset>
                    <main className="min-h-screen bg-[#fff8e8] px-6 py-10 text-[#5b3a1e]">
                        <SidebarTrigger className="mb-4 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200" />

                        <Card className="mx-auto max-w-3xl rounded-[2rem] border-green-100 bg-white/90 shadow-sm">
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                                    <BookPlus className="h-8 w-8 text-green-500" />
                                </div>

                                <CardTitle className="text-3xl font-bold text-[#6b4226]">
                                    図書新規登録
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">図書名</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            onBlur={handleNameBlur}
                                            placeholder="例：ドメイン駆動設計入門"
                                            className={`h-12 rounded-full bg-white px-5 ${errors.title
                                                ? "border-red-300"
                                                : "border-green-200"
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
                                        <Label htmlFor="author">著者</Label>
                                        <Input
                                            id="author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            placeholder="例：Eric Evans"
                                            className={`h-12 rounded-full bg-white px-5 ${errors.author
                                                ? "border-red-300"
                                                : "border-green-200"
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
                                        <Label htmlFor="categoryId">カテゴリ</Label>
                                        <Select
                                            value={formData.categoryId}
                                            onValueChange={handleCategoryChange}
                                        >
                                            <SelectTrigger
                                                className={`h-12 rounded-full bg-white px-5 ${errors.categoryId
                                                    ? "border-red-300"
                                                    : "border-green-200"
                                                    }`}
                                            >
                                                <SelectValue placeholder="カテゴリを選択してください" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem
                                                        key={cat.categoryId}
                                                        value={cat.categoryId}
                                                    >
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.categoryId && (
                                            <p className="flex items-center gap-1 text-sm text-red-500">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.categoryId}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stock">在庫数</Label>
                                        <Input
                                            id="stock"
                                            name="stock"
                                            type="number"
                                            value={formData.stock || ""}
                                            onChange={handleChange}
                                            min="0"
                                            className={`h-12 rounded-full bg-white px-5 ${errors.stock
                                                ? "border-red-300"
                                                : "border-green-200"
                                                }`}
                                        />
                                        {errors.stock && (
                                            <p className="flex items-center gap-1 text-sm text-red-500">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.stock}
                                            </p>
                                        )}
                                    </div>

                                    {(errors.submit || errors.system) && (
                                        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.submit || errors.system}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-12 w-full rounded-full bg-green-400 font-bold hover:bg-green-600"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                登録中...
                                            </>
                                        ) : (
                                            "図書を登録する"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <HomeButton />

                        {isSuccess && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                <div className="w-96 rounded-[2rem] bg-white p-8 text-center shadow-lg">
                                    <div className="mb-3 text-5xl">📚</div>

                                    <h3 className="mb-4 text-xl font-bold text-[#6b4226]">
                                        登録完了
                                    </h3>

                                    <p className="mb-8 text-[#8a6b4f]">
                                        図書の登録が完了しました。
                                    </p>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={resetForm}
                                            className="flex-1 rounded-full"
                                        >
                                            続けて登録する
                                        </Button>

                                        <Button
                                            onClick={() => router.push("/home")}
                                            className="flex-1 rounded-full bg-green-500 hover:bg-green-600"
                                        >
                                            ホームへ戻る
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};