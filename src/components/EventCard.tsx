import { BellRing, Check } from "lucide-react"

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
import Image from "next/image"

interface EventCardPropos {
  title?: string | "No title"
}

export function EventCard({ title }: EventCardPropos) {
  return (
    <div className="w-[300px] sm:w-[380px] mx-auto rounded-xl overflow-hidden cursor-pointer">
      <div className="overflow-hidden rounded-xl">
        <Image src='/event.jpg' alt="Card" height={1080} width={1080} className="hover:scale-110 transition-transform duration-500" />
      </div>
      <h1 className="text-pretty text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, eaque.</h1>
    </div>
  )
}
