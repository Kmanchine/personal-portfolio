import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { NewspaperMasthead } from "@/components/newspaper/newspaper-masthead";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio Gazette",
    template: "%s · Portfolio Gazette",
  },
  description: "A newspaper-style portfolio of projects and experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=forward_to_inbox"
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <NewspaperMasthead />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
