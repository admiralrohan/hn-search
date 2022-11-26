import React, { FormEventHandler, useEffect, useState } from "react";
import AlertLayout from "../src/components/AlertLayout";
import Header from "../src/components/Header";
import HomePostItem from "../src/components/HomePostItem";
import Pagination from "../src/components/Pagination";
import { BASE_URL, DEBOUNCE_DELAY } from "../src/constants";
import useDebounce from "../src/hooks/useDebounce";
import { SearchResult } from "../src/interfaces/search-result";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<SearchResult>();
  const [page, setPage] = useState<number>(0);
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
        `${BASE_URL}/v1/search?query=${debouncedSearchTerm}&page=${page}`
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
  }, [debouncedSearchTerm, page]);

  return (
    <div className={styles.container}>
      <Header searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />

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

        {requestStatus === "success" && data && data.hits.length > 0 && (
          <Pagination
            currentPage={page}
            setPage={(p) => setPage(p)}
            // Subtracting 1 to convert to zero-based indexing
            highestPossiblePage={data.nbPages - 1}
          />
        )}
      </main>
    </div>
  );
}
