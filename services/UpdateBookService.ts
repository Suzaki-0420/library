import { injectable, inject } from "inversify";
import type { IUpdateBookService } from "../interfaces/IUpdateBookService";
import type { IBookRepository } from "../interfaces/IBookRepository";
import type { Book } from "@/models/Book";
import { TYPES } from "@/di/types";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品キーワード検索サービスインターフェイスの実装
 */
@injectable()
export class UpdateBookService implements IUpdateBookService {

    /**
     * コンストラクタ
     * @param productRepository IBookRepositoryの実装をインジェクションする
     */
    constructor(
        @inject(TYPES.IBookRepository) private productRepository: IBookRepository
    ) { }

    /**
     * 入力終了時: 商品名の重複を検証する
     * @param name 入力された商品名
     * @throws 商品名が重複している場合はエラーをスローする
     */
    async validateBookName(name: string): Promise<void> {
        await this.productRepository.existsByName(name);
    }

    public async update(
        bookUuid: string,
        title: string,
        author: string,
        stock: number
    ) {
        return await this.productRepository.updateBook(bookUuid, title, author, stock);
    }
}