"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeButton = () => {
    return (
        <div className="mt-8 flex justify-center">
            <Button
                asChild
                size="lg"
                className="
                    rounded-full
                    bg-orange-300
                    px-8
                    py-6
                    text-white
                    font-bold
                    shadow-md
                    hover:bg-orange-500
                    hover:shadow-lg
                    transition
                "
            >
                <Link href="/home">
                    <Home className="mr-2 h-5 w-5" />
                    ホーム画面へ戻る
                </Link>
            </Button>
        </div>
    );
};