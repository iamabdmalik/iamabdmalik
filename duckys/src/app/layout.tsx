import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const display = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Ducky's — Food with attitude",
  description: "Pizza, burgers, wings and more from Ducky's. Order online.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffd43b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
