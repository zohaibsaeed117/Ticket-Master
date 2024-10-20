"use client"
import React from "react";
import { motion } from "framer-motion";
const About = () => {
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
          className="gap-y-16 flex items-center justify-center flex-col">
          <h1 className="text-center text-4xl font-bold">About Us</h1>
          <p className="px-32 text-2xl text-pretty text-center">Welcome to Ticket Master, your one-stop destination for seamless ticket reservations for buses, trains, flights, movies, and events. Our mission is to make travel and entertainment as accessible and hassle-free as possible, providing you with an intuitive platform to book your tickets with just a few clicks.</p>
        </motion.div>
      </div>
    </>
  );
};
export default About;
