import { BookSearch } from "@/components/books/search/BookSearch";
/**
 * 演習 6-3 Reactコンポーネントを実装してUIを確認する
 * 商品キーワード検索ページ
 * URL: /api/Books/search
 */
export default function BookSearchPage() {
    return (
        <main className="container mx-auto py-8">
            {/* 先ほど作成したUIコンポーネントを呼び出す */}
            <BookSearch />
        </main>
    );
}