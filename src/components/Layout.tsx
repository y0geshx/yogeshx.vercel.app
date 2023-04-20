/* eslint-disable @typescript-eslint/no-unused-vars */

import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import NavBar from "./Nav";
import MobileNavBar from "./MobileNav";
import { KBarProvider } from "kbar";
import Palette from "./CMD";
import { actions } from "../lib/actions";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
// import { loadCursor } from "../lib/cursor";

export default function Layout({
  children,
  description,
  emoji,
  image,
}: {
  children: ReactElement;
  description: string;
  emoji: string;
  image?: string;
}) {
  const currentRoute = useRouter().pathname;
  // const ballRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (typeof window === "undefined" || !ballRef.current) {
  //     return;
  //   }

  //   return loadCursor(ballRef.current);
  // }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href={`https://fmj.asrvd.me/${emoji}`}></link>
        <title>
          {currentRoute === "/" ? "yogesh" : `yogesh // ${currentRoute.slice(1)}`}
        </title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#27272a" />
        <meta property="og:site_name" content="yogesh" />
        <meta
          property="og:title"
          content={`yogesh${
            currentRoute.slice(1).length > 1
              ? ` // ${currentRoute.slice(1)}`
              : ``
          }`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta
          property="twitter:title"
          content={`vibrantfix${
            currentRoute.slice(1).length > 1
              ? ` // ${currentRoute.slice(1)}`
              : ``
          }`}
        />
        <meta property="twitter:description" content={description} />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/92950980/232553035-b7f910f0-f3c5-4acc-93e2-fe9dee891bd2.png"
        />
        <meta
          property="twitter:image"
          content="https://user-images.githubusercontent.com/92950980/232553035-b7f910f0-f3c5-4acc-93e2-fe9dee891bd2.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@yogeshx95" />
      </Head>
      <KBarProvider actions={actions}>
        <main className="flex selection:bg-zinc-200/30 flex-col overflow-x-hidden min-h-screen items-center bg-zinc-100 dark:bg-zinc-900 font-clash max-h-auto relative">
          <Palette />
          <div className="flex w-full h-full lg:w-[60%] md:w-2/3">
            <div className="w-[6%] fixed left-0 h-full z-50 hidden lg:block md:block">
              <NavBar path={currentRoute} />
            </div>
            <div className="fixed top-0 w-full z-50 block lg:hidden md:hidden px-8 pt-4">
              <MobileNavBar path={currentRoute} />
            </div>
            {children}
          </div>
        </main>
      </KBarProvider>
      {/* <div
        ref={ballRef}
        className="ball-transitions pointer-events-none fixed z-[1000] h-6 w-6 rounded-full bg-zinc-800/20 dark:bg-zinc-200/20 shadow-md duration-200"
      /> */}
      <Toaster
        toastOptions={{
          style: {
            background: "#27272a",
            color: "#e4e4e7",
          },
        }}
      />
    </div>
  );
}
