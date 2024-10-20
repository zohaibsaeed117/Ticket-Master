import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login to Your Account - Ticket Reservation",
    description: "Access your account to manage bookings, view history, and make quick reservations for your next journey or event.",
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
