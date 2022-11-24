import Link from "next/link";
import styles from "../../styles/HomePostItem.module.css";

export default function HomePostItem({ post }: any) {
  return (
    <li className={styles.post}>
      <div className={styles.post__title}>
        <Link href={"/post/" + post.objectID} className={styles.post__name}>
          {post.title}
        </Link>{" "}
        (
        <Link href={post.url} target="_blank" className={styles.post__url}>
          {post.url}
        </Link>
        )
      </div>

      <div className={styles.post__subtitle}>
        <Link href={"/post/" + post.objectID}>{post.points} points</Link> |{" "}
        {post.author} |{" "}
        <Link href={"/post/" + post.objectID}>11 months ago</Link> |{" "}
        <Link href={"/post/" + post.objectID}>
          {post.num_comments} comments
        </Link>
      </div>
    </li>
  );
}
