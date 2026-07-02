import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

/**
 * 演習 8-11 状態管理とサービスを繋ぐカスタムHookを実装する
 * 商品登録画面の状態管理とイベントハンドリングを行うカスタムHook
 */
export const useRegisterBook = () => {
    const service = container.get<IRegisterBookService>(
        TYPES.IRegisterBookService
    );

    const [formData, setFormData] = useState<BookRegistration>({
        name: "",
        author: "",
        stock: 0,
        categoryId: "",
    });

    const [categories, setCategories] = useState<BookCategory[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetForm = useCallback(() => {
        setFormData({
            name: "",
            author: "",
            stock: 0,
            categoryId: "",
        });
        setErrors({});
        setIsSuccess(false);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await service.getCategories();
                setCategories(data);
            } catch {
                setErrors((prev) => ({
                    ...prev,
                    system: "カテゴリ一覧の取得に失敗しました。",
                }));
            }
        };

        fetchCategories();
    }, [service]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "stock" ? Number(value) : value,
        }));
    }, []);

    const handleCategoryChange = useCallback((categoryId: string) => {
        setFormData((prev) => ({
            ...prev,
            categoryId,
        }));
    }, []);

    const handleNameBlur = useCallback(async () => {
        if (!formData.name) return;

        try {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.name;
                return newErrors;
            });

            await service.validateBookName(formData.name);
        } catch (error: any) {
            setErrors((prev) => ({
                ...prev,
                name: error.message,
            }));
        }
    }, [formData.name, service]);

    const handleSubmit = useCallback(async (): Promise<Book | null> => {
        setIsLoading(true);

        try {
            const result = await service.execute(formData);

            if (result) {
                setIsSuccess(true);
            }

            return result;
        } catch (error: any) {
            setErrors((prev) => ({
                ...prev,
                submit: error.message,
            }));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [formData, service]);

    return {
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
    };
};