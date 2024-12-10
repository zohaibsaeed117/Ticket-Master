"use client";
import React, { useEffect, useState } from "react";
import SeatButton from "./SeatButton";
import { IconSteeringWheel } from "@tabler/icons-react";

interface Seat {
  readonly seatNumber: number;
  bookedBy: string | null;
  readonly price: number;
  readonly category: string;
}

interface SeatSelectorProps {
  setSelectedSeats: (open: number, price: number) => void;
  selectedSeats: { seatNumber: number; price: number }[];
  seats: Seat[];
  setSeats: (seats: Seat[]) => void;
  handleSeatSelect: (seatsIndex: number, seatType: string, price: number) => void;
  steering?: boolean | true;
}
const FlightSeatSelector: React.FC<SeatSelectorProps> = ({
  steering,
  seats,
  setSeats,
  selectedSeats,
  handleSeatSelect,
  setSelectedSeats,
}) => {

  const renderItems = seats.map((seat, index) => (
    <React.Fragment key={seat.seatNumber}>
      <SeatButton handleSeatSelect={handleSeatSelect} seatNumber={seat.seatNumber} isReserved={seat.bookedBy} carriageId={seat.price} />
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

export default FlightSeatSelector;
