"use client";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import buses from "@/data/buses.json"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface AddBusModalProps {
    id?: string
    button?: any
    size?: string
}
interface Category {
    [key: string]: string;
    start: string;
    end: string;
    name: string
    price: string
}
const AddBusModal: React.FC<AddBusModalProps> = ({ id, button, size }) => {
    const purpose = !id ? "Add" : "Update"
    const [title, setTitle] = useState<string>("");
    const [departureCity, setDepartureCity] = useState<string>("");
    const [arrivalCity, setArrivalCity] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<string>("");
    const [arrivalDate, setArrivalDate] = useState<string>("");
    const [departureTime, setDepartureTime] = useState<string>("");
    const [arrivalTime, setArrivalTime] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [seats, setSeats] = useState<string>("");
    const [category, setCategory] = useState<Category[]>([{ start: "1", end: "", name: "", price: "" }])
    const [error, setError] = useState<string>("")

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bus/get-bus/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("ticket-master-token")}`
                }
            })
            let data = await response.json()
            if (data.success) {
                data = data.data
                setTitle(data.title);
                setDepartureCity(data.departure.city);
                setArrivalCity(data.arrival.city);
                setDepartureDate(data.departure.date);
                setArrivalDate(data.arrival.date);
                setDepartureTime(data.departure.time);
                setArrivalTime(data.arrival.time);
                setDescription(data.description);
                setCategory(data.category);
                setSeats(data.seats.length);
            }
            else {
                console.log(data)
                return toast.error(data.message || "Some error occurred")
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        purpose === "Update" && getData()
    }, [])
    const handleAddRow = () => {
        if (category.length > 0) {
            const lastCategory = category[category.length - 1];
            if (lastCategory.end) {
                setCategory(category => [
                    ...category,
                    {
                        start: String(parseInt(lastCategory.end, 10) + 1),
                        end: "",
                        name: "",
                        price: "",
                    },
                ]);
            }
            else {
                toast.error("First fill the previous category")
            }
        }
    };
    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedCategories = [...category];
        updatedCategories[index][field] = value;
        // Automatically set the next row's start value
        if (field === "end" && value) {
            setSeats(value)
            const nextStart = parseInt(value, 10) + 1;
            if (updatedCategories[index + 1]) {
                updatedCategories[index + 1].start = nextStart.toString();
            }
        }
        setCategory(updatedCategories);
    };
    const handleRemoveLast = () => {
        if (category.length > 1) {
            setCategory(category.slice(0, -1));
        }
    }
    const validateTable = () => {
        let isValid = true;
        let lastEnd = 0;

        category.forEach((row, index) => {
            const { start, end, category, price } = row;
            if (
                start == "" ||
                end == "" ||
                category == "" ||
                price == ""
            ) {
                isValid = false
                setError("One or more fields are empty")
            }
            else if (parseInt(start, 10) <= lastEnd ||
                parseInt(end, 10) > parseInt(seats, 10)) {
                setError("End value should be greater than start value");
                isValid = false;
            }
            lastEnd = parseInt(end, 10);
        });

        // if (lastEnd !== parseInt(seats, 10)) isValid= false;

        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            title === "" ||
            departureCity === "" ||
            arrivalCity === "" ||
            departureDate === "" ||
            arrivalDate === "" ||
            departureTime === "" ||
            arrivalTime === "" ||
            seats === "" ||
            description === ""
        ) {
            return toast.error("One or more fields are empty");
        }
        else if (!validateTable()) {
            if (error !== "") {
                toast.error(error)
            }
            return
        }


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bus/${purpose == "Add" ? "add" : "update"}-bus${purpose == "Update" ? `/${id}` : ""}`, {
                method: purpose === "Add" ? "POST" : "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("ticket-master-token")}`
                },
                body: JSON.stringify({
                    title,
                    departure: {
                        city: departureCity,
                        time: departureTime,
                        date: departureDate
                    },
                    arrival: {
                        city: arrivalCity,
                        time: arrivalTime,
                        date: arrivalDate,
                    },
                    category,
                    seats,
                    description,
                })
            })
            const data = await response.json()
            if (!data.success) {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred. Please try again later.")
        }
        toast.success(purpose === "Add" ? "Bus details have been added successfully!" : "Bus details have been updated successfully!");
        console.log({
            title,
            departureCity,
            arrivalCity,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            seats,
            description,
        });

        // Reset form fields
        setTitle("");
        setDepartureCity("");
        setArrivalCity("");
        setDepartureDate("");
        setArrivalDate("");
        setDepartureTime("");
        setArrivalTime("");
        setSeats("");
        setDescription("");
        setCategory([{ start: "1", end: "", name: "", price: "" }])
    };
    console.log("redner")
    return (
        <div className="flex items-center justify-center">
            <Modal >
                <ModalTrigger className={buttonVariants({ variant: "default", size: size ? "icon" : "default" })}>
                    {button}
                </ModalTrigger>
                <ModalBody className="p-10 overflow-x-auto overflow-y-auto no-scrollbar">
                    <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="busName">Title</Label>
                            <Input
                                id="busName"
                                placeholder="Example: Swift Express"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </LabelInputContainer>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="departureCity">Departure City</Label>
                                <Input
                                    id="departureCity"
                                    placeholder="Example: New York"
                                    type="text"
                                    value={departureCity}
                                    onChange={(e) => setDepartureCity(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="arrivalCity">Arrival City</Label>
                                <Input
                                    id="arrivalCity"
                                    placeholder="Example: Boston"
                                    type="text"
                                    value={arrivalCity}
                                    onChange={(e) => setArrivalCity(e.target.value)}
                                />
                            </LabelInputContainer>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="departureDate">Departure Date</Label>
                                <Input
                                    id="departureDate"
                                    placeholder="YYYY-MM-DD"
                                    type="date"
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="arrivalDate">Arrival Date</Label>
                                <Input
                                    id="arrivalDate"
                                    placeholder="YYYY-MM-DD"
                                    type="date"
                                    value={arrivalDate}
                                    onChange={(e) => setArrivalDate(e.target.value)}
                                />
                            </LabelInputContainer>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="departureTime">Departure Time</Label>
                                <Input
                                    id="departureTime"
                                    placeholder="HH:MM AM/PM"
                                    type="time"
                                    value={departureTime}
                                    onChange={(e) => setDepartureTime(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="arrivalTime">Arrival Time</Label>
                                <Input
                                    id="arrivalTime"
                                    placeholder="HH:MM AM/PM"
                                    type="time"
                                    value={arrivalTime}
                                    onChange={(e) => setArrivalTime(e.target.value)}
                                />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="w-1/2">
                            <Label htmlFor="seats">Total Seats</Label>
                            <Input
                                id="seats"
                                type="number"
                                value={seats}
                                // onChange={(e) => setArrivalTime(e.target.value)}
                                disabled
                            />
                        </LabelInputContainer>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead colSpan={2}>Range</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                    {
                                        category?.map((category, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        onChange={e => handleInputChange(index, 'start', e.target.value)}
                                                        value={category.start}
                                                        className="w-14 hide-arrows"
                                                        placeholder="start"
                                                        maxLength={2}
                                                        disabled />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        onChange={e => handleInputChange(index, 'end', e.target.value)}
                                                        value={category.end}
                                                        className="w-14 hide-arrows"
                                                        placeholder="end"
                                                        maxLength={2}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        onChange={e => handleInputChange(index, 'name', e.target.value)}
                                                        value={category.name}
                                                        placeholder="i.e Platinum"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        onChange={e => handleInputChange(index, 'price', e.target.value)}
                                                        value={category.price}
                                                        placeholder="i.e 1000"
                                                        className="hide-arrows"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableHeader>
                            </Table>
                            <div className="flex gap-x-2 items-center justify-center">
                                <Button type="button" onClick={handleAddRow} className="my-4 mx-auto">Add Category</Button>
                                <Button type="button" onClick={handleRemoveLast} className="my-4 mx-auto">Remove Last</Button>
                            </div>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="description">Enter Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Provide a description of the bus service..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] group"
                            type="submit"
                        >
                            {purpose} Bus <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        </button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddBusModal;
