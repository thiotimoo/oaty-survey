import type { Metadata } from "next";
import { Gabarito, Space_Mono } from "next/font/google";
import "./globals.css";
import PageTransitionEffect from "@/components/Layout/PageTransitionEffect";

const gabarito = Gabarito({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
    weight: ["400", "700"],
});
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${gabarito.className} ${spaceMono.className} overflow-x-hidden`}>
                <div className="grain"></div>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </body>
        </html>
    );
}
