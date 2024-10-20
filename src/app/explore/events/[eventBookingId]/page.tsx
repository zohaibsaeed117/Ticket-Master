'use client';

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

interface EventBookingPageProps {
    params: {
        EventBookingId: string;
    };
}

const EventBookingPage: React.FC<EventBookingPageProps> = ({ params }) => {
    return (
        <>
            <h1 className="my-4 text-2xl text-center md:text-2xl lg:text-4xl font-bold">Taxx Oil Presents PakWheels Lahore Auto Show 2024</h1>
            <div className="flex p-6 rounded-xl gap-4 flex-row">
                <div className="flex items-center flex-col">
                    <div className="bg-card p-6 rounded-xl border">
                        <h4 className="text-2xl font-bold">Event Details</h4>
                        <p className="mx-4 mt-2 text-xl font-light">PakWheels is bringing its Lahore Auto Show to the Expo Center for the second time! Join us on 20th Oct 2024 from 12 PM to 8 PM with your family and friends to experience the best of Lahore's car culture. See you there!</p>
                    </div>

                    <div className='w-full my-4 bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                        <p className='text-2xl font-bold'>Customer Details</p>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input
                                id="full-name"
                                placeholder="i.e. John Doe"
                                type="text"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="cnic">CNIC</Label>
                            <Input
                                id="cnic"
                                placeholder="i.e. XXXXX-XXXXXXX-X"
                                type="text"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="phone-number">Phone Number</Label>
                            <Input
                                id="phone-number"
                                placeholder="i.e. +92 300 0000000"
                                type="text"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="i.e. XXXXX-XXXXXXX-X"
                                type="email"
                            />
                        </LabelInputContainer>
                        <Button className="group/btn group">
                            Proceed to Payment
                            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                        </Button>

                    </div>
                </div>
                <div className='w-full flex gap-y-4 flex-col'>
                    <div className='bg-card p-6 rounded-xl flex flex-col gap-y-4 border'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Taxx Oil Presents PakWheels Lahore Auto Show 2024</h1>
                            <p className='text-xl'>Lahore</p>
                            <p className='font-light text-base'>19-Oct-2024</p>
                        </div>
                        <div className="border-t-2 border-b-2 py-4">
                            <p className='text-2xl font-bold'>Subtotal</p>
                            <div className='flex items-center justify-between'>
                                <p className="text-2xl font-semibold" >Outbound</p>
                                <p className="text-2xl">Rs.2022</p>
                            </div>
                        </div>
                        <Separator />
                        <div className='flex items-center justify-between'>
                            <p className='text-2xl font-bold'>Total</p>
                            <p className='text-2xl'>Rs. 525</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventBookingPage;
