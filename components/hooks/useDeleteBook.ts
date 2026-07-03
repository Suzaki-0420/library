import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import { Book } from "@/models/Book";
import { useState } from "react";

export const useDeleteBook = () => {
    const deleteService = container.get<IDeleteBookService>(
        TYPES.IDeleteBookService
    );

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const selectBook = (book: Book) => {
        setSelectedBook(book);
        setErrors({});
        setIsSuccess(false);
    };

    const openConfirm = () => {
        setIsConfirmOpen(true);
    };

    const closeConfirm = () => {
        setIsConfirmOpen(false);
    };

    const deleteBook = async (): Promise<boolean> => {
        if (!selectedBook) {
            setErrors({ submit: "削除する図書を選択してください。" });
            return false;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const result = await deleteService.delete(selectedBook.bookId);

            if (!result) {
                setErrors({ submit: "削除対象の図書が見つかりませんでした。" });
                return false;
            }

            setIsSuccess(true);
            return true;
        } catch (error: any) {
            setErrors({
                submit: error.message ?? "図書の削除に失敗しました。",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        const result = await deleteBook();

        if (result) {
            setIsConfirmOpen(false);
        }
    };

    const resetDelete = () => {
        setSelectedBook(null);
        setIsSuccess(false);
        setErrors({});
        setIsConfirmOpen(false);
    };

    return {
        selectedBook,
        isLoading,
        isConfirmOpen,
        isSuccess,
        errors,

        selectBook,
        openConfirm,
        closeConfirm,
        confirmDelete,
        deleteBook,
        resetDelete,
    };
};