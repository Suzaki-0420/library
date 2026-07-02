import { BookRegister } from "@/components/books/register/BookRegister";

export default function BookRegisterPage() {
    return (
        <main className="container mx-auto py-8">
            {/* 先ほど作成したUIコンポーネントを呼び出す */}
            <BookRegister />
        </main>
    );
}