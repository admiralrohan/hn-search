import Head from "next/head";
import Link from "next/link";
import HomePostItem from "../src/components/HomePostItem";
import { BASE_URL } from "../src/constants";
import { SearchResult } from "../src/interfaces/search-result";
import styles from "../styles/Home.module.css";

interface IHomeProps {
  data: SearchResult;
}

export default function Home({ data }: IHomeProps) {
  console.log(data.hits[0]);

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
          />
        </div>
      </header>

      <ul className={styles.postlist}>
        {data.hits.map((post) => (
          <HomePostItem key={post.objectID} post={post} />
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const searchText = "web3";
  let result = await fetch(`${BASE_URL}/v1/search?query=${searchText}`);
  result = await result.json();

  return {
    props: {
      data: result,
    },
  };
}
