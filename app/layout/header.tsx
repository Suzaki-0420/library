"use client";

export default function Header() {
    return (
        <header className="h-16 border-b border-orange-100 bg-[#fff8e8]">
            <div className="mx-auto flex h-full items-center px-8">
                <h1 className="text-xl font-bold text-[#6b4226]">
                    📚 図書管理システム
                </h1>
            </div>
        </header>
    );
}