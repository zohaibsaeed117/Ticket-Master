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
import Link from "next/link"

interface EventCardPropos {
  title: string
  image: string
  id: string
}

export function EventCard({ title, image, id }: EventCardPropos) {
  return (
    <Link href={"events/" + id} className="w-[300px] sm:w-[380px] mx-auto rounded-xl overflow-hidden cursor-pointer">
      <div className="overflow-hidden rounded-xl">
        <Image src={image} alt={title} height={1080} width={1080} className="hover:scale-110 transition-transform duration-500" />
      </div>
      <h1 className="text-pretty text-lg font-bold">{title}</h1>
    </Link>
  )
}
