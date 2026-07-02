"use client";

import { useRegisterBook } from "@/components/hooks/useRegisterBook";
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
import { Loader2 } from "lucide-react";

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

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmit();
    };

    return (
        <>
            <div className="container mx-auto max-w-lg py-10">
                <h1 className="mb-6 text-2xl font-bold">図書新規登録</h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">図書名</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleNameBlur}
                            placeholder="例：ドメイン駆動設計入門"
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
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
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="categoryId">カテゴリ</Label>
                        <Select
                            value={formData.categoryId}
                            onValueChange={handleCategoryChange}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="カテゴリを選択してください" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem
                                        key={cat.categoryUuid}
                                        value={cat.categoryUuid}
                                    >
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.category && (
                            <p className="text-sm text-red-500">
                                {errors.category}
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
                            required
                        />
                    </div>

                    {errors.submit && (
                        <p className="text-sm text-red-500">{errors.submit}</p>
                    )}

                    {errors.system && (
                        <p className="text-sm text-red-500">{errors.system}</p>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="w-48" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    登録中...
                                </>
                            ) : (
                                "図書を登録する"
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {isSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-80 rounded-lg bg-white p-6 text-center shadow-lg">
                        <h3 className="mb-4 text-xl font-bold">登録完了</h3>
                        <p className="mb-8 text-gray-600">
                            図書の登録が完了しました。
                        </p>

                        <Button onClick={resetForm} className="w-full">
                            入力画面に戻る
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};