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
import buses from '@/data/buses.json'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, PlusCircle } from 'lucide-react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import AddBusModal from '@/components/AddBusModal';

const Page = () => {
    return (
        <>
            <Tabs defaultValue="bus" className='h-10 w-full md:m-10 ' >
                <TabsList className="md:w-[80%] w-full flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
                    {
                        ["bus", "train", "flight", "events", "movies"]
                            .map(category => <TabsTrigger value={category} className="flex-1" >{category.charAt(0).toUpperCase() + category.slice(1)}</TabsTrigger>)
                    }
                </TabsList>
                {["bus", "train", "flight", "events", "movies"].
                    map(value => <TabsContent value={value}>
                        <div className='flex items-center justify-end mx-20'>
                            <AddBusModal button={<div className='flex items-center justify-center gap-x-4'>Add {value} <PlusCircle size={24} /></div>} />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Update</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Departure</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Arrival</TableHead>
                                    <TableHead >Price</TableHead>
                                    <TableHead >Total Seats</TableHead>
                                    <TableHead >Seats Left</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {buses.map(data =>
                                    <TableRow key={data.id}>
                                        <TableCell>
                                            <AddBusModal id={data.id} button={<Edit />} size="icon" />
                                        </TableCell>
                                        <TableCell>{data.title}</TableCell>
                                        <TableCell>{data.departure.city}</TableCell>
                                        <TableCell>{data.departure.date}</TableCell>
                                        <TableCell>{data.arrival.city}</TableCell>
                                        <TableCell>{data.price}</TableCell>
                                        <TableCell>{data.seats.length}</TableCell>
                                        <TableCell>{data.seats.length}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                        </Table>
                    </TabsContent>)
                }
            </Tabs >
        </>

    )
}

export default Page
