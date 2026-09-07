import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ACHOVFX - VOICECHAT",
  description: "Video calling App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* Persian Font - Vazirmatn */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body
          className={`bg-dark-2`}
          style={{
            fontFamily: "Vazirmatn, sans-serif",
          }}
        >
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
