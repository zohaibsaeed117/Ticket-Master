"use client"
import React, { useEffect, useState } from 'react';
import SeatButton from './SeatButton';
import { IconSteeringWheel } from '@tabler/icons-react';

interface Seat {
    readonly seatNumber: number;
    reservedBy: string | null;
    readonly price: number
    readonly category: string;
}


interface SeatSelectorProps {
    setSelectedSeats: (open: number) => void;
    selectedSeats: number[]
    seats: Seat[]
    setSeats: (seats: Seat[]) => void;
    handleSeatSelect: (seatsIndex: number, seatType: string) => void;
}
const SeatSelector: React.FC<SeatSelectorProps> = ({ seats, setSeats, selectedSeats, handleSeatSelect, setSelectedSeats }) => {

    const totalSeats = seats.length;

    const renderItems = seats.map((seat, index) => (
        <React.Fragment key={seat.seatNumber}>
            <SeatButton handleSeatSelect={handleSeatSelect} seatNumber={seat.seatNumber} isReserved={seat.reservedBy} />
            {/* Insert empty div after every second seat, but not for the last five elements */}
            {((index + 1) % 4 === 2) && (totalSeats - index > 5) && <div className="empty-div" />}
        </React.Fragment>
    ));

    return (
        <div className='flex justify-center'>
            <div className='flex justify-center flex-col items-end'>
                <IconSteeringWheel size={50} className='text-muted-foreground' />
                <div className='grid grid-cols-5 gap-2'>
                    {renderItems}
                </div>
            </div>
        </div>
    );
};

export default SeatSelector;
