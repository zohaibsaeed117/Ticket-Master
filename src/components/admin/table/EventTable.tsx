import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";
import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { format as formatDate } from "date-fns";
const AddEventModal = lazy(() => import("@/components/admin/modal/AddEventModal"));
interface EventData {
    _id: string;
    title: string;
    description: string;
    seats: number;
    booked: number;
    price: number | null;
    date: string;
    time: string;
    image: string | null;
}
const EventTable = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/get-events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                },
            });
            const data = await response.json();
            setEvents(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="flex items-end justify-end mx-20 flex-col">
            <Suspense fallback={<Button disabled>Loading...</Button>}>
                <AddEventModal
                    button={
                        <div className="flex items-center justify-center gap-x-4">
                            Add Event <PlusCircle size={24} />
                        </div>
                    }
                />
            </Suspense>
            {isLoading ? (
                <Loader />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Update</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total Seats</TableHead>
                            <TableHead>Seats Left</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events?.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    <Suspense fallback={<Button size="icon" disabled>...</Button>}>
                                        <AddEventModal id={data._id} button={<Edit />} size="icon" />
                                    </Suspense>
                                </TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.price}</TableCell>
                                <TableCell>{data.seats}</TableCell>
                                <TableCell>{data.seats - data.booked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default EventTable;


