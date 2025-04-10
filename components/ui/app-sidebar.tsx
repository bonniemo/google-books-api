"use client";
import Link from "next/link";
import { GiBookshelf } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { IoSearch } from "react-icons/io5";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserMenu } from "./user-menu";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: ImHome,
    },
    {
        title: "Book Search",
        url: "/search",
        icon: IoSearch,
    },
    {
        title: "Book corner",
        url: "/book-corner",
        icon: GiBookshelf,
    },
];

export function AppSidebar() {
    const { user } = useAuthStore();
    return (
        <Sidebar collapsible="icon">
            <SidebarTrigger />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Book Scribble</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-8 space-y-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2"
                                        >
                                            <item.icon className="min-h-6 min-w-6" />
                                            <span className="sidebar-text">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <UserMenu />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
