"use client"
import { DatePicker } from "@/components/DatePicker"
import InputGroup from "@/components/InputGroup"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Cities from "@/data/Cities.json"
import { IconTransitionTop, IconTransitionBottom, IconCalendarMonth, IconSearch, IconArrowRight } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { Edit, ListFilter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DetailCard from "@/components/Card"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import buses from "@/data/buses.json"
import Loader from "@/components/Loader"
interface BusInfo {
    date: string;
    departure: {
        city: string
        time: string;
        date: string
    }
    arrival: {
        city: string
        time: string;
        date: string
    }
    description: string;
    seatsLeft: number;
    title: string;
    totalSeats: number;
    _id: string;
    price:string;
}
const BusContent = () => {

    const [departureCity, setDepartureCity] = useState<string>("");
    const [arrivalCity, setArrivalCity] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date>()
    const [arrivalDate, setArrivalDate] = useState<Date>()
    const [travelType, setTravelType] = useState<string>();
    const [data, setData] = useState<BusInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const getData = async () => {
        setIsLoading(false)
        try {
            const token = localStorage.getItem("ticket-master-token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bus/get-buses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setData(data.data);
                console.log(data)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm">

                {
                    !isSearched
                        // false
                        ? (<div className="flex flex-col gap-y-8">
                            <h1 className="text-3xl font-semibold">Search for Bus</h1>
                            <p className="text-xl font-light">Find the best deal for the bus to travel</p>

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
                            <div>
                                <p className="text-xl font-medium">
                                    {departureCity}<IconArrowRight className="inline-block" />{arrivalCity}
                                </p>
                                <div className="text-xs sm:text-sm font-light flex flex-wrap gap-x-2">
                                    <p><span className="font-semibold">Departure:{" "}</span>{departureDate ? format(departureDate, "dd MMM yyyy") : "N/A"}</p>
                                    <Separator orientation="vertical" className="border border-muted-foreground h-5 bg-muted-foreground" />
                                    {travelType === "round" && <>
                                        <p><span className="font-semibold">Arrival: {"   "}</span>{arrivalDate ? format(arrivalDate, "dd MMM yyyy") : "N/A"}</p>
                                        <Separator orientation="vertical" className="border border-muted-foreground h-5 bg-muted-foreground" />
                                    </>}
                                    <p><span className="font-semibold">Trip: {"   "}</span>{travelType === "round" ? "Round Trip" : "One Way"}</p>
                                </div>
                            </div>
                            <Button onClick={() => setSearched(false)} variant={"ghost"} size={"icon"}>
                                <Edit />
                            </Button>
                        </div>)
                }
            </div>
            {isLoading ?
                <Loader />
                : <div className="flex flex-col mt-10 w-full lg:px-20 md:px-10 ">
                    <div className="flex items-center justify-between">
                        <p className="text-xl"><span className="font-bold">Result Found: </span>{data?.length}</p>
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
                        data.length ?
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(300,auto))] lg:grid-cols-[repeat(auto-fit,minmax(350px,auto))] gap-y-6 my-8">
                                {data?.map(data =>
                                    <DetailCard
                                        key={data._id}
                                        id={data._id}
                                        title={data.title}
                                        description={data.description}
                                        arrival={data.arrival}
                                        departure={data.departure}
                                        price={data.price}
                                        seatsLeft={data.seatsLeft}
                                        href={'bus/' + data._id}
                                    />
                                )}
                            </div>
                            :
                            <div className="flex flex-col gap-y-10 mt-10 items-center justify-center">
                                <Image src={'/noResult.png'} alt="No result Found" height={500} width={500} />
                                <p className="text-3xl">No Result Found</p>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default BusContent
