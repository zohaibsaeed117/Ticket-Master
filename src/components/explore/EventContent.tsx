import React from 'react'
import InputGroup from '../InputGroup'
import { Search, ListFilter } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { EventCard } from '../EventCard'
import Image from 'next/image'

const EventContent = () => {
    return (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm flex items-baseline justify-between">
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-3xl font-bold'>Events</h1>
                    <p className='text-base font-light'>Book the tickets of Ongoing events</p>
                </div>
                <div className='flex items-center justify-center gap-x-4'>
                    <InputGroup
                        Icon={Search}
                        placeholder="Search an Event..."
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
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
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

export default EventContent
