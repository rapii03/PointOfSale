/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Head from "../../node_modules/next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <div className="bgAwalLogin h-screen flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="text-white font-bold text-8xl text-center">
              Yang's Grosir
            </p>
            <p className="text-white font-semibold text-4xl text-center mt-10">
              Point of Sales
            </p>

            <a
              href="/login"
              className="bg-[#FF6B35] w-1/3 rounded-md p-2 font-semibold text-2xl text-white mt-20 text-center "
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
