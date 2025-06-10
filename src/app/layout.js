import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Onboarding Form",
  description: "Client Onboarding Form for Financial Advisory",
  icons: {
    icon: '/favicon.ico', // This will typically be picked up automatically if in app/ or public/
    shortcut: '/favicon-16x16.png', // Example for a specific size
    apple: '/apple-touch-icon.png', // Example for Apple touch icon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
