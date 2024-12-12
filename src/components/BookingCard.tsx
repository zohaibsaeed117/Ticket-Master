"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardFooter } from './ui/card'
import { Button } from './ui/button'
import SeatButton from './SeatButton'
import { CircleCheck, CircleDollarSign, DollarSignIcon, PrinterCheck, TicketCheck } from 'lucide-react'

const BookingCard = () => {
    return (
        <Card className='mx-auto'>
            <CardHeader>
                <h2 className="text-2xl font-bold">Booking Title</h2>
            </CardHeader>
            <CardContent>
                <div className='flex gap-x-4'>
                    <div className='bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='text-xl font-bold'>Price <CircleDollarSign className='inline-block' /></p>
                        <p>1000 Rs</p>
                    </div>
                    <div className='bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='text-xl font-bold'>Status <CircleCheck className='inline-block' /></p>
                        <p>Confirmed</p>
                    </div>
                    <div className='bg-primary flex items-center justify-center flex-col rounded-xl p-3'>
                        <p className='text-xl font-bold'>Type <TicketCheck className='inline-block' /></p>
                        <p>1000 Rs</p>
                    </div>

                </div>
                <div className='mt-4'>
                    <h1 className='text-2xl font-bold'>Selected Seats</h1>
                    <div className='flex items-center justify-center gap-x-2'>
                        <SeatButton handleSeatSelect={() => { }} isReserved={"true"} seatNumber={12} />
                        <SeatButton handleSeatSelect={() => { }} isReserved={"true"} seatNumber={12} />
                        <SeatButton handleSeatSelect={() => { }} isReserved={"true"} seatNumber={12} />
                        <SeatButton handleSeatSelect={() => { }} isReserved={"true"} seatNumber={12} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingCard

