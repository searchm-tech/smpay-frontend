import { Inter } from "next/font/google";

import QueryProvider from "@/lib/providers/QueryProvider";
import Layout from "@/components/layout/Layout";

import "./globals.css";
import "antd/dist/reset.css"; // antd 리셋 css

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SM Pay",
  description: "SM Pay Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProvider>
          <Layout>{children}</Layout>
        </QueryProvider>
      </body>
    </html>
  );
}
