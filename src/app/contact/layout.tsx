import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "About Us - Ticket Reservation",
    description: "Learn more about our platform and how we make it easy for you to reserve tickets for buses, trains, flights, movies, and events.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
