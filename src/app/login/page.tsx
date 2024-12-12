"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
    const Router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                // Login successful, save the token in localstorage and redirect to the dashboard
                localStorage.setItem("ticket-master-token", data.token);
                console.log("The user is a admin", data.user)
                localStorage.setItem("ticket-master-isAdmin", JSON.stringify(data.user.isAdmin));
                toast.success("Login successful");
                Router.push("/explore");
            } else {
                // Login failed, show error
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            // Catch any other errors
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[90vh] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-background border-border border">
                <h2 className="font-bold text-center text-xl text-foreground">
                    Login to your account
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            title="Please enter a valid email address"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            title="Password should contain at least 8 characters including one uppercase, one lowercase and one number"
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
                    <p className="my-2 text-center">Already have an account?{"  "}<Link href="/signup" className="underline transition-colors hover:text-foreground/70">Signup</Link></p>
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

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
