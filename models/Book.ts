import { BookCategory } from "./BookCategory";
import { BookStock } from "./BookStock";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品インターフェイス
 */
export interface Book {
    bookId: string;        // 商品Id(UUID)
    title: string;               // 書籍名
    author: string;              // 著者名
    category: BookCategory;  // 書籍カテゴリ
    stock: number;        // 書籍在庫数
}