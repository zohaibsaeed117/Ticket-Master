import { DatePicker } from "@/components/DatePicker"
import InputGroup from "@/components/InputGroup"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Airports from "@/data/airports.json"
import { IconSearch, IconArrowRight, IconRectangleRoundedBottom } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { Edit, ListFilter, PlaneLanding, PlaneTakeoff } from "lucide-react"
import { Separator } from "../ui/separator"
// @ts-ignore
import debounce from "lodash.debounce"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "../ui/dropdown-menu"
import DetailCard from "../Card"
import Image from "next/image"


interface Airport {
    name: string;
    city: string;
    country: string;
}
const FlightContent = () => {

    const [departureCity, setDepartureCity] = useState<string>("");
    const [arrivalCity, setArrivalCity] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date>()
    const [arrivalDate, setArrivalDate] = useState<Date>()
    const [travelType, setTravelType] = useState<string>();
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


    const handleArrivalDate = (date: Date | undefined) => {

        if (!date) {
            return
        }

        if (!departureDate) {
            return toast.error("Please set the departure date first");
        }
        if (date < departureDate) {
            return toast.error("You cannot select date before arrival")
        }
        setArrivalDate(date)
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

        setSearched(true)
    }
    const [filteredDepartureAirports, setFilteredDepartureAirports] = useState<Airport[]>([]);
    const [filteredArrivalAirports, setFilteredArrivalAirports] = useState<Airport[]>([]);
    const [departureSearchHideFlag, setDepartureSearchHideFlag] = useState(false);
    const [arrivalSearchHideFlag, setArrivalSearchHideFlag] = useState(false);

    // Debounced function for departureCity
    const debouncedFilterDepartureAirports = useMemo(() =>
        debounce((query: string) => {
            if (!query) {
                setFilteredDepartureAirports([]);
                return;
            }

            const filtered = Airports.filter(airport =>
                airport.name.toLowerCase().includes(query.toLowerCase())
                || airport.city.toLowerCase().includes(query.toLowerCase())
                || airport.country.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 3);

            setFilteredDepartureAirports(filtered);
        }, 500), []);

    // Debounced function for arrivalCity
    const debouncedFilterArrivalAirports = useMemo(() =>
        debounce((query: string) => {
            if (!query) {
                setFilteredArrivalAirports([]);
                return;
            }

            const filtered = Airports.filter(airport =>
                airport.name.toLowerCase().includes(query.toLowerCase())
                || airport.city.toLowerCase().includes(query.toLowerCase())
                || airport.country.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 3);

            setFilteredArrivalAirports(filtered);
        }, 500), []);

    // Effect hook for departureCity
    useEffect(() => {
        debouncedFilterDepartureAirports(departureCity);

        // Cleanup function to cancel debouncing on unmount
        return () => {
            debouncedFilterDepartureAirports.cancel();
        };
    }, [departureCity, debouncedFilterDepartureAirports]);

    // Effect hook for arrivalCity
    useEffect(() => {
        debouncedFilterArrivalAirports(arrivalCity);

        // Cleanup function to cancel debouncing on unmount
        return () => {
            debouncedFilterArrivalAirports.cancel();
        };
    }, [arrivalCity, debouncedFilterArrivalAirports]);


    const flights = [
        {
            id: 1,
            title: "Pakistan International Airlines",
            description: "Economy Class",
            departure: {
                city: "Lahore",
                time: "08:00 AM",
                date: "2024-10-17"
            },
            arrival: {
                city: "Islamabad",
                time: "09:30 AM",
                date: "2024-10-17"
            },
            price: 5500,
            seatsLeft: 20
        },
        {
            id: 2,
            title: "Airblue",
            description: "Business Class",
            departure: {
                city: "Karachi",
                time: "10:00 AM",
                date: "2024-10-18"
            },
            arrival: {
                city: "Lahore",
                time: "11:45 AM",
                date: "2024-10-18"
            },
            price: 12000,
            seatsLeft: 15
        },
        {
            id: 3,
            title: "Serene Air",
            description: "Economy Class",
            departure: {
                city: "Islamabad",
                time: "02:00 PM",
                date: "2024-10-17"
            },
            arrival: {
                city: "Karachi",
                time: "04:15 PM",
                date: "2024-10-17"
            },
            price: 4800,
            seatsLeft: 25
        },
        {
            id: 4,
            title: "Pakistan International Airlines",
            description: "Premium Economy",
            departure: {
                city: "Lahore",
                time: "06:00 PM",
                date: "2024-10-18"
            },
            arrival: {
                city: "Dubai",
                time: "09:30 PM",
                date: "2024-10-18"
            },
            price: 35000,
            seatsLeft: 10
        },
        {
            id: 5,
            title: "Airblue",
            description: "Economy Class",
            departure: {
                city: "Karachi",
                time: "08:00 AM",
                date: "2024-10-19"
            },
            arrival: {
                city: "Islamabad",
                time: "09:45 AM",
                date: "2024-10-19"
            },
            price: 5000,
            seatsLeft: 22
        }
    ]

    const renderItems = flights.map(data => <DetailCard key={data.id} id={data.id} title={data.title} description={data.description} arrival={data.arrival} departure={data.departure} price={data.price} seatsLeft={data.seatsLeft} href={'explore/bus/' + data.id} />)

    return (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm">
                {
                    !isSearched
                        // false
                        ? (<div className="flex flex-col gap-y-8">
                            <h1 className="text-3xl font-semibold">Search for Flights</h1>
                            <p className="text-xl font-light">Find the best and most affordable flights all across the world.</p>
                            <RadioGroup
                                defaultValue="oneway"
                                className="flex"
                                onValueChange={(value) => setTravelType(value)} >
                                <div className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${travelType === "oneway" && "bg-background/30"}`}>
                                    <RadioGroupItem value="oneway" id="oneway" />
                                    <Label htmlFor="oneway">One Way</Label>
                                </div>
                                <div className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${travelType === "return" && "bg-background/30"}`}>
                                    <RadioGroupItem value="return" id="return" />
                                    <Label htmlFor="return">Return</Label>
                                </div>
                            </RadioGroup>

                            <div className="flex items-center justify-center gap-4 w-full lg:flex-row flex-col">

                                <div className="w-full relative">
                                    <InputGroup
                                        value={departureCity}
                                        onChange={(e: any) => {
                                            setDepartureSearchHideFlag(true)
                                            setDepartureCity(e.target.value)
                                            setTimeout(() => {
                                                setDepartureSearchHideFlag(false)
                                            }, 5000)
                                        }}
                                        Icon={PlaneTakeoff}
                                        size={20}
                                        placeholder={"From"}
                                        name="from"
                                    />
                                    {departureSearchHideFlag && departureCity && <ul className="z-50 absolute w-full md:w-[150%] bg-background text-foreground rounded-xl max-h-32 overflow-auto">

                                        {filteredDepartureAirports.length ? filteredDepartureAirports.map((airport, i) =>
                                            <li
                                                key={i}
                                                onClick={() => setDepartureCity(airport.name)}
                                                className="px-5 py-2 border-b-2 flex items-center justify-normal gap-x-2"
                                            >

                                                <PlaneTakeoff />
                                                <div className="flex flex-col items-start justify-normal gap-x-2">
                                                    <p className="text-lg font-semibold">{airport.name}</p>
                                                    <p className="text-base font-light">{airport.country} , {airport.city}</p>
                                                </div>
                                            </li>
                                        ) :
                                            <li className="text-sm px-5 py-2 border-b-2">No city found</li>
                                        }
                                    </ul>}


                                </div>
                                <div className="w-full relative">
                                    <InputGroup
                                        value={arrivalCity}
                                        onChange={(e: any) => {
                                            setArrivalSearchHideFlag(true)
                                            setArrivalCity(e.target.value)
                                            setTimeout(() => {
                                                setArrivalSearchHideFlag(false)
                                            }, 5000)
                                        }}
                                        Icon={PlaneLanding}
                                        size={20}
                                        placeholder={"To"}
                                        name="from"
                                    />
                                    {arrivalSearchHideFlag && departureCity && <ul className="z-50 absolute w-full md:w-[150%] bg-background text-foreground rounded-xl max-h-32 overflow-auto">

                                        {filteredArrivalAirports.length ? filteredArrivalAirports.map((airport, i) =>
                                            <li
                                                key={i}
                                                onClick={() => setArrivalCity(airport.name)}
                                                className="px-5 py-2 border-b-2 flex items-center justify-normal gap-x-2"
                                            >

                                                <PlaneTakeoff />
                                                <div className="flex flex-col items-start justify-normal gap-x-2">
                                                    <p className="text-lg font-semibold">{airport.name}</p>
                                                    <p className="text-base font-light">{airport.country} , {airport.city}</p>
                                                </div>
                                            </li>
                                        ) :
                                            <li className="text-sm px-5 py-2 border-b-2">No city found</li>
                                        }
                                    </ul>}

                                </div>


                                <DatePicker placeholder={"Departure Date"} date={departureDate} setDate={handleDepartureDate} />
                                {travelType === "return" && <DatePicker placeholder={"Arrival Date"} date={arrivalDate} setDate={handleArrivalDate} />}
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
            <div className="flex flex-col mt-10 w-full lg:px-20 md:px-10 ">

                <div className="flex items-center justify-between">
                    <p className="text-xl"><span className="font-bold">Result Found: </span>0</p>
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
                    true ?
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300,auto))] lg:grid-cols-[repeat(auto-fit,minmax(350px,auto))] gap-y-6 my-8">
                            {renderItems}
                        </div>
                        :
                        <div className="flex flex-col gap-y-10 mt-10 items-center justify-center">
                            <Image src={'/noResult.png'} alt="No result Found" height={500} width={500} />
                            <p className="text-3xl">No Result Found</p>
                        </div>
                }
            </div>
        </>
    )
}

export default FlightContent
