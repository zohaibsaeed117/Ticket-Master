import React, { useState } from 'react'
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from './ui/animated-modal'
import CreditCardInput from './CreditCardInput'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast';

interface CreditCard {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
}
const ConfirmPaymentModal = () => {
    const [creditCard, setCreditCard] = useState<CreditCard>({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });

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
    return (
        <Modal>
            <ModalTrigger>
                <Button className="group/btn group">
                    Proceed to Payment
                    <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                </Button>
            </ModalTrigger>
            <ModalBody>
                <ModalContent>
                    <CreditCardInput card={creditCard} setCard={handleChange} />
                </ModalContent>

                <div className='p-10 flex flex-col gap-y-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold'>Total</p>
                        <p className='text-2xl font-this'>2025</p>
                    </div>
                    <Button>Confirm Payment</Button>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default ConfirmPaymentModal
