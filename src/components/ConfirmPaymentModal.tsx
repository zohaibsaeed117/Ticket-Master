import React, { useState } from 'react'
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from './ui/animated-modal'
import CreditCardInput from './CreditCardInput'
import { Button, buttonVariants } from './ui/button'
import { toast } from 'react-hot-toast';

interface CreditCard {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
}
interface ConfirmPaymentModalProps {
    bookingType: string
    requestData: any
    bookingId: any
    totalPrice: number
}
const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({ bookingType, requestData, bookingId, totalPrice }) => {
    const [creditCard, setCreditCard] = useState<CreditCard>({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: any) => {
        setCreditCard(creditCard => {
            if (e.target.name == "number" && e.target.value.length > 16) {
                toast.dismiss("card-error")
                toast.error("Card cannot be more than 16 characters long", { id: "card-error" })
                return creditCard
            }
            else if (e.target.name == "cvv" && e.target.value.length > 3) {
                toast.dismiss("card-error")
                toast.error("CVV cannot be more than 3 characters long", { id: "card-error" })
                return creditCard
            }
            else if (e.target.name == "expiry") {
                if (e.target.value.length > 5) {
                    toast.dismiss("card-error")
                    toast.error("Expiry cannot be more than 5 characters long", { id: "card-error" })
                    return creditCard
                }
                else if (e.target.value.length === 3) {
                    return {
                        ...creditCard,
                        expiry: creditCard.expiry + "/"
                    }
                }
            }
            return {
                ...creditCard,
                [e.target.name]: e.target.value
            }
        });
    }
    const handlePayment = async () => {
        if (!creditCard.number || !creditCard.cvv || !creditCard.expiry) return toast.error("Please fill all the fields of Credit Card")
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/book-${bookingType}/${bookingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ticket-master-token")}`,
                },
                body: JSON.stringify({
                    seats: requestData,
                    price: totalPrice
                })
            })
            const data = await response.json()
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            return toast.error(`Error: ${(error as Error).message || "Something went wrong"}`)
        } finally {
            setIsLoading(false)
        }
        // setCreditCard({
        //     number: "",
        //     name: "",
        //     expiry: "",
        //     cvv: ""
        // })

    }
    return (
        <Modal>
            <ModalTrigger disabled={requestData <= 0}>
                <div className={`${buttonVariants({ variant: "default" })} group/btn group  w-full `}>
                    Proceed to Payment
                    <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                </div>
            </ModalTrigger>
            <ModalBody className='overflow-y-auto no-scrollbar'>
                <ModalContent>
                    <CreditCardInput card={creditCard} setCard={handleChange} />
                </ModalContent>

                <div className='p-10 flex flex-col gap-y-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold'>Total</p>
                        <p className='text-2xl font-this'>{totalPrice}</p>
                    </div>
                    <Button disabled={isLoading} onClick={handlePayment}>
                        {
                            isLoading ? <div className='spinner'></div> : "Confirm Payment"
                        }
                    </Button>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default ConfirmPaymentModal
