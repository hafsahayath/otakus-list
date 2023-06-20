import Search from "@/components/Search";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Otaku's List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={`${inter.className} mb-4`}>
        <Navbar>
          <Search />
        </Navbar>
        <main className="max-w-[1200px] mx-auto px-2">{children}</main>
      </body>
    </html>
  );
}
