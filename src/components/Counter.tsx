"use client"
import { Minus, Plus } from 'lucide-react';
import React, { useState, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface CounterProps {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    max: number
}

const Counter: React.FC<CounterProps> = ({ count, setCount, max }) => {
    const increment = () => {
        if (count >= max) return toast.error(`You cannot buy more than ${max} tickets`, { id: "counter-error" });
        setCount(count + 1)
    };
    const decrement = () => setCount(count > 1 ? count - 1 : 1);
    return (
        <div className="flex h-11 items-center justify-center border border-primary rounded p-2 w-28 md:w-32 lg:w-36">
            <button
                className="text-sm md:text-md lg:text-lg font-bold px-2 "
                onClick={decrement}
            >
                <Minus />
            </button>
            <span className="text-sm md:text-md lg:text-lg font-medium mx-4">{count}</span>
            <button
                className="text-sm md:text-md lg:text-lg font-bold px-2"
                onClick={increment}
            >
                <Plus />
            </button>
        </div >
    );
}

export default Counter;
