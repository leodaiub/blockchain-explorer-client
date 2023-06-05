/* eslint-disable @next/next/no-page-custom-font */
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import AuthContext from "./AuthContext";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import NavBar from "@/app/components/NavBar";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(OPTIONS);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Blockchain Explorer</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthContext session={session}>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
