import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import { Book } from "@/models/Book";
import { useState } from "react";

export const useUpdateBook = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [editTitle, setEditTitle] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [editStock, setEditStock] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const updateService = container.get<IUpdateBookService>(
        TYPES.IUpdateBookService
    );

    const selectBook = (book: Book) => {
        setSelectedBook(book);
        setEditTitle(book.title);
        setEditAuthor(book.author);
        setEditStock(book.stock.toString());
        setErrors({});
        setIsSuccess(false);
    };

    const openConfirm = () => {
        setIsConfirmOpen(true);
    };

    const closeConfirm = () => {
        setIsConfirmOpen(false);
    };

    const confirmUpdate = async () => {
        await update();
        setIsConfirmOpen(false);
    };

    const handleTitleBlur = async () => {
        if (!editTitle.trim()) return;

        if (selectedBook && editTitle === selectedBook.title) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.title;
                return newErrors;
            });
            return;
        }

        try {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.title;
                return newErrors;
            });

            await updateService.validateBookName(editTitle);
        } catch (error: any) {
            setErrors((prev) => ({
                ...prev,
                title: error.message ?? "書名の検証に失敗しました。",
            }));
        }
    };

    const update = async (): Promise<Book | null> => {
        if (!selectedBook) return null;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await updateService.update(
                selectedBook.bookId,
                editTitle,
                editAuthor,
                Number(editStock)
            );

            if (result) {
                setIsSuccess(true);
            }

            return result;
        } catch (error: any) {
            try {
                const parsed = JSON.parse(error.message);

                if (parsed.type === "validation") {
                    setErrors(parsed.errors);
                } else {
                    setErrors({ submit: error.message });
                }
            } catch {
                setErrors({ submit: error.message ?? "図書の更新に失敗しました。" });
            }

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
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
        openConfirm,
        closeConfirm,
        confirmUpdate,
    };
};