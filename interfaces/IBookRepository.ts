import { Book } from "../models/Book";
import { BookRegistration } from "../models/BookRegistration";
/**
 * 書籍リポジトリインターフェース
 */
export interface IBookRepository {
    /**
     * 指定したキーワードで商品を検索して取得する
     * @param keyword 検索キーワード
     * @returns ヒットした本（非同期）
     */
    searchKeyword(keyword: string): Promise<Book[]>;

    /**
     * 演習 8-8 リポジトリとDTOインターフェイスを実装する
     * 商品の重複を検証する
     * @param name 検証する商品名
     */
    existsByName(name: string): Promise<void>;
    /**
     * 演習 8-8 リポジトリとDTOインターフェイスを実装する
     * 商品を登録する
     * @param Book 登録する商品
     * @returns 登録された商品（非同期）
     */
    register(book: BookRegistration): Promise<Book>;

    updateBook(
        bookId: string,
        title: string,
        author: string,
        stock: number
    ): Promise<Book | null>;

    deleteBook(bookId: string): Promise<boolean>;
}