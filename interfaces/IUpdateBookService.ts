import { Book } from "@/models/Book";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品キーワード検索サービスインターフェイス
 */
export interface IUpdateBookService {

    /**
     * 入力終了時: 商品名の重複を検証する
     * @param name 入力された商品名
     * @throws 商品名が重複している場合はエラーをスローする
     */
    validateBookName(name: string): Promise<void>;

    /**
     * 商品情報の更新を行う
     * @returns 検索結果の商品のリスト
     */
    update(
        bookUuid: string,
        title: string,
        author: string,
        stock: number
    ): Promise<Book | null>;
}