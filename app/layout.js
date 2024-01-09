import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Payments: Dukan.io",
  description: "Payment Page for Dukan.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-hidden")}>{children}</body>
    </html>
  );
}
