"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";

const ExploreNavbar = () => {
    const pathname = usePathname();

    const lastSegment = pathname.split("/").pop() || "";

    const categories = ["bus", "train", "flight", "events", "movies"];

    return categories.includes(lastSegment) && (
        <>
            <div className="bg-muted my-2 p-1 text-muted-foreground rounded-sm w-[80%] flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
                {categories.map((category) => (
                    <Link
                        href={`${category}`}
                        key={category}
                        className={`flex-1 rounded-sm text-center p-1 mx-auto border-white ${lastSegment === category ? "bg-background text-foreground " : ""
                            }`} // Conditionally apply classes
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                ))}
            </div>
        </>
    );
}
export default ExploreNavbar
