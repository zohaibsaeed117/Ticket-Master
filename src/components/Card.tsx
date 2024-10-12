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

type CardProps = React.ComponentProps<typeof Card>

export function DetailCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[300px] sm:w-[380px] mx-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>SkyWays</CardTitle>
        <CardDescription>Exectuive Class</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-col gap-y-2">
            <MapPin />
            <span>Lahore</span>
          </div>
          <MoveRight size={50} />
          <div className="flex items-center justify-center flex-col gap-y-2">
            <MapPinCheckIcon />
            <span>Islamabad</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Time</p>
            <p className="text-sm font-light">4:00 AM</p>
          </div>
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Price</p>
            <p className="text-sm font-light">1600 Pkr</p>
          </div>
          <div className="flex items-center justify-center flex-col bg-accent text-accent-foreground h-20 w-20 rounded-lg">
            <p className="text-base font-semibold">Seats Left</p>
            <p className="text-sm font-light">28</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}
