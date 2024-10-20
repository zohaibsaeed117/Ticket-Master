"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";
const Hero = () => {
    return (
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
                className="gap-y-8 flex items-center justify-center flex-col rounded-xl p-8">
                <div className="text-3xl md:text-7xl text-balance font-bold text-white text-center">
                    Ticket Master
                </div>
                <div className="font-extralight text-center text-balance text-base md:text-4xl text-neutral-200 py-4">
                    Book Your Tickets with Ease Quick, Reliable, and Secure.
                </div>

                <Link href="/explore" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Get Started
                </Link>
            </motion.div>
        </div>
    )
}

export default Hero
