"use client";
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"
import { MoveRight, Router, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import FlightSeatSelector from '@/components/FlightSeatSelector';
import LabelInputContainer from '@/components/ui/LabelInputContainer';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import flights from "@/data/buses.json"
import { format } from 'date-fns';

interface FlightBookinPageProps {
    params: {
        flightBookingId: string;
    };
}
interface Seat {
    readonly seatNumber: number;
    reservedBy: string | null;
    readonly price: number
    readonly category: string;
}

interface FlightDetail {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly departure: {
        city: string
        time: string;
        date: string
    }
    readonly arrival: {
        city: string
        time: string;
        date: string
    }
    readonly seats: Seat[];
    readonly price: number
    readonly seatsLeft: number
}

const FlightBookinPage: React.FC<FlightBookinPageProps> = ({ params }) => {
    const { flightBookingId } = params;
    const [error, setError] = useState<string>();
    const [flight, setFlight] = useState<FlightDetail>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [seats, setSeats] = useState<Seat[]>([])

    const handleSelectedSeatChange = (seatNumber: number) => {
        if (selectedSeats.length === 4) {
            return toast.error("You cannot select more than 4 seats");
        }
        setSelectedSeats((seats) => [...seats, seatNumber]);
    };
    const handleRemoveSelectedSeat = (seatNumber: number) => {
        const tempSeats = selectedSeats.filter(value => value !== seatNumber)
        setSelectedSeats(tempSeats)
        const temp = seats;
        temp[seatNumber - 1].reservedBy = null
        setSeats(temp)
    }
    const handleSeatSelect = (seatIndex: number, selectedBy: string) => {
        const tempSeats = seats;
        tempSeats[seatIndex - 1].reservedBy = selectedBy;//Changing the seat at index
        setSeats(tempSeats)
        handleSelectedSeatChange(seatIndex)
    }
    const getData = () => {
        const data = flights?.find(data => data.id.toString() === flightBookingId)
        if (!data) {
            return setError("Route Doesn't Exist " + flightBookingId)
        }
        setFlight(data)
        setSeats(data?.seats || [])
    }
    useEffect(() => {
        setIsLoading(true)
        getData()
        setIsLoading(false)
    }, [])
    return error ? <h1 className='text-4xl text-center'>{error}</h1> :
        (isLoading ? <Loader />
            : (
                <>
                    <div className="p-4 sm:p-8 w-full mx-auto gradient-background flex-wrap rounded-xl flex justify-center md:justify-between items-start sm:items-center">
                        <div className="grow sm:grow-0 order-1">
                            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold">{flight?.title}</h1>
                            <p className="text-sm md:text-base font-light">{flight?.description}</p>
                        </div>
                        <div className="grow order-3 sm:order-2 md:text-xl lg:text-3xl text-xl font-medium flex gap-x-4 items-center justify-center mx-auto">
                            {flight?.departure.city}<MoveRight size={50} className="inline-block" />{flight?.arrival.city}
                        </div>
                        <div className="flex order-2 sm:order-3 items-center justify-center flex-col">
                            <p className="text-xl md:text-xl lg:text-3xl font-bold mx-auto">{flight?.departure.date ? format(flight?.departure.date, "MMM dd yyyy") : "N/A"}</p>
                            <div className="flex items-center justify-center gap-x-2">
                                <p className="text-sm md:text-base lg:text-lg font-light">{flight?.seatsLeft} Seats Left</p>
                                <Separator orientation="vertical" className="h-4 sm:h-6 md:h-8 w-[2px] rounded-full" />
                                <p className="text-sm md:text-base lg:text-lg font-light">{flight?.departure.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 my-2 flex-col lg:flex-row '>
                        <div className="rounded-xl text-card-foreground p-4 sm:p-8 w-full">
                            <h1 className="text-2xl font-medium">Seat Selection</h1>
                            <div className="flex mt-4 gap-4 flex-col lg:flex-row">
                                <div className="border rounded-xl p-4 w-full bg-card">
                                    <FlightSeatSelector seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={handleSelectedSeatChange} handleSeatSelect={handleSeatSelect} />
                                </div>
                                <div className='w-full flex flex-col gap-y-4 lg:w-1/2'>
                                    <div className='w-full bg-card '>
                                        <div className="border p-4 rounded-xl">
                                            <h3 className='text-2xl font-semibold'>Seat Status</h3>
                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                {[
                                                    { label: "Booked By", person: "Male", color: "blue-500" },
                                                    { label: "Booked By", person: "Female", color: "pink-500" },
                                                    { label: "Seat", person: "Available", color: "accent-foreground" },
                                                    { label: "Seat", person: "Selected", color: "yellow-500" },
                                                ].map((seat, index) => (
                                                    <div key={index} className="flex items-center gap-x-2">
                                                        <div className={`flex items-center justify-center text-xl border h-10 w-10 font-semibold bg-${seat.color} text-white rounded-sm`}>
                                                            1
                                                        </div>
                                                        <div className="flex items-start justify-center flex-col">
                                                            <p>{seat.label}</p>
                                                            <p className="font-bold">{seat.person}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border rounded-xl p-4 flex flex-col gap-y-4 bg-card '>
                                        <h1 className='text-2xl font-semiBold'>Booking Details</h1>
                                        <p className="text-sm">  Your selected seats will appear here. You can select a maximum of 4 seats per booking.</p>
                                        <div className='flex items-center justify-center'>
                                            {selectedSeats.length ? selectedSeats.map(value =>
                                                <div className="relative">
                                                    <button onClick={() => handleRemoveSelectedSeat(value)} className='absolute h-4 w-4 -top-2 -right-2 bg-primary rounded-full flex items-center justify-center z-10'><X size={10} /></button>
                                                    <div className={`flex items-center justify-center text-xl border h-10 w-10 font-semibold bg-yellow-500 text-white rounded-sm`}>
                                                        {value}
                                                    </div>
                                                </div>
                                            ) : <p className='text-xl font-bold'>No Seats Selected</p>}
                                        </div>
                                    </div>
                                    <div className='border rounded-xl p-4 flex flex-col gap-y-4 bg-card '>
                                        <h1 className='text-2xl font-bold'>Seats Arrangments</h1>
                                        {[{ category: "Silver", range: "(1-10)", price: "1100" },
                                        { category: "Gold", range: "(20-30)", price: "1500" },
                                        { category: "Premium", range: "(30-49)", price: "2000" }].map(seat =>
                                            <div className='flex text-xl items-center justify-between border-b-2 py-1'>
                                                <h1 className='font-semibold'>
                                                    {seat.category} <span className='font-light'>{seat.range}</span>
                                                </h1>
                                                <span className='font-light'>Rs. {seat.price}</span>
                                            </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-1/3 flex gap-y-4 flex-col'>

                            <div className='bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                                <div>
                                    <h1 className='text-2xl font-semibold'>Flight</h1>
                                    <p className='text-xl'>LHE - ISB_26</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className='text-2xl font-bold'>Subtotal</p>
                                    <div className='flex items-center justify-between'>
                                        <p className="text-2xl font-semibold" >Outbound</p>
                                        <p className="text-2xl">2022</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className='flex items-center justify-between'>
                                    <p className='text-2xl font-bold'>Total</p>
                                    <p className='text-2xl'>Rs. 525</p>
                                </div>
                            </div>
                            <div className='bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                                <p className='text-2xl font-bold'>Passenger Details</p>
                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="full-name">Full Name</Label>
                                    <Input
                                        id="full-name"
                                        placeholder="i.e. John Doe"
                                        type="text"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="cnic">CNIC</Label>
                                    <Input
                                        id="cnic"
                                        placeholder="i.e. XXXXX-XXXXXXX-X"
                                        type="text"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="phone-number">Phone Number</Label>
                                    <Input
                                        id="phone-number"
                                        placeholder="i.e. +92 300 0000000"
                                        type="text"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        placeholder="i.e. XXXXX-XXXXXXX-X"
                                        type="email"
                                    />
                                </LabelInputContainer>
                                <Button className="group/btn group">
                                    Proceed to Payment
                                    <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                                </Button>

                            </div>
                        </div>
                    </div >
                </>
            ));
};

export default FlightBookinPage;
