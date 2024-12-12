"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminVerify from "@/components/AdminVerify";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: (
                <IconBrandTabler className="text-accent-foreground h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Update",
            href: "/admin/update",
            icon: (
                <IconSettings className="text-accent-foreground h-5 w-5 flex-shrink-0" />),
        },
        // {
        //     label: "Settings",
        //     href: "#",
        //     icon: (
        //         <IconSettings className="text-accent-foreground h-5 w-5 flex-shrink-0" />
        //     ),
        // },
        // {
        //     label: "Logout",
        //     href: "#",
        //     icon: (
        //         <IconArrowLeft className="text-accent-foreground h-5 w-5 flex-shrink-0" />
        //     ),
        // },
    ];
    const [open, setOpen] = useState(false);
    console.log("This is user", localStorage.getItem("ticket-master-isAdmin"))
    if (typeof Window !== "undefined") {
        if (localStorage.getItem("ticket-master-isAdmin") !== "true") {
            redirect("/error")
        }
    }
    return (
        <>
            <AdminVerify />
            <div
                className={cn(
                    "rounded-md flex flex-col md:flex-row bg-background w-full flex-1 max-w-screen mx-auto border border-border",
                    "h-screen"
                )}
            >
                {/* Sidebar wrapper with responsiveness */}
                <div className={cn("md:block", open ? "block" : "hidden md:block")}>
                    <Sidebar open={open} setOpen={setOpen}>
                        <SidebarBody className="justify-between gap-10">
                            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                                {open ? <Logo /> : <LogoIcon />}
                                <div className="mt-8 flex flex-col gap-2">
                                    {links.map((link, idx) => (
                                        <SidebarLink key={idx} link={link} />
                                    ))}
                                </div>
                            </div>
                        </SidebarBody>
                    </Sidebar>
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
                    <Button size={'icon'} variant={"ghost"}
                        onClick={() => setOpen(!open)}
                        className="block md:hidden"
                    >
                        {<Menu />}
                    </Button>
                    {children}
                </div>
            </div>
        </>
    );
}

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image src="/logo.png" alt="ticket master logo" height={100} width={100} className="h-5 w-6" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white whitespace-pre"
            >
                Ticket Master
            </motion.span>
        </Link>

    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image src="/logo.png" alt="ticket master logo" height={100} width={100} className="h-5 w-6" />
        </Link>
    );
};
