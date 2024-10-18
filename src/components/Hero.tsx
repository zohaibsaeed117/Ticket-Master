"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";
const Hero = () => {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
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
        </AuroraBackground>
    )
}

export default Hero
