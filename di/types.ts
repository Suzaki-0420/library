export const TYPES = {
    // インフラストラクチャ層
    IBookRepository: Symbol.for("IBookRepository"),
    IBookCategoryRepository: Symbol.for("IBookCategoryRepository"),
    // サービス(ユースケース)層
    ISearchBookService: Symbol.for("ISearchBookService"),
    IRegisterBookService: Symbol.for("IRegisterBookService"),
    IUpdateBookService: Symbol.for("IUpdateBookService"),
    IDeleteBookService: Symbol.for("IDeleteBookService")
};