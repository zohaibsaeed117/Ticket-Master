"use client";
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"
import { MoveRight, Router, Star, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MovieSeatSelector from '@/components/MovieSeatSelector';
import LabelInputContainer from '@/components/ui/LabelInputContainer';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import movies from "@/data/movies.json"
import { format, set } from 'date-fns';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/button-group';
import ConfirmPaymentModal from '@/components/ConfirmPaymentModal';

interface MovieBookinPageProps {
    params: {
        movieBookingId: string;
    };
}
interface Seat {
    readonly seatNumber: number;
    bookedBy: string | null;
    readonly price: number
    readonly category: string;
}

interface MovieDetail {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly poster: string
    readonly seats: Seat[];
    readonly date: string
    readonly rating: number
    readonly timeSlots: [{ start: string, end: string }]
    readonly category: [{ start: number, end: number, name: string, price: number }]
}

const MovieBookinPage: React.FC<MovieBookinPageProps> = ({ params }) => {
    const { movieBookingId } = params;
    const [error, setError] = useState<string>();
    const [movie, setMovie] = useState<MovieDetail>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedSeats, setSelectedSeats] = useState<{ seatNumber: number, price: number, category: string }[]>([]);
    const [seats, setSeats] = useState<Seat[]>([])
    console.log(selectedSeats)

    const handleSelectedSeatChange = (seatNumber: number, price: number, category: string) => {
        if (selectedSeats.length === 4) {
            return toast.error("You cannot select more than 4 seats");
        }
        setSelectedSeats((seats) => [...seats, { seatNumber: seatNumber, price: price, category }]);
    };
    const handleRemoveSelectedSeat = (seatNumber: number) => {
        const tempSeats = selectedSeats.filter(value => value.seatNumber !== seatNumber)
        setSelectedSeats(tempSeats)
        const temp = seats;
        temp[seatNumber - 1].bookedBy = null
        setSeats(temp)
    }
    const handleSeatSelect = (seatIndex: number, selectedBy: string) => {
        if (selectedSeats.length === 4) {
            return toast.error("You cannot select more than 4 seats");
        }
        const tempSeats = seats;
        tempSeats[seatIndex - 1].bookedBy = selectedBy;//Changing the seat at index
        const category=tempSeats[seatIndex - 1].category
        setSeats(tempSeats)
        handleSelectedSeatChange(seatIndex, tempSeats[seatIndex - 1].price,category)
    }
    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/get-movie/${movieBookingId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                }
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setMovie(data.data)
                setSeats(data.data.seats)
            } else {
                toast.error("Error:" + data.message)
            }
        } catch (error) {
            toast.error((error as Error).message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return error ? <h1 className='text-4xl text-center'>{error}</h1> :
        (isLoading ? <Loader />
            : (
                <>
                    <div className="p-4 sm:p-8 w-full mx-auto gradient-background flex-wrap rounded-xl flex justify-center md:justify-between items-start sm:items-center">
                        <div className="grow sm:grow-0 order-1">
                            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold">{movie?.title}</h1>
                            <p className="text-sm md:text-base font-light">{movie?.description}</p>
                        </div>

                        <div className="flex order-2 sm:order-3 items-center justify-center flex-col">
                            <p className="text-xl md:text-xl lg:text-3xl font-bold mx-auto">{movie?.date ? format(movie?.date, "MMM dd yyyy") : "N/A"}</p>
                            <div className="flex items-center justify-center gap-x-2">
                                <p className="text-sm md:text-base lg:text-lg font-light flex items-center justify-center gap-x-4"><Star className='inline-block' color="yellow" fill="yellow" />{movie?.rating}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 my-2 flex-col lg:flex-row '>
                        <div className="rounded-xl text-card-foreground p-4 sm:p-8 w-full">
                            <h1 className="text-2xl font-medium">Seat Selection</h1>
                            <div className="flex mt-4 gap-4 flex-col lg:flex-row">
                                <div className="border rounded-xl p-4 w-full bg-card">
                                    <MovieSeatSelector seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={handleSelectedSeatChange} handleSeatSelect={handleSeatSelect} />
                                </div>
                                <div className='w-full flex flex-col gap-y-4 lg:w-1/2'>
                                    <div className='w-full bg-card '>
                                        <div className="border p-4 rounded-xl">
                                            <h3 className='text-2xl font-semibold'>Seat Status</h3>
                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                {[
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
                                            {selectedSeats.length ? selectedSeats?.map(value =>
                                                <div className="relative" key={value.seatNumber}>
                                                    <button onClick={() => handleRemoveSelectedSeat(value.seatNumber)} className='absolute h-4 w-4 -top-2 -right-2 bg-primary rounded-full flex items-center justify-center z-10'><X size={10} /></button>
                                                    <div className={`flex items-center justify-center text-xl border h-10 w-10 font-semibold bg-yellow-500 text-white rounded-sm`}>
                                                        {value.seatNumber}
                                                    </div>
                                                </div>
                                            ) : <p className='text-xl font-bold'>No Seats Selected</p>}
                                        </div>
                                    </div>
                                    <div className='border rounded-xl p-4 flex flex-col gap-y-4 bg-card'>
                                        <h1 className="text-2xl font-bold">Select TimeSlot</h1>
                                        <ButtonGroup className="grid grid-cols-2 items-center justify-center">
                                            {movie?.timeSlots?.map((slot, index) => (
                                                <ButtonGroupItem
                                                    key={index}
                                                    value={index.toString()}
                                                    label={`${slot.start} - ${slot.end}`}
                                                />
                                            ))}
                                        </ButtonGroup>
                                    </div>
                                    <div className='border rounded-xl p-4 flex flex-col gap-y-4 bg-card '>
                                        <h1 className='text-2xl font-bold'>Seats Arrangments</h1>
                                        {movie?.category?.map(seat =>
                                            <div key={seat.name} className='flex text-xl items-center justify-between border-b-2 py-1'>
                                                <h1 className='font-semibold'>
                                                    {seat.name} <span className='font-light'>({seat.start} - {seat.end})</span>
                                                </h1>
                                                <span className='font-light'>Rs. {seat.price}</span>
                                            </div>)}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-4 flex gap-y-4 flex-col'>

                                <div className='bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                                    <div>
                                        <h1 className='text-2xl font-semibold'>{movie?.title}</h1>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className='text-2xl font-bold'>Quantity</p>
                                        <p>{selectedSeats?.length}</p>
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <p className='text-2xl font-bold'>Total</p>
                                        <p className='text-2xl'>Rs. {selectedSeats?.reduce((acc, seat) => acc + seat?.price, 0)}</p>
                                    </div>
                                    <ConfirmPaymentModal totalPrice={selectedSeats?.reduce((acc, seat) => acc + seat?.price, 0)} requestData={selectedSeats} bookingId={movieBookingId} bookingType={"movie"} />
                                </div>
                            </div>

                        </div>
                    </div >
                </>
            ));
}

export default MovieBookinPage;
