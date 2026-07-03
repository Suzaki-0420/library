import { IBookRepository } from "@/interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";
import { injectable } from "inversify";

@injectable()
export class BookRepository implements IBookRepository {
    public async searchKeyword(keyword: string): Promise<Book[]> {
        const params = new URLSearchParams({ keyword });

        const response = await fetch(`/proxy-api/books?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.clone().text();

            console.log("========== API ERROR ==========");
            console.log("search url:", `/proxy-api/books?${params.toString()}`);
            console.log("search status:", response.status);
            console.log("search statusText:", response.statusText);
            console.log("search error body:", errorText);
            console.log("===============================");

            throw new Error(`検索に失敗しました (Status: ${response.status})`);
        }

        return await response.json();
    }

    async existsByName(title: string): Promise<void> {
        const params = new URLSearchParams({ keyword: title });
        console.log("タイトル：", title);

        const response = await fetch(`/proxy-api/books?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (errorData.message) {
                throw new Error(errorData.message);
            }
            if (errorData.errors) {
                const messages = Object.values(errorData.errors).flat().join("\n");
                throw new Error(messages);
            }
            throw new Error(`書籍名の検証に失敗しました (Status: ${response.status})`);

        }
        const books = await response.json();
        console.log("結果：", books);


        const exists = books.some((book: any) => book.title === title);

        if (exists) {
            throw new Error("同じ書籍名がすでに登録されています。");
        }
    }

    async register(book: BookRegistration): Promise<Book> {
        const response = await fetch("/proxy-api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));

            console.log("register errorData:", errorData);

            if (errorData.errors) {
                const fieldErrors: { [key: string]: string } = {};

                Object.entries(errorData.errors).forEach(([key, value]) => {
                    const normalizedKey =
                        key.charAt(0).toLowerCase() + key.slice(1);

                    fieldErrors[normalizedKey] = Array.isArray(value)
                        ? String(value[0])
                        : String(value);
                });

                throw new Error(
                    JSON.stringify({
                        type: "validation",
                        errors: fieldErrors,
                    })
                );
            }

            if (errorData.message) {
                throw new Error(errorData.message);
            }

            throw new Error(`図書の登録に失敗しました (Status: ${response.status})`);
        }

        return await response.json();
    }

    public async updateBook(
        bookId: string,
        title: string,
        author: string,
        stock: number
    ): Promise<Book | null> {

        const response = await fetch(`/proxy-api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                stock
            })
        });

        const responseText = await response.clone().text();

        console.log("========== UPDATE BOOK ==========");
        console.log("request body:", { title, author, stock });
        console.log("status:", response.status);
        console.log("ok:", response.ok);
        console.log("response body:", responseText);
        console.log("=================================");

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));

            console.log("register errorData:", errorData);

            if (errorData.errors) {
                const fieldErrors: { [key: string]: string } = {};

                Object.entries(errorData.errors).forEach(([key, value]) => {
                    const normalizedKey =
                        key.charAt(0).toLowerCase() + key.slice(1);

                    fieldErrors[normalizedKey] = Array.isArray(value)
                        ? String(value[0])
                        : String(value);
                });

                throw new Error(
                    JSON.stringify({
                        type: "validation",
                        errors: fieldErrors,
                    })
                );
            }

            if (errorData.message) {
                throw new Error(errorData.message);
            }

            throw new Error(`図書の更新に失敗しました (Status: ${response.status})`);
        }

        return await response.json();
    }

    public async deleteBook(bookId: string): Promise<boolean> {
        const response = await fetch(`/proxy-api/books/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 404) {
            return false;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));

            if (errorData.message) {
                throw new Error(errorData.message);
            }

            if (errorData.errors) {
                const messages = Object.values(errorData.errors)
                    .flat()
                    .join("\n");

                throw new Error(messages);
            }

            throw new Error(`図書の削除に失敗しました (Status: ${response.status})`);
        }

        return true;
    }
}