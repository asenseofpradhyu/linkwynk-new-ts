/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import "../styles/font.css";
import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import customTheme from "../theme/customTheme";

// eslint-disable-next-line func-names
const MyApp = function ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default MyApp;
