"use client"
import React, { useEffect, useState } from 'react';
import SeatButton from './SeatButton';
import { IconSteeringWheel } from '@tabler/icons-react';

interface Seat {
    readonly seatNumber: number;
    bookedBy: string | null;
    readonly price: number
    readonly category: string;
}


interface SeatSelectorProps {
    setSelectedSeats: (open: number, close: number,category:string) => void;
    selectedSeats: { seatNumber: number, price: number,category:string }[]
    seats: Seat[]
    setSeats: (seats: Seat[]) => void;
    handleSeatSelect: (seatsIndex: number, seatType: string) => void;
    steering?: boolean | true
}
const MovieSeatSelector: React.FC<SeatSelectorProps> = ({ steering, seats, setSeats, selectedSeats, handleSeatSelect, setSelectedSeats }) => {

    const totalSeats = seats?.length;

    const renderItems = seats?.map((seat, index) => (
        <React.Fragment key={seat.seatNumber}>
            <SeatButton handleSeatSelect={handleSeatSelect} seatNumber={seat.seatNumber} isReserved={seat.bookedBy} />
            {/* Insert empty div after every second seat, but not for the last five elements */}
            {((index + 1) % 2 === 0) && <div className="empty-div" />}
        </React.Fragment>
    ));

    return (
        <div className='flex justify-center'>
            <div className='flex justify-center flex-col items-end'>
                {steering && <IconSteeringWheel size={50} className='text-muted-foreground' />}
                <div className='grid grid-cols-9 gap-2'>
                    {renderItems}
                </div>
            </div>
        </div>
    );
};

export default MovieSeatSelector;
