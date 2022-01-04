// pages/_document.js

// import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
// import NextDocument, Document, { Html, Head, Main, NextScript } from "next/document";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
// import { extractCritical } from "@emotion/server";
import { resetServerContext } from "react-beautiful-dnd";
// import customTheme from "../theme/customTheme";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps, ...page };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          /> */}
        </Head>
        <body>
          {/* <ColorModeScript
            initialColorMode={customTheme.config.initialColorMode}
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
