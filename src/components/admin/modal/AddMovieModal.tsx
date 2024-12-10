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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { compareAsc, compareDesc, format } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";


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
interface TimeSlot {
    [key: string]: string;
    start: string;
    end: string
}
const AddMovieModal: React.FC<AddBusModalProps> = ({ id, button, size }) => {
    const purpose = !id ? "Add" : "Update"
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [seats, setSeats] = useState<number>(0);
    const [file, setFile] = useState<any>(null);
    const [date, setDate] = useState<string>("");
    const [rating, setRating] = useState<number>(0)
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string>("")
    const [category, setCategory] = useState<Category[]>([{ start: "1", end: "", name: "", price: "" }])
    const [timeSlots, setTimeSlot] = useState<TimeSlot[]>([{ start: "", end: "" }])

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

        reader.onload = (movie) => {
            const fileContent = movie.target?.result;

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
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (title === "" || description === "" || seats <= 0 || file == "") {
            return toast.error("One or more fields are empty or invalid");
        } else if (!validateTable()) {
            if (error !== "") {
                toast.error(error)
            }
            return
        }
        const formData = new FormData()
        formData.append("title", title);
        formData.append("description", description);
        formData.append("seats", String(seats))
        formData.append("file", file)
        formData.append("rating", String(rating))
        formData.append("date", date)
        formData.append("category", JSON.stringify(category))
        formData.append("timeSlots", JSON.stringify(timeSlots))
        setIsLoading(true)
        try {
            // Template API call
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${purpose === "Add" ? "add" : "update"}-movie${purpose === "Update" ? `/${id}` : ""}`, {
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

            toast.success(`Movie ${purpose.toLowerCase()}ed successfully!`);
            // Additional success handling
        } catch (error) {
            toast.error(`Error: ${(error as Error)?.message ?? "Something went wrong"}`);
        } finally {
            setIsLoading(false)
        }
    };
    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/get-movie/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                }
            })
            const data = await response.json()
            if (data.success) {
                const { title, description, seats, category, image, date, rating, timeSlots } = data.data
                setTitle(title)
                setDescription(description)
                setSeats(seats)
                setCategory(category)
                setTimeSlot(timeSlots)
                setFilePreview(image)
                setDate(date)
                setRating(rating)
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
    const handleInputChange = (index: number, field: keyof Category, value: string) => {
        const updatedCategories = [...category];
        updatedCategories[index][field] = value;
        // Automatically set the next row's start value
        if (field === "end" && value) {
            setSeats(parseInt(value, 10));
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
    const validateTable = (): boolean => {
        let isValid = true;
        let lastEnd = 0;

        category.forEach((row) => {
            const { start, end, name, price } = row;
            if (
                start === "" ||
                end === "" ||
                name === "" ||
                price === ""
            ) {
                isValid = false;
                setError("One or more fields are empty");
            } else if (parseInt(start, 10) <= lastEnd ||
                parseInt(end, 10) > seats) {
                setError("End value should be greater than start value");
                isValid = false;
            }
            lastEnd = parseInt(end, 10);
        });

        return isValid;
    };
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
    const handleTimeSlotChange = (index: number, field: keyof TimeSlot, value: string) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index][field] = value;
        setTimeSlot(updatedTimeSlots);
    }
    const handleAddTimeSlot = () => {
        if (timeSlots.length > 0) {
            const lastTimeSlot = timeSlots[timeSlots.length - 1];
            if (lastTimeSlot.start === "" || lastTimeSlot.end === "") {
                toast.error("First fill the previous time slot")
                return;
            }
            setTimeSlot(timeSlots => [
                ...timeSlots,
                {
                    end: "",
                    start: ""
                }
            ]);
        }
    };
    const handleRemoveLastTimeSlot = () => {
        if (timeSlots.length > 1) {
            setTimeSlot(timeSlots.slice(0, -1))
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
                            <Label htmlFor="movieName">Title</Label>
                            <Input
                                id="movieName"
                                placeholder="Example: Deadpool and Wolverine"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </LabelInputContainer>


                        <div className="flex gap-x-8">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="rating">Rating</Label>
                                <Input
                                    id="rating"
                                    placeholder="i.e. 1500"
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    onFocus={e => e.target.showPicker()}
                                />
                            </LabelInputContainer>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead colSpan={2}>Range</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
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
                                </TableBody>
                            </Table>
                            <div className="flex gap-x-2 items-center justify-center">
                                <Button type="button" onClick={handleAddRow} className="my-4 mx-auto">Add Category</Button>
                                <Button type="button" onClick={handleRemoveLast} className="my-4 mx-auto">Remove Last</Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>End Time</TableHead>
                                    </TableRow>
                                </TableHeader >
                                <TableBody>
                                    {
                                        timeSlots?.map((slot, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">
                                                    <Input
                                                        type="time"
                                                        onFocus={e => e.target.showPicker()}
                                                        value={slot.start}
                                                        onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Input
                                                        type="time"
                                                        onFocus={e => e.target.showPicker()}
                                                        value={slot.end}
                                                        onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            <div className="flex gap-x-2 items-center justify-center">
                                <Button type="button" onClick={handleAddTimeSlot} className="my-4 mx-auto">Add TimeSlot</Button>
                                <Button type="button" onClick={handleRemoveLastTimeSlot} className="my-4 mx-auto">Remove Last</Button>
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="movieName">Description</Label>
                                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />

                            </LabelInputContainer>
                        </div>
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
                            {purpose} Movie <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        </button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddMovieModal;
