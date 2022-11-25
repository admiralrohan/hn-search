import Head from "next/head";
import Link from "next/link";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import HomePostItem from "../src/components/HomePostItem";
import { BASE_URL, DEBOUNCE_DELAY } from "../src/constants";
import { SearchResult } from "../src/interfaces/search-result";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<SearchResult>();

  const onSearchTermChange: FormEventHandler<HTMLInputElement> = (evt) => {
    setSearchTerm((evt.target as HTMLInputElement).value);
  };

  let timerID = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const fetchResults = async () => {
      let result = await fetch(`${BASE_URL}/v1/search?query=${searchTerm}`);
      const data = await result.json();

      setData(data);
    };

    clearTimeout(timerID.current);
    timerID.current = setTimeout(() => {
      fetchResults();
    }, DEBOUNCE_DELAY);
  }, [searchTerm]);

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

      <ul className={styles.postlist}>
        {data &&
          data.hits.map((post) => (
            <HomePostItem key={post.objectID} post={post} />
          ))}
      </ul>
    </div>
  );
}
