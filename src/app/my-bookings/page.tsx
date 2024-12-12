"use client"
import BookingCard from '@/components/BookingCard'
import Loader from '@/components/Loader'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'



const page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any[]>([])
    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/my-booking`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                },
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setData(data.data)
            }
            else {
                toast.error("Error: " + data.message)
            }
        } catch (error) {
            toast.error(`Error: ${(error as Error)?.message ?? "Something went wrong"}`)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return isLoading ? <Loader /> : (
        <div>
            <h1 className='text-4xl my-4 text-center font-bold'>Your Bookings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data?.map((booking, index) => (
                    <BookingCard
                        key={booking._id}
                        title={booking.title}
                        price={booking.totalPrice}
                        status={booking.status}
                        seats={booking.seats}
                        type={booking.type}
                    />
                ))}
            </div>
        </div>
    )
}

export default page
