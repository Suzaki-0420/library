"use client";

import Link from "next/link";
import {
    Home,
    LibraryBig,
    Search,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const menuItems = [
    { label: "ホーム", href: "/home", icon: Home },
    { label: "図書検索", href: "/books", icon: Search },
    { label: "図書登録", href: "/books/new", icon: Plus },
    { label: "図書更新", href: "/books/edit", icon: Pencil },
    { label: "図書削除", href: "/books/delete", icon: Trash2 },
];

export const Sidebar = () => {
    return (
        <ShadcnSidebar
            collapsible="icon"
            className="border-r border-orange-100 bg-[#fff3d8] text-[#6b4226]"
        >
            <SidebarHeader className="bg-[#fff3d8] p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                        <LibraryBig className="h-8 w-8 text-orange-500" />
                    </div>

                    <div className="group-data-[collapsible=icon]:hidden">
                        <h1 className="text-xl font-bold text-[#6b4226]">
                            図書管理システム
                        </h1>
                        <p className="mt-1 text-xs tracking-widest text-orange-400">
                            LIBRARY FOREST
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-[#fff3d8] px-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#8a6b4f]">
                        メニュー
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.label}
                                            className="
                                                rounded-2xl
                                                px-4
                                                py-5
                                                font-bold
                                                text-[#6b4226]
                                                hover:bg-orange-100
                                                hover:text-orange-600
                                            "
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-5 w-5 text-orange-500" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="bg-[#fff3d8] p-4">
                <div className="flex items-center gap-3 rounded-3xl bg-white/80 p-3 shadow-sm group-data-[collapsible=icon]:justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
                        🧸
                    </div>

                    <div className="group-data-[collapsible=icon]:hidden">
                        <p className="font-bold text-[#6b4226]">
                            図書館スタッフ
                        </p>
                        <p className="text-xs text-gray-500">
                            admin@example.com
                        </p>
                    </div>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </ShadcnSidebar>
    );
};