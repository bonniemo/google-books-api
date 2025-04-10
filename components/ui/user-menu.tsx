"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import Divider from "../Divider";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export function UserMenu() {
    const { user } = useAuthStore();

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <div className="flex items-center gap-4 py-2">
                            {user?.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt="Profile"
                                    className="w-full rounded-lg"
                                />
                            ) : (
                                <User2 />
                            )}
                            <div>
                                <div>{user?.name ?? "Username"}</div>
                                <div>{user?.email ?? ""}</div>
                            </div>
                            <ChevronUp className="ml-auto" />
                        </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    className="w-52 bg-sidebar py-2 border border-sidebar-border mb-1 rounded-md space-y-2"
                >
                    <div className="flex gap-2 py-1 px-2">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-6 h-6 rounded-lg"
                            />
                        ) : (
                            <User2 />
                        )}
                        {user?.name ?? "Username"}
                    </div>
                    <Divider />
                    <DropdownMenuItem>
                        <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
