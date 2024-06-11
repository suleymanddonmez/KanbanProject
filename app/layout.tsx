import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RouterListener from "./routerListener";
import ContextProvider from "./contextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Project",
  description: "Nextjs/Reactjs Kanban Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <main className="min-h-screen pt-20 px-5 sm:px-10 md:px-20 lg:px-40">
            {children}
            <RouterListener />
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
