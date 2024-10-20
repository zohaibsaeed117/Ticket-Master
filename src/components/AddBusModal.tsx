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
import { buttonVariants } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import buses from "@/data/buses.json"
interface AddBusModalProps {
    id?: number
    button?: any
    size?: string
}
const AddBusModal: React.FC<AddBusModalProps> = ({ id, button, size }) => {
    const purpose = !id ? "Add" : "Update"
    const [busName, setBusName] = useState<string>("");
    const [departureCity, setDepartureCity] = useState<string>("");
    const [arrivalCity, setArrivalCity] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<string>("");
    const [arrivalDate, setArrivalDate] = useState<string>("");
    const [departureTime, setDepartureTime] = useState<string>("");
    const [arrivalTime, setArrivalTime] = useState<string>("");
    const [totalSeats, setTotalSeats] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            busName === "" ||
            departureCity === "" ||
            arrivalCity === "" ||
            departureDate === "" ||
            arrivalDate === "" ||
            departureTime === "" ||
            arrivalTime === "" ||
            totalSeats === "" ||
            totalPrice === "" ||
            description === ""
        ) {
            return toast.error("One or more fields are empty");
        }

        toast.success(purpose === "Add" ? "Bus details have been added successfully!" : "Bus details have been updated successfully!");
        console.log({
            busName,
            departureCity,
            arrivalCity,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            totalSeats,
            totalPrice,
            description,
        });

        // Reset form fields
        setBusName("");
        setDepartureCity("");
        setArrivalCity("");
        setDepartureDate("");
        setArrivalDate("");
        setDepartureTime("");
        setArrivalTime("");
        setTotalSeats("");
        setTotalPrice("");
        setDescription("");
    };
    const getData = () => {
        const data = buses.find(data => data.id === id)
        if (!data) {
            return toast.error("Some error occured")
        }
        setBusName(data.title);
        setDepartureCity(data.departure.city);
        setArrivalCity(data.arrival.city);
        setDepartureDate(data.departure.date);
        setArrivalDate(data.arrival.date);
        setDepartureTime(data.departure.time);
        setArrivalTime(data.arrival.time);
        setTotalSeats(data.seats.length.toString());
        setTotalPrice(data.price.toString());
        setDescription(data.description);
    }
    useEffect(() => {
        purpose === "Update" && getData()
    }, [])


    return (
        <div className="flex items-center justify-center">
            <Modal>
                <ModalTrigger className={buttonVariants({ variant: "default", size: size ? "icon" : "default" })}>
                    {button}
                </ModalTrigger>
                <ModalBody className="p-10 overflow-x-auto overflow-y-hidden">
                    <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="busName">Bus Name</Label>
                            <Input
                                id="busName"
                                placeholder="Example: Swift Express"
                                type="text"
                                value={busName}
                                onChange={(e) => setBusName(e.target.value)}
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
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="totalSeats">Total Seats</Label>
                                <Input
                                    id="totalSeats"
                                    placeholder="Example: 50"
                                    type="number"
                                    value={totalSeats}
                                    onChange={(e) => setTotalSeats(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="totalPrice">Total Price ($)</Label>
                                <Input
                                    id="totalPrice"
                                    placeholder="Example: 100.00"
                                    type="number"
                                    step="0.01"
                                    value={totalPrice}
                                    onChange={(e) => setTotalPrice(e.target.value)}
                                />
                            </LabelInputContainer>
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