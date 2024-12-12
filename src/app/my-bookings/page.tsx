import BookingCard from '@/components/BookingCard'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1 className='text-4xl my-4 text-center font-bold'>Your Bookings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
            </div>
        </div>
    )
}

export default page
