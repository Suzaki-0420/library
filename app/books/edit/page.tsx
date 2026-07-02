import { BookUpdate } from "@/components/books/update/BookUpdate";

/**
 * 図書更新ページ
 * URL: /books/edit
 */
export default function BookUpdatePage() {
    return (
        <main className="container mx-auto py-8">
            <BookUpdate />
        </main>
    );
}