import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

export { metadata } from "./metadata";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
