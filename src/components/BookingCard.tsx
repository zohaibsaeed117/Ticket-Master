import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardFooter } from './ui/card'
import { Button } from './ui/button'
import SeatButton from './SeatButton'
import { CircleCheck, CircleDollarSign, DollarSignIcon, PrinterCheck, TicketCheck } from 'lucide-react'
interface BookingCardProps {
    title: string;
    price: number;
    status: string;
    type: string;
    seats: [number];
}
const BookingCard: React.FC<BookingCardProps> = ({ title, price, status, type, seats }) => {
    return (
        <Card className='mx-auto max-w-96'>
            <CardHeader>
                <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
            </CardHeader>
            <CardContent>
                <div className='flex gap-x-4'>
                    <div className='text-center bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='md:text-xl text-base font-bold'>Price <CircleDollarSign className='inline-block' /></p>
                        <p>{price} Rs</p>
                    </div>
                    <div className='text-center bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='md:text-xl text-base font-bold'>Status <CircleCheck className='inline-block' /></p>
                        <p>{status}</p>
                    </div>
                    <div className='text-center bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='md:text-xl text-base font-bold'>Type <TicketCheck className='inline-block' /></p>
                        <p>{type}</p>
                    </div>

                </div>
                {type !== "Event" && <div className='mt-4'>
                    <h1 className='text-xl md:text-2xl font-bold'>Selected Seats</h1>
                    <div className='flex items-center justify-center gap-x-2'>
                        {seats?.map((seat, index) => (
                            <SeatButton key={index} handleSeatSelect={() => { }} seatNumber={seat} isReserved={"true"} />
                        ))}
                    </div>
                </div>}
            </CardContent>
        </Card>
    )
}

export default BookingCard

