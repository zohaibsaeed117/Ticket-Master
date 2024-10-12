"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Router, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import ResponsiveNavDrawer from "./ResponsiveNavDrawer";
import { useRouter } from "next/navigation";
import { AvatarDropDown } from "./AvatarDropDown";
// import { toast } from "react-hot-toast";
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='bg-background text-foreground flex w-full justify-between font-roboto shadow-md max-lg:flex-row-reverse'>
        <Link href={"/"} className="ml-4">
          <Image width={60} height={60} src={"/logo.png"} alt="Logo" />
        </Link>
        <nav className='hidden justify-end w-[70%] lg:flex'>
          <ul className='flex text-secondary-200 items-center justify-between lg:py-4 gap-x-4'>
            <li><a className="hover:text-foreground/60 transition-colors" href="/">Home</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/explore">Explore</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/about">About</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/contact">Contact</a></li>
            <SeparatorHorizontal orientation="vertical" className="w-[2px] bg-muted-foreground" />
          </ul>
          <div className="flex items-center justify-center mx-4">
            {
              false
                ? <>
                  <AvatarDropDown userName={"Zohaib Saeed"} />
                </> :
                <div className="flex gap-x-4">
                  <Button asChild><Link href="/login">Login</Link></Button>
                  <Button variant="secondary" asChild><Link href="/signup">Signup</Link></Button>
                </div>
            }
          </div>
        </nav>
        <div className='lg:hidden'>
          <Button asChild variant="ghost" size="icon" className='m-4 block lg:hidden' onClick={() => {
            setIsOpen(!isOpen)
          }}>
            <Menu />
          </Button>
        </div>
      </div>
      <ResponsiveNavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
