import { GiBookshelf } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { IoSearch } from "react-icons/io5";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";

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
    return (
        <Sidebar collapsible="icon">
            <SidebarTrigger />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Book Scribble</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
