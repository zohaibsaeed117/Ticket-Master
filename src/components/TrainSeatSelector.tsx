"use client"
import React, { use, useEffect, useState } from 'react';
import SeatButton from './SeatButton';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Minus, Plus } from 'lucide-react';
import { IconMathGreater, IconMathLower } from '@tabler/icons-react';
import { Button } from './ui/button';
interface Seat {
    readonly seatNumber: number;
    reservedBy: string | null;
}
interface Carriage {
    id: number;
    name: string;
    price: number;
    seats: Seat[]
}
interface SeatSelectorProps {
    setSelectedSeats: (seatIndex: number, carriageId: number) => void;
    selectedSeats: { seatNumber: number, carriageId: number }[]
    carriage: Carriage[]
    setCarriage: (carriage: Carriage[]) => void;
    handleSeatSelect: (seatsIndex: number, seatType: string, carriageId: number) => void;
}
const TrainSeatSelector: React.FC<SeatSelectorProps> = ({ carriage, setCarriage, selectedSeats, handleSeatSelect, setSelectedSeats }) => {

    const [index, setIndex] = useState<number>(0)
    const seats = carriage[index].seats
    const carriageLength = carriage?.length;
    const carriageId = carriage[index].id

    const renderItems = seats?.map((seat, index) => (
        <React.Fragment key={seat.seatNumber}>
            <SeatButton carriageId={carriageId} handleSeatSelect={handleSeatSelect} seatNumber={seat.seatNumber} isReserved={seat.reservedBy} />
            {/* Insert empty div after every second seat, but not for the last five elements */}
            {((index + 1) % 5 === 3) && <div className="empty-div" />}
        </React.Fragment>
    ));

    const handleIncrement = () => {
        setIndex((prevIndex) => (prevIndex + 1) % carriageLength);
    };

    const handleDecrement = () => {
        setIndex((prevIndex) => (prevIndex - 1 + carriageLength) % carriageLength);
    };


    return (
        <div className='flex justify-center'>
            <div className='flex justify-center flex-col items-center gap-y-4'>
                <div className='flex items-center justify-center gap-x-4 bg-accent text-accent-foreground rounded-xl'>
                    <Button onClick={handleDecrement} variant={'ghost'} size={"icon"}><IconMathLower /></Button>
                    <div className='w-20 text-center'>
                        {carriage[index]?.name}
                    </div>
                    <Button onClick={handleIncrement} variant={'ghost'} size={"icon"}> <IconMathGreater /></Button>
                </div>
                <div className='grid grid-cols-6 gap-2'>
                    {renderItems}
                </div>
            </div>
        </div>
    );
};

export default TrainSeatSelector;
