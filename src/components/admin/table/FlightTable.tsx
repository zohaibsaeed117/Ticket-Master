import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";
import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { format as formatDate } from "date-fns";
const AddFlightModal = lazy(() => import("@/components/admin/modal/AddFlightModal"));
import flights from "@/data/flights.json";
interface FlightData {
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
const FlightTable = () => {
    const [flights, setFlights] = useState<FlightData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/flight/get-flights`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                },
            });
            const data = await response.json();
            setFlights(data.data);
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
                <AddFlightModal
                    button={
                        <div className="flex items-center justify-center gap-x-4">
                            Add Flight <PlusCircle size={24} />
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
                        {flights?.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    <Suspense fallback={<Button size="icon" disabled>...</Button>}>
                                        <AddFlightModal id={data._id} button={<Edit />} size="icon" />
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

export default FlightTable;


