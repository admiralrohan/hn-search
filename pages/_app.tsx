import type { AppProps } from "next/app";
import ErrorBoundary from "../src/components/ErrorBoundary";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/utilities.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Head>
        <title>HN Search</title>
        <meta name="description" content="Search hacker news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
