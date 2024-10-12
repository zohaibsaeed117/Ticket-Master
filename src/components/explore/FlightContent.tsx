import { DatePicker } from "@/components/DatePicker"
import InputGroup from "@/components/InputGroup"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Cities from "@/lib/Cities"
import { IconTransitionTop, IconTransitionBottom, IconCalendarMonth, IconSearch, IconArrowRight } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { Edit, ListFilter, PlaneLanding, PlaneTakeoff } from "lucide-react"
import { Separator } from "../ui/separator"
import { DetailCard } from "../Card"
import Image from "next/image"
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "../ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CommandEmpty, CommandGroup, CommandSeparator } from "cmdk"
import { Input } from "../ui/input"

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
        else if (!Cities.includes(arrivalCity.charAt(0).toUpperCase() + arrivalCity.slice(1))) {
            return toast.error("Invalid Arrival City");
        }
        else if (!Cities.includes(departureCity.charAt(0).toUpperCase() + departureCity.slice(1))) {
            return toast.error("Invalid Departure City");
        }

        setSearched(true)
    }

    const filteredCities = Cities.filter(city => city.toLowerCase().includes(departureCity.toLocaleLowerCase()))
    return (
        <>
            <div className="gradient-background py-10 text-card-foreground w-full lg:px-20 md:px-10 px-4 rounded-sm">

                {
                    !isSearched
                        // false
                        ? (<div className="flex flex-col gap-y-8">



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
                                <div className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${travelType === "multi-city" && "bg-background/30"}`}>
                                    <RadioGroupItem value="multi-city" id="multi" />
                                    <Label htmlFor="multi">Multi City</Label>
                                </div>
                            </RadioGroup>

                            <div className="flex items-center justify-center gap-4 w-full lg:flex-row flex-col">

                                <div className="w-full relative">
                                    <InputGroup
                                        value={departureCity}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartureCity(e.target.value)}
                                        Icon={PlaneTakeoff}
                                        size={20}
                                        placeholder={"From"}
                                        name="from"
                                    />
                                    {departureCity && <ul className="absolute w-full bg-background text-foreground rounded-xl max-h-32 overflow-auto">

                                        {filteredCities.length ? filteredCities.map(city => <li onClick={() => setDepartureCity(city)} className="text-sm px-5 py-2 border-b-2">{city}</li>) :
                                        <li className="text-sm px-5 py-2 border-b-2">No city found</li>
                                        }
                                    </ul>}

                                </div>

                                <InputGroup
                                    value={arrivalCity}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArrivalCity(e.target.value)}
                                    Icon={PlaneTakeoff}
                                    size={20}
                                    placeholder={"To"}
                                    name="to"
                                    list="suggestions"
                                />
                                <DatePicker placeholder={"Departure Date"} date={departureDate} setDate={handleDepartureDate} />
                                {travelType === "round" && <DatePicker placeholder={"Arrival Date"} date={arrivalDate} setDate={handleArrivalDate} />}
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
            {/* <div className="flex flex-col mt-10 w-full lg:px-20 md:px-10 ">

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
                    false ?
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300,auto))] lg:grid-cols-[repeat(auto-fit,minmax(350px,auto))] gap-y-6 my-8">
                            <DetailCard />
                            <DetailCard />
                            <DetailCard />
                            <DetailCard />
                            <DetailCard />
                        </div>
                        :
                        <div className="flex flex-col gap-y-10 mt-10 items-center justify-center">
                            <Image src={'/noResult.png'} alt="No result Found" height={500} width={500} />
                            <p className="text-3xl">No Result Found</p>
                        </div>
                }
            </div> */}
        </>
    )
}

export default FlightContent
