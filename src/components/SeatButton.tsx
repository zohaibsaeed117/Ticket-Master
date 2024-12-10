import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { IconMan, IconWoman } from '@tabler/icons-react';
import { Button } from './ui/button';

interface SeatButtonProps {
    isReserved: string | null;
    seatNumber: number;
    handleSeatSelect: (index: number, selectedBy: string, carriageId: number) => void;
    readonly carriageId?: number
}

const SeatButton: React.FC<SeatButtonProps> = ({ isReserved, seatNumber, carriageId, handleSeatSelect }) => {


    const setStyle = () => {
        if (isReserved !== null) return "border-yellow-500 bg-yellow-500 text-white cursor-not-allowed";
        else return "border-accent-foreground text-accent-foreground bg-accent";
    };
    return (
        <Button
            disabled={isReserved !== null}
            onClick={() => handleSeatSelect(seatNumber, "reserverd", carriageId || 0)}
            className={`border h-10 w-10 rounded-t-sm rounded-b-[4px] font-semibold ${setStyle()}`}>{seatNumber}</Button>
    );
};

export default SeatButton;
