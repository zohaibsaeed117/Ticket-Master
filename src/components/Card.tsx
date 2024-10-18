import { BellRing, Check, Clock8, MapPin, MapPinCheckIcon, MoveRight, ReceiptIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { format } from "date-fns"


const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

interface DetailCardProps {
  id: number;
  title: string;
  description: string;
  departure: {
    city: string
    time: string;
    date: string
  }
  arrival: {
    city: string
    time: string;
    date: string
  }
  price: number
  seatsLeft: number
  href: string
}

const DetailCard: React.FC<DetailCardProps> = ({ id, href, title, description, departure, arrival, price, seatsLeft }) => {
  return (
    <Card className="w-[300px] sm:w-[380px] mx-auto" >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-col gap-y-2">
            <MapPin />
            <span>{departure.city}</span>
          </div>
          <MoveRight size={50} />
          <div className="flex items-center justify-center flex-col gap-y-2">
            <MapPinCheckIcon />
            <span>{arrival.city}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Date</p>
            <p className="text-sm font-light">{format(departure?.date, "dd-MMM-yyyy")}</p>
          </div>
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Price</p>
            <p className="text-sm font-light">{price} Pkr</p>
          </div>
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Seats Left</p>
            <p className="text-sm font-light">{seatsLeft}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href} >Book Now</Link>
        </Button>
      </CardFooter>
    </Card >
  )
}
export default DetailCard