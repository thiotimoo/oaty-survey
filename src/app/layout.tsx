import type { Metadata } from "next";
import { Gabarito, Space_Mono } from "next/font/google";
import "./globals.css";
import PageTransitionEffect from "@/components/Layout/PageTransitionEffect";

const gabarito = Gabarito({ subsets: ["latin"] });
const spaceMono = Space_Mono({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
    weight: ["400", "700"],
});
export const metadata: Metadata = {
    title: "OAT Yosuka",
    description: "Overthinking Assessment for Teens YOSUKA",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" translate="no">
            <body className={`${gabarito.className} ${spaceMono.className} overflow-x-hidden`}>
                <div className="grain"></div>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </body>
        </html>
    );
}
