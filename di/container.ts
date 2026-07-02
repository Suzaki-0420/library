import { IBookRepository } from "@/interfaces/IBookRepository";
import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import { Container } from "inversify";
import { TYPES } from "./types";
import { BookRepository } from "@/infrastructures/BookRepository";
import { BookCategoryRepository } from "@/infrastructures/BookCategoryRepository";
import { SearchBookService } from "@/services/SearchBookService";
import { RegisterBookService } from "@/services/RegisterBookService";
import { UpdateBookService } from "@/services/UpdateBookService";

/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナの初期化と依存関係の登録
 */
const container = new Container();
// ---------------------------------------------------------
// バインディング（登録）設定
// ---------------------------------------------------------
// リポジトリの登録(モック版を紐付ける)
container.bind<IBookRepository>(TYPES.IBookRepository).to(BookRepository);
container.bind<IBookCategoryRepository>(TYPES.IBookCategoryRepository).to(BookCategoryRepository);
// サービス(ユースケース)の登録
container.bind<ISearchBookService>(TYPES.ISearchBookService).to(SearchBookService);
container.bind<IRegisterBookService>(TYPES.IRegisterBookService).to(RegisterBookService);
container.bind<IUpdateBookService>(TYPES.IUpdateBookService).to(UpdateBookService);

export { container };