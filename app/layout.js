import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContext } from "./Contaxtapi/AuthContext";
import { DataProvider } from "./Contaxtapi/DataProvide";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeoLearn LMS",
  description: "AI Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContext>
          <DataProvider>{children}</DataProvider>
        </AuthContext>
      </body>
    </html>
  );
}
