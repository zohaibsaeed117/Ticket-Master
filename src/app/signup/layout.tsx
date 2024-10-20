import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Create an Account - Ticket Reservation",
    description: "Join our platform to reserve tickets for buses, trains, flights, movies, and events. Sign up now for a seamless booking experience.",
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
