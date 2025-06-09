import { Noto_Sans_KR } from "next/font/google";

import QueryProvider from "@/lib/providers/QueryProvider";
import { SessionProvider } from "@/lib/providers/SessionProvider";
import Layout from "@/components/layout/Layout";

import "./globals.css";
import "antd/dist/reset.css"; // antd 리셋 css

import type { Metadata } from "next";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SM Pay",
  description: "SM Pay Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("process.env.NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <SessionProvider>
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
