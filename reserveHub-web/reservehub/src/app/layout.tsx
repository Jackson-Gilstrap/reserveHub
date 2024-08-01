import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hartwick College VITA reservation system",
  author: "Jackson Gilstrap",
  description: "Reservation system for client to book tax services provided"
};

export default function RootLayout({ children }:any ) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
        <StoreProvider children={children}/>
        </body>
    </html>
  );
}
