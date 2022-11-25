import Head from "next/head";
import Link from "next/link";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import AlertLayout from "../src/components/AlertLayout";
import HomePostItem from "../src/components/HomePostItem";
import { BASE_URL, DEBOUNCE_DELAY } from "../src/constants";
import useDebounce from "../src/hooks/useDebounce";
import { SearchResult } from "../src/interfaces/search-result";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<SearchResult>();
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const onSearchTermChange: FormEventHandler<HTMLInputElement> = (evt) => {
    setSearchTerm((evt.target as HTMLInputElement).value);
  };

  const debouncedSearchTerm = useDebounce<string>(searchTerm, DEBOUNCE_DELAY);
  useEffect(() => {
    const fetchResults = async () => {
      const result = await fetch(
        `${BASE_URL}/v1/search?query=${debouncedSearchTerm}`
      );
      const data = await result.json();

      if (result.status < 300) {
        setRequestStatus("success");
        setData(data);
      } else {
        setRequestStatus("error");
        setData(undefined);
      }
    };

    setRequestStatus("loading");
    fetchResults();
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.container}>
      <Head>
        <title>HN Search</title>
        <meta name="description" content="Search hacker news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href={"/"}>HN Search</Link>
        </div>
        <div className={styles.searchbox}>
          <input
            type="text"
            placeholder="Search stories by title, url, or author"
            value={searchTerm}
            onInput={onSearchTermChange}
          />
        </div>
      </header>

      <main className={styles.main}>
        {requestStatus === "loading" && <AlertLayout content="Loading..." />}

        {requestStatus === "success" && data && data.hits.length === 0 && (
          <AlertLayout content="No result found" />
        )}

        {requestStatus === "success" && data && data.hits.length > 0 && (
          <ul className={styles.postlist}>
            {data.hits.map((post) => (
              <HomePostItem key={post.objectID} post={post} />
            ))}
          </ul>
        )}

        {requestStatus === "error" && (
          <AlertLayout content="Some error occurred, refresh the page" />
        )}
      </main>
    </div>
  );
}
