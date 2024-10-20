import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact Us - Ticket Reservation",
    description: "Have questions or need assistance? Get in touch with our support team for help with your bookings or inquiries.",
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
