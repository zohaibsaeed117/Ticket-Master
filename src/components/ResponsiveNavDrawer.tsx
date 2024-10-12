import React, { ReactEventHandler, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Button, buttonVariants } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'
import { Menu } from 'lucide-react'

interface ResponsiveNavDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const ResponsiveNavDrawer: React.FC<ResponsiveNavDrawerProps> = ({ isOpen, setIsOpen }) => {
    const drawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div
            ref={drawerRef}
            className={`absolute z-50 top-0 left-0 h-screen border-red-300 bg-background w-[70vw] ${!isOpen ? "-translate-x-[71vw]" : "translate-x-0"}
            transform transition-transform duration-300 ease-in-out`}
        >
            <Button asChild variant="ghost" size="icon" className="m-4 block lg:hidden" onClick={() => setIsOpen(true)}>
                <Menu />
            </Button>
            {false && (
                <div className="flex flex-col items-center justify-center mt-8 gap-y-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/zohaibsaeed117.png" alt="@zohaibsaeed117" />
                        <AvatarFallback>ZS</AvatarFallback>
                    </Avatar>
                    <div>Zohaib Saeed</div>
                    <Separator className="my-4" />
                </div>
            )}

            <div className="min-w-full mt-8">
                <h1 className="text-xl font-bold ml-4">Navigation</h1>
                <div className="flex flex-col items-start justify-center w-full">
                    <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>Home</Link>
                    <Link href="/posts" className={buttonVariants({ variant: "ghost", size: "sm" })}>Feed</Link>
                    <Link href="/about" className={buttonVariants({ variant: "ghost", size: "sm" })}>About Us</Link>
                    <Link href="/contact" className={buttonVariants({ variant: "ghost", size: "sm" })}>Contact Us</Link>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveNavDrawer;
