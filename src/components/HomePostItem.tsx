import Link from "next/link";
import styles from "../../styles/HomePostItem.module.css";

export default function HomePostItem({ post }: any) {
  const postLink = "/post/" + post.objectID;

  return (
    <li className={styles.post}>
      <div className={styles.post__title}>
        <Link href={postLink} className={styles.post__name}>
          {post.title}
        </Link>{" "}
        (
        <Link href={post.url} target="_blank" className={styles.post__url}>
          {post.url}
        </Link>
        )
      </div>

      <div className={styles.post__subtitle}>
        <Link href={postLink}>{post.points} points</Link> | {post.author} |{" "}
        <Link href={postLink}>11 months ago</Link> |{" "}
        <Link href={postLink}>{post.num_comments} comments</Link>
      </div>
    </li>
  );
}
