import { BellRing, Check, Star } from "lucide-react"

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

interface MovieCardPropos {
  id: number
  title: string;
  rating: Number;
  poster: string;
}

export function MovieCard({ id, title, rating, poster }: MovieCardPropos) {
  return (
    <Link href={`movies/${id}`} className="w-[300px] sm:w-[380px] mx-auto rounded-xl overflow-hidden cursor-pointer">
      <div className="overflow-hidden rounded-xl">
        <Image src={poster} alt={title + "'s Poster"} height={1080} width={1080} className="hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-pretty text-lg font-bold">{title}</h1>
        <div className="inline-flex gap-x-2">
          <Star color="yellow" fill="yellow" />
          {rating?.toString()}
        </div>
      </div>
    </Link>
  )
}
