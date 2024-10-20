import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { Toaster } from "react-hot-toast"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ticket Reservation - Your One-Stop Booking Platform",
  description: "Book tickets for buses, trains, flights, movies, and events all in one place. Fast, secure, and convenient ticketing at your fingertips.",
};
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: 'hsl(var(--card))',
              color: "hsl(var(--card-foreground))"
            }
          }}
        />
        <Navbar />
        <NextTopLoader
          color="#2299DD"
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  );
}
