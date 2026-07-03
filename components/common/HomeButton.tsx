"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeButton = () => {
    const router = useRouter();

    const handleClick = () => {
        const audio = new Audio("/sounds/poyon.mp3");

        audio.volume = 0.4;
        audio.currentTime = 0;

        audio.play().catch(() => {
            // ブラウザ制限対策
        });

        setTimeout(() => {
            router.push("/home");
        }, 180);
    };

    return (
        <div className="mt-8 flex justify-center">
            <Button
                size="lg"
                onClick={handleClick}
                className="
                    rounded-full
                    bg-[#99846c]
                    px-8
                    py-6
                    font-bold
                    text-white
                    shadow-md

                    transition-all
                    duration-200

                    hover:bg-[#5d4830]
                    hover:shadow-xl
                    hover:-translate-y-0.5

                    active:translate-y-0
                    active:scale-95

                    cursor-pointer
                "
            >
                <Home className="mr-2 h-5 w-5" />
                ホーム画面へ戻る
            </Button>
        </div>
    );
};