import QueryProvider from "@/lib/providers/QueryProvider";
import { SessionProvider } from "@/lib/providers/SessionProvider";
import Layout from "@/components/layout/Layout";

import "./globals.css";
import "antd/dist/reset.css"; // antd 리셋 css

import type { Metadata } from "next";

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
      <body>
        <SessionProvider>
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
