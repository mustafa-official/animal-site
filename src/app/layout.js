import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export const metadata = {
  title: "Animal Station",
  description: "Welcome to Animal Station, your gateway to exploring the wonders of wildlife and nature!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.className} antialiased bg-black`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
