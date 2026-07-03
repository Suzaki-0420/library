"use client";

import Link from "next/link";
import {
    Home,
    LibraryBig,
    Search,
    Plus,
    Pencil,
    Trash2,
    LogOut,
    X,
    Menu,
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
    useSidebar,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
    { label: "ホーム", href: "/home", icon: Home },
    { label: "図書検索", href: "/books", icon: Search },
    { label: "図書登録", href: "/books/new", icon: Plus },
    { label: "図書更新", href: "/books/edit", icon: Pencil },
    { label: "図書削除", href: "/books/delete", icon: Trash2 },
];

export const Sidebar = () => {
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <ShadcnSidebar
            collapsible="icon"
            className="border-r border-orange-100 bg-[#fff3d8] text-[#6b4226] [--sidebar-width-icon:3.5rem]"
        >
            {isCollapsed ? (
                <div className="flex h-full flex-col items-center bg-[#fff3d8] pt-6">
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-orange-600 transition hover:bg-orange-100"
                    >
                        <Menu className="h-8 w-8" />
                    </button>
                </div>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="absolute -right-9 top-6 z-50 flex  text-gray-400 transition  hover:text-gray-600"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <SidebarHeader className="bg-[#fff3d8] p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                                <LibraryBig className="h-8 w-8 text-orange-500" />
                            </div>

                            <div>
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
                                                    className="rounded-2xl px-4 py-5 font-bold text-[#6b4226] hover:bg-orange-100 hover:text-orange-600"
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

                    <SidebarFooter className="bg-[#fff3d8] p-4 pb-40">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-3 rounded-3xl bg-white/80 p-3 text-left shadow-sm transition hover:bg-orange-50 hover:shadow-md"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
                                        🧸
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#6b4226]">
                                            図書館スタッフ
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            admin@example.com
                                        </p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                align="center"
                                className="w-56 rounded-2xl border-orange-100 bg-white p-2 shadow-lg"
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/"
                                        className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-red-500 hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        ログアウト
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarFooter>
                </>
            )}
        </ShadcnSidebar>
    );
};