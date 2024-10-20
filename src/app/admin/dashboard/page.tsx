"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { DetailsTable } from '@/components/Table';

const Page = () => {
    return (
        <Tabs defaultValue="bus" className='h-10 md:m-10' >
            <TabsList className="md:w-[80%] w-full flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
                {
                    ["bus", "train", "flight", "events", "movies"]
                        .map(category => <TabsTrigger value={category} className="flex-1" >{category.charAt(0).toUpperCase() + category.slice(1)}</TabsTrigger>)
                }
            </TabsList>
            {["bus", "train", "flight", "events", "movies"].map(value => <TabsContent value={value}>
                <h1 className='text-3xl font-bold text-center'>{value.charAt(0).toUpperCase() + value.slice(1)} Bookings</h1>
                <DetailsTable />
            </TabsContent>)}
        </Tabs>

    )
}

export default Page
