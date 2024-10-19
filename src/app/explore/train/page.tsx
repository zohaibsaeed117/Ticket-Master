"use client"
import { DatePicker } from "@/components/DatePicker"
import InputGroup from "@/components/InputGroup"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Cities from "@/data/Cities.json"
import { IconTransitionTop, IconTransitionBottom, IconCalendarMonth, IconSearch, IconArrowRight } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { Edit, ListFilter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DetailCard from "@/components/Card"
import Image from "next/image"
import trains from "@/data/trains.json"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
const TrainContent = () => {

    const [departureCity, setDepartureCity] = useState<string>("");
    const [arrivalCity, setArrivalCity] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date>()

    const [isSearched, setSearched] = useState<boolean>(false);

    const handleDepartureDate = (date: Date | undefined) => {

        if (!date) {
            return
        }

        if (date < new Date()) {
            return toast.error("You cannot select a past date")
        }
        setDepartureDate(date)
    }


    const handleSearch = () => {

        setArrivalCity(arrivalCity.trim());
        setDepartureCity(departureCity.trim());

        if (!departureDate) {
            return toast.error("Please set the departure date first");
        }
        else if (departureCity === "") {
            return toast.error("Please select the departure city")
        }
        else if (arrivalCity === "") {
            return toast.error("Please select the arrival city")
        }
        else if (arrivalCity === departureCity) {
            return toast.error("Arrival City cannot be same as departure city");
        }
        else if (!Cities.includes(arrivalCity.charAt(0).toUpperCase() + arrivalCity.slice(1))) {
            return toast.error("Invalid Arrival City");
        }
        else if (!Cities.includes(departureCity.charAt(0).toUpperCase() + departureCity.slice(1))) {
            return toast.error("Invalid Departure City");
        }

        setSearched(true)
    }

    const renderItems = () => {
        if (!isSearched) {
            return []
        }

        return trains
            .filter(data =>
                //@ts-ignore
                data.departure.date === format(departureDate, 'yyyy-MM-dd') &&
                data.departure.city === departureCity &&
                data.arrival.city === arrivalCity)
            .map(data =>
                <DetailCard
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    description={data.description}
                    arrival={data.arrival}
                    departure={data.departure}
                    price={data.price}
                    seatsLeft={data.seatsLeft}
                    href={'bus/' + data.id}
                />)
    }
    return (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm">

                {
                    !isSearched
                        // false
                        ? (<div className="flex flex-col gap-y-8">
                            <h1 className="text-3xl font-semibold">Search for Train</h1>
                            <p className="text-xl font-light">Find the best and most affordable train routes in Pakistan</p>

                            <div className="flex items-center justify-center gap-4 w-full lg:flex-row flex-col">
                                <InputGroup
                                    value={departureCity}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartureCity(e.target.value)}
                                    Icon={IconTransitionTop}
                                    size={20}
                                    placeholder={"From"}
                                    name="from"
                                    list="suggestions" />
                                <datalist id="suggestions">
                                    {Cities.map((suggestion, index) => (
                                        <option key={index} value={suggestion} />
                                    ))}
                                </datalist>
                                <InputGroup
                                    value={arrivalCity}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArrivalCity(e.target.value)}
                                    Icon={IconTransitionBottom}
                                    size={20}
                                    placeholder={"To"}
                                    name="to"
                                    list="suggestions"
                                />
                                <DatePicker placeholder={"Departure Date"} date={departureDate} setDate={handleDepartureDate} />
                                <Button onClick={handleSearch} className="w-full text-lg bg-yellow-500 hover:bg-yellow-500/90">
                                    Search
                                    <IconSearch size={18} className="mx-2" />
                                </Button>
                            </div>
                        </div>)
                        :
                        (<div className="bg-card text-card-foreground rounded-lg p-4 flex items-center justify-between">
                            <div className="flex gap-x-3">
                                <p className="font-medium">
                                    {departureCity}<IconArrowRight className="inline-block" />{arrivalCity}
                                </p>
                                <Separator orientation="vertical" className="border border-muted-foreground h-6 bg-muted-foreground" />
                                <p><span className="font-semibold">Departure:{" "}</span>{departureDate ? format(departureDate, "dd MMM yyyy") : "N/A"}</p>
                            </div>
                            <Button onClick={() => setSearched(false)} variant={"ghost"} size={"icon"}>
                                <Edit />
                            </Button>
                        </div>)
                }
            </div>
            {isSearched && <div className="flex flex-col mt-10 w-full lg:px-20 md:px-10 ">

                <div className="flex items-center justify-between">
                    <p className="text-xl"><span className="font-bold">Result Found: </span>{renderItems().length}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-sm"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {
                    renderItems().length ?
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300,auto))] lg:grid-cols-[repeat(auto-fit,minmax(350px,auto))] gap-y-6 my-8">
                            {renderItems()}
                        </div>
                        :
                        <div className="flex flex-col gap-y-10 mt-10 items-center justify-center">
                            <Image src={'/noResult.png'} alt="No result Found" height={500} width={500} />
                            <p className="text-3xl">No Result Found</p>
                        </div>
                }
            </div>}
        </>
    )
}

export default TrainContent
