"use client";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle } from "lucide-react";
import Loader from "@/components/Loader";
import { formatDate } from "date-fns";
import BusTable from "@/components/admin/table/BusTable";
import TrainTable from "@/components/admin/table/TrainTable";
import FlightTable from "@/components/admin/table/FlightTable";
import EventTable from "@/components/admin/table/EventTable";
import MovieTable from "@/components/admin/table/MovieTable";

// Dynamically import AddBusModal


const Page = () => {


  return (
    <>
      <Tabs defaultValue="bus" className="h-10 w-full md:m-10">
        <TabsList defaultValue={"flight"} className="md:w-[80%] w-full flex flex-1 flex-wrap items-center justify-center h-full mx-auto">
          {["bus", "train", "flight", "events", "movies"].map((category) => (
            <TabsTrigger key={category} value={category} className="flex-1">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="bus">
          <BusTable />
        </TabsContent>
        <TabsContent value="train">
          <TrainTable />
        </TabsContent>
        <TabsContent value="flight">
          <FlightTable />
        </TabsContent>
        <TabsContent value="events">
          <EventTable />
        </TabsContent>
        <TabsContent value="movies">
          <MovieTable />
        </TabsContent>

      </Tabs >
    </>
  );
};

export default Page;
