import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { IconMan, IconWoman } from '@tabler/icons-react';
import { Button } from './ui/button';

interface SeatButtonProps {
    isReserved: string | null;
    seatNumber: number;
    handleSeatSelect: (index: number, selectedBy: string) => void;
}

const SeatButton: React.FC<SeatButtonProps> = ({ isReserved, seatNumber, handleSeatSelect }) => {
    const [isOpen, setIsOpen] = useState(false); // Track dropdown open state

    const setStyle = () => {
        if (isReserved === "male") return "border-blue-500 bg-blue-500 text-white cursor-not-allowed";
        else if (isReserved === "female") return "border-pink-500 bg-pink-500 text-white cursor-not-allowed";
        else return "border-accent-foreground text-accent-foreground";
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                disabled={isReserved !== null}
                className={`border h-10 w-10 rounded-t-sm rounded-b-[4px] font-semibold ${setStyle()}`}
            >
                {seatNumber + 1}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-auto min-w-full'>
                <Button size={"icon"} variant={"ghost"} onClick={() => {
                    setIsOpen(false)
                    handleSeatSelect(seatNumber, "male")
                }}>
                    <IconMan fill='blue' color='blue' />
                </Button>
                <Button size={"icon"} variant={"ghost"} onClick={() => {
                    setIsOpen(false)
                    handleSeatSelect(seatNumber, "female")
                }}>
                    <IconWoman fill='#fd00cb' color='#fd00cb' />
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SeatButton;
