"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextBox";
import Image from "next/image"
import { ImageIcon } from "lucide-react";
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
const AddEventModal: React.FC<AddBusModalProps> = ({ id, button, size }) => {
    const purpose = !id ? "Add" : "Update"
    console.log(id, purpose)
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [seats, setSeats] = useState<number>(0);
    const [file, setFile] = useState<any>(null);
    const [price, setPrice] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("")
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    console.log(date, time)
    const handleInputImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    const handleFileInput = (e: any) => {
        const file = e.target.files?.[0]; // Safely access the first file

        if (!file) {
            return toast.error("No Image Selected")
        }
        setFile(file)
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target?.result;

            if (file.type.startsWith("image/")) {
                setFilePreview(fileContent as string);
            } else {
                toast.error("Invalid File type");
            }
        };

        reader.onerror = () => {
            toast.error("Error reading file");
        };

        reader.readAsDataURL(file); // Start reading the file
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title === "" || description === "" || seats <= 0 || file == "") {
            return toast.error("One or more fields are empty or invalid");
        }

        const formData = new FormData()
        formData.append("title", title);
        formData.append("description", description);
        formData.append("seats", String(seats))
        formData.append("file", file)
        formData.append("price", String(price))
        formData.append("date", date)
        formData.append("time", time)
        setIsLoading(true)
        try {
            // Template API call
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${purpose === "Add" ? "add" : "update"}-event${purpose === "Update" ? `/${id}` : ""}`, {
                method: purpose === "Add" ? "POST" : "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("ticket-master-token")}`
                },
                body: formData
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success(`Event ${purpose.toLowerCase()}ed successfully!`);
            // Additional success handling
        } catch (error) {
            toast.error(`Error: ${(error as Error)?.message ?? "Something went wrong"}`);
        } finally {
            setIsLoading(false)
        }
    };
    const getData = async () => {
        console.log("Getting data....")
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/get-event/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                }
            })
            const data = await response.json()
            if (data.success) {
                const { title, description, seats, price, image, date, time } = data.data
                setTitle(title)
                setDescription(description)
                setSeats(seats)
                setPrice(price)
                setFilePreview(image)
                setDate(date)
                setTime(time)
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
        if (purpose === "Update") {
            getData()
        }
    }, [])
    return (
        <div className="flex items-center justify-center">
            <Modal >
                <ModalTrigger className={buttonVariants({ variant: "default", size: size ? "icon" : "default" })}>
                    {button}
                </ModalTrigger>
                <ModalBody className="p-10 overflow-x-auto overflow-y-auto no-scrollbar">
                    <form className="my-8" onSubmit={handleSubmit}>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="eventName">Title</Label>
                            <Input
                                id="eventName"
                                placeholder="Example: Swift Express"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </LabelInputContainer>


                        <div className="flex gap-x-8">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="maxSeats">Max Seats</Label>
                                <Input
                                    id="maxSeats"
                                    placeholder="100"
                                    type="number"
                                    value={seats}
                                    onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    placeholder="i.e. 1500"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                />
                            </LabelInputContainer>
                        </div>
                        <div className="flex gap-x-8">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="eventName">Description</Label>
                            <RichTextEditor value={description} onChange={setDescription} />

                        </LabelInputContainer>
                        {filePreview && <Image src={filePreview} alt="about" height={200} width={200} className="w-full" id="filePreview" />}
                        <Input ref={fileInputRef} onChange={handleFileInput} accept="image/*" multiple={false} type="file" className="hidden" />
                        <Button onClick={handleInputImageClick} size={"icon"} variant={"outline"} type="button"  >
                            <ImageIcon size={40} />
                        </Button>
                        <button
                            className="mt-2 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] group disabled:hover: disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            {purpose} Train <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        </button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddEventModal;
