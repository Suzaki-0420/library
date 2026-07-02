/**
 * 書籍登録のためのDTO(インターフェイス)
 */
export interface BookRegistration {
    title: string;          // 書籍名
    author: string;         // 価格
    categoryId: string;    // 商品カテゴリId(UUID)
    stock: number;         // 在庫数
}