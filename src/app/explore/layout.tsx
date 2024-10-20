import ExploreNavbar from "@/components/ExploreNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Tickets - Buses, Trains, Flights, Movies & Events",
  description: " Browse and explore tickets for all travel and entertainment categories, including buses, trains, flights, movies, and events. Find the perfect option for you.",
};

export default function Explore({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <ExploreNavbar />
      {children}
    </>
  );
}
