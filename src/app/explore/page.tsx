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
import EventContent from "@/components/explore/EventContent"
import MoviesContent from "@/components/explore/MovieContent"

export default function Explore() {
  return (
    <>
      <Tabs defaultValue="movies" className="w-full mx-auto mt-4">
        <TabsList className="w-[80%] flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
          {
            ["bus", "train", "flight", "events", "movies"]
              .map(category => <TabsTrigger value={category} className="flex-1" >{category.charAt(0).toUpperCase() + category.slice(1)}</TabsTrigger>)
          }
        </TabsList>
        <TabsContent value="bus">
          <BusContent />
        </TabsContent>
        <TabsContent value="train">
          <TrainContent />
        </TabsContent>
        <TabsContent value="flight">
          <FlightContent />
        </TabsContent>
        <TabsContent value="events">
          <EventContent />
        </TabsContent>
        <TabsContent value="movies">
          <MoviesContent />
        </TabsContent>
      </Tabs>
    </>
  )
}

