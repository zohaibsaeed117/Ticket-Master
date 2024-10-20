"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const Contact = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Log the form values

        if (firstname === "" || lastname === "" || email === "" || message === "") {
            return toast.error("One or more fields are empty")
        }
        toast.success("Your response has been recorded")
        console.log({
            firstname,
            lastname,
            email,
            message,
        });
        // Reset form fields if needed
        setFirstname("");
        setLastname("");
        setEmail("");
        setMessage("");
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/about.jpg')"
                }}
                className="bg-cover bg-center min-h-[92vh] w-full flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="gap-y-8 flex items-center justify-center flex-col gradient-background border rounded-xl p-8">
                    <h1 className="text-center text-4xl font-bold">Contact Us</h1>
                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    placeholder="Tyler"
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input
                                    id="lastname"
                                    placeholder="Durden"
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="projectmayhem@fc.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="message">Enter your message</Label>
                            <Textarea
                                id="message"
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] group"
                            type="submit"
                        >
                            Send Message <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default Contact;
