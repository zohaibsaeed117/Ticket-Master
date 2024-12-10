import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";
import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { format as formatDate } from "date-fns";
const AddBusModal = lazy(() => import("@/components/admin/modal/AddBusModal"));
import buses from "@/data/buses.json";
interface BusData {
    _id: string;
    title: string;
    description: string;
    departure: {
        city: string
        time: string;
        date: string
    }
    arrival: {
        city: string
        time: string;
        date: string
    }
    date: string;
    totalSeats: number;
    seatsLeft: number;
}
const BusTable = () => {
    const [buses, setBuses] = useState<BusData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bus/get-buses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                },
            });
            const data = await response.json();
            setBuses(data.data);
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
                <AddBusModal
                    button={
                        <div className="flex items-center justify-center gap-x-4">
                            Add Bus <PlusCircle size={24} />
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
                            <TableHead>Departure</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Arrival</TableHead>
                            <TableHead>Total Seats</TableHead>
                            <TableHead>Seats Left</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {buses.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    <Suspense fallback={<Button size="icon" disabled>...</Button>}>
                                        <AddBusModal id={data._id} button={<Edit />} size="icon" />
                                    </Suspense>
                                </TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.departure.city}</TableCell>
                                <TableCell>{formatDate(new Date(data.departure.date), "dd-MMM-yyyy")}</TableCell>
                                <TableCell>{data.arrival.city}</TableCell>
                                <TableCell>{data.totalSeats}</TableCell>
                                <TableCell>{data.seatsLeft}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default BusTable;

