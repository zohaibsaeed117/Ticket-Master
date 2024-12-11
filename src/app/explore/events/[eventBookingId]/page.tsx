'use client';

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Counter from "@/components/Counter";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import ConfirmPaymentModal from "@/components/ConfirmPaymentModal";

interface EventBookingPageProps {
    params: {
        eventBookingId: string;
    };
}
interface eventDetails {
    image: string
    title: string
    description: string
    price: string
    date: string
    time: string
}

const EventBookingPage: React.FC<EventBookingPageProps> = ({ params }) => {
    const { eventBookingId } = params
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<eventDetails>({
        image: "",
        title: "",
        description: "",
        price: "",
        date: "",
        time: ""
    })
    const [price, setPrice] = useState<number>(0)
    const getData = async () => {
        setIsLoading(false)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event//get-event/${eventBookingId}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                }
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setData(data.data)
                setPrice(parseInt(data?.data?.price))
            }
            else {
                toast.error("Error: " + data.message)
            }

        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }
    console.log(price)
    useEffect(() => {
        getData()
    }, [])
    const [count, setCount] = useState<number>(0)
    return isLoading ? <Loader /> : (
        <>
            <h1 className="my-4 text-2xl text-center md:text-2xl lg:text-4xl font-bold">{data?.title}</h1>
            <div className="flex p-6 rounded-xl gap-4 flex-row w-full">
                <div className="flex items-center flex-col w-full">
                    <div className="rounded-lg overflow-hidden my-2">
                        {data.image && <Image src={data.image} alt={data?.title} height={1080} width={1080} className="hover:scale-110 transition-transform duration-500" />}
                    </div>
                    <div className="bg-card lg:w-1/2 w-full p-6 rounded-xl border">
                        <h4 className="text-2xl font-bold">Event Details</h4>
                        <div className="prose mx-4 mt-2 text-xl font-light" dangerouslySetInnerHTML={{ __html: data?.description as string }} />
                    </div>
                </div>
                <div className='w-full flex gap-y-4 flex-col'>
                    <div className='bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                        <div>
                            <h1 className='text-2xl font-semibold'>{data?.title}</h1>
                            <p className='text-xl'>Lahore</p>
                            <p className='font-light text-base'>{data?.date}</p>
                        </div>
                        <div className="border-t-2 border-b-2 py-4 flex items-center justify-between">
                            <p className='text-2xl font-bold'>Quantity</p>
                            <Counter count={count} setCount={setCount} max={4} />
                        </div>
                        <Separator />
                        <div className='flex items-center justify-between'>
                            <p className='text-2xl font-bold'>Total</p>
                            <p className='text-2xl'>Rs. {price * count}</p>
                        </div>
                        <ConfirmPaymentModal totalPrice={price * count} bookingType="Event" requestData={count} bookingId={eventBookingId} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventBookingPage;
