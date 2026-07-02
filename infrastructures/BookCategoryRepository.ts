import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { BookCategory } from "@/models/BookCategory";
import { injectable } from "inversify";

/**
 * 図書カテゴリリポジトリ実装クラス
 */
@injectable()
export class BookCategoryRepository implements IBookCategoryRepository {

    /**
     * すべての図書カテゴリを取得する
     */
    async findAll(): Promise<BookCategory[]> {

        const response = await fetch(
            "/proxy-api/categories",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("findAll error:", errorText);

            throw new Error("図書カテゴリの取得に失敗しました。");
        }

        return await response.json();
    }

    /**
     * 指定したIDの図書カテゴリを取得する
     */
    async findById(id: string): Promise<BookCategory> {

        const response = await fetch(
            `/proxy-api/books/register/categories/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("findById error:", errorText);

            throw new Error("図書カテゴリ詳細の取得に失敗しました。");
        }

        return await response.json();
    }
}