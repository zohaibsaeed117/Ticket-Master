"use client"
import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/InputGroup'
import { Search, ListFilter } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/EventCard'
import Image from 'next/image'
import { MovieCard } from '@/components/MovieCard'
import toast from 'react-hot-toast'
import Loader from '@/components/Loader'

const MoviesContent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([])

    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/get-movies`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                }
            })
            const data = await response.json()
            if (data.success) {
                setData(data.data)
            } else {
                toast.error("Error:" + data.message)
            }
        } catch (error) {
            toast.error((error as Error).message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    console.log(data)
    useEffect(() => {
        getData()
    }, [])
    return isLoading ? <Loader /> : (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm flex items-baseline justify-between flex-col gap-y-4 md:flex-row">
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-3xl font-bold'>Movies</h1>
                    <p className='text-base font-light'>Book the ticket of your favorite movie</p>
                </div>
                <div className='flex items-center justify-center gap-x-4'>
                    <InputGroup
                        Icon={Search}
                        placeholder="Search a Movie..."
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-10 gap-1 text-sm"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Location</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Lahore
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Islamabad
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Sialkot
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Quetta
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {
                true ?
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300,auto))] lg:grid-cols-[repeat(auto-fit,minmax(380px,auto))] gap-y-6  my-8">
                        {
                            data.map((movie, index) => {
                                return (
                                    <MovieCard key={index} id={movie._id} poster={movie.image} rating={movie.rating} title={movie.title} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col gap-y-10 mt-10 items-center justify-center">
                        <Image src={'/noResult.png'} alt="No result Found" height={500} width={500} />
                        <p className="text-3xl">No Result Found</p>
                    </div>
            }
        </>
    )
}

export default MoviesContent
