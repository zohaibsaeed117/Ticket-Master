"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState } from "react"
import BusContent from "@/components/explore/BusContent"
import TrainContent from "@/components/explore/TrainContent"
import FlightContent from "@/components/explore/FlightContent"

export default function Explore() {
  const [ticketType, setTicketType] = useState<String>("bus")
  return (
    <>
      <Tabs defaultValue="flight" className="w-full mx-auto mt-4">
        <TabsList className="w-[80%] flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
          {
            ["bus", "train", "flight", "events", "movies"]
              .map(category => <TabsTrigger value={category} className="flex-1" onClick={() => setTicketType(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</TabsTrigger>)
          }
        </TabsList>
        <TabsContent value="bus">
          <BusContent />
        </TabsContent>
        <TabsContent value="train">
          <TrainContent />
        </TabsContent>
        <TabsContent value="flight">
          <FlightContent/>
        </TabsContent>
        <TabsContent value="events">
          train
        </TabsContent>
        <TabsContent value="movies">
          train
        </TabsContent>
      </Tabs>
    </>
  )
}

