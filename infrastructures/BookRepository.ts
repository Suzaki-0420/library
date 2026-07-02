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

        const response = await fetch(`/proxy-api/books?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.clone().text();
            console.log("existsByName error body:", errorText);

            throw new Error("図書名の検証に失敗しました。");
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
            const errorText = await response.clone().text();
            console.log("register error body:", errorText);

            throw new Error(`図書の登録に失敗しました (Status: ${response.status})`);
        }

        return await response.json();
    }
}