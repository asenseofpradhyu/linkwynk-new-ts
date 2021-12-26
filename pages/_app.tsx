import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import customTheme from "../theme/customTheme";

const MyApp = function ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <>
        <ChakraProvider resetCSS theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </>
    </SessionProvider>
  );
};

export default MyApp;
