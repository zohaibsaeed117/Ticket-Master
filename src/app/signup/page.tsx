"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import toast from "react-hot-toast";
import Router, { useRouter } from "next/navigation";
interface User {
    firstName: string;
    lastName: string;
    username: string
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
}
export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        username: "",
        age: 10,
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return
        }
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Account created successfully");
                setTimeout(() => {
                    router.push("/login")
                }, 1500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-[90vh] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-background border-border border">
                <h2 className="font-bold text-center text-xl text-foreground">
                    Welcome to Ticket Master
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstName">First name</Label>
                            <Input value={user?.firstName} onChange={handleChange} id="firstName" placeholder="Tyler" type="text" required />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input value={user?.lastName} onChange={handleChange} id="lastName" placeholder="Durden" type="text" required />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="username">Username</Label>
                            <Input value={user?.username} onChange={handleChange} id="username" placeholder="Tyler" type="text" required />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="age">Age</Label>
                            <Input value={user?.age} onChange={handleChange} id="age" placeholder="18" type="number" min={10} max={100} required />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input value={user?.email} onChange={handleChange} id="email" placeholder="projectmayhem@fc.com" type="email" required />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input value={user?.password} onChange={handleChange} id="password" placeholder="••••••••" type="password" required minLength={8} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="confirmPassword">Your Confirm password</Label>
                        <Input value={user?.confirmPassword} onChange={handleChange}
                            id="confirmPassword"
                            placeholder="••••••••"
                            type="password"
                            required
                            minLength={8}
                        />
                    </LabelInputContainer>

                    <button
                        disabled={isLoading}
                        className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] group"
                        type="submit"
                    >
                        Sign up <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        <BottomGradient />
                    </button>
                    <p className="my-2 text-center">Already have an account?{"  "}<Link href="/login" className="underline transition-colors hover:text-foreground/70">Login</Link></p>
                </form>
            </div>
        </div>


    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
function asycn(e: any, arg1: any) {
    throw new Error("Function not implemented.");
}

