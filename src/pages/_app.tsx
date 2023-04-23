// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <NextNProgress
          color={"#a1a1aa"}
          options={{ showSpinner: false, easing: "ease" }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
 
export default MyApp;
