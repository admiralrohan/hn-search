import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const BASE_URL = "https://hn.algolia.com/api/v1";

interface IHomeProps {
  data: any;
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
        {data.hits.map((post: any) => (
          <li key={post.objectID} className={styles.post}>
            <div className={styles.post__title}>
              <Link
                href={"/post/" + post.objectID}
                className={styles.post__name}
              >
                {post.title}
              </Link>{" "}
              (
              <Link
                href={post.url}
                target="_blank"
                className={styles.post__url}
              >
                {post.url}
              </Link>
              )
            </div>

            <div className={styles.post__subtitle}>
              <Link href={"/post/" + post.objectID}>{post.points} points</Link>{" "}
              | {post.author} |{" "}
              <Link href={"/post/" + post.objectID}>11 months ago</Link> |{" "}
              <Link href={"/post/" + post.objectID}>
                {post.num_comments} comments
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const searchText = "web3";
  let result = await fetch(`${BASE_URL}/search?query=${searchText}`);
  result = await result.json();

  return {
    props: {
      data: result,
    },
  };
}
