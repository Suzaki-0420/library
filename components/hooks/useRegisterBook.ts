import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useRegisterBook = () => {
    const service = container.get<IRegisterBookService>(
        TYPES.IRegisterBookService
    );

    const [formData, setFormData] = useState<BookRegistration>({
        title: "",
        author: "",
        categoryId: "",
        stock: 0,
    });

    const [categories, setCategories] = useState<BookCategory[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetForm = useCallback(() => {
        setFormData({
            title: "",
            author: "",
            categoryId: "",
            stock: 0,
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

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            delete newErrors.submit;
            return newErrors;
        });
    }, []);

    const handleCategoryChange = useCallback((categoryId: string) => {
        setFormData((prev) => ({
            ...prev,
            categoryId,
        }));

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.categoryId;
            delete newErrors.category;
            delete newErrors.submit;
            return newErrors;
        });
    }, []);

    const handleNameBlur = useCallback(async () => {
        console.log("重複チェック開始:", formData.title);
        if (!formData.title.trim()) {
            return;
        }

        try {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.title;
                return newErrors;
            });

            await service.validateBookName(formData.title);
            console.log("重複なし");
        } catch (error: any) {
            console.log("重複チェックエラー:", error.message);
            setErrors((prev) => ({
                ...prev,
                title: error.message,
            }));
        }
    }, [formData.title, service]);

    const handleSubmit = useCallback(async (): Promise<Book | null> => {

        try {
            const result = await service.execute(formData);

            if (result) {
                setIsSuccess(true);
            }

            return result;
        } catch (error: any) {
            try {
                const parsed = JSON.parse(error.message);

                if (parsed.type === "validation") {
                    const convertedErrors: { [key: string]: string } = {};

                    Object.entries(parsed.errors).forEach(([key, value]) => {
                        const normalizedKey =
                            key.charAt(0).toLowerCase() + key.slice(1);

                        convertedErrors[normalizedKey] = String(value);
                    });

                    setErrors(convertedErrors);
                } else {
                    setErrors({ submit: error.message });
                }
            } catch {
                setErrors({ submit: error.message });
            }

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