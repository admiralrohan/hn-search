import Link from "next/link";
import styles from "../../styles/HomePostItem.module.css";
import { Hit } from "../interfaces/search-result";

export default function HomePostItem({ post }: { post: Hit }) {
  const postLink = "/post/" + post.objectID;

  // Calculate relative time
  const getRelativeTime = () => {
    const postAge = +new Date() - post.created_at_i * 1000;

    let formattedPostAge = postAge / 1000 / 60;
    if (formattedPostAge < 1) return "Just posted";
    if (formattedPostAge < 60)
      return Math.round(formattedPostAge) + " minutes ago";

    formattedPostAge /= 60;
    if (formattedPostAge < 24)
      return Math.round(formattedPostAge) + " hours ago";

    formattedPostAge /= 24;
    if (formattedPostAge < 30)
      return Math.round(formattedPostAge) + " days ago";

    formattedPostAge /= 30;
    if (formattedPostAge < 12)
      return Math.round(formattedPostAge) + " months ago";

    formattedPostAge /= 12;
    return Math.round(formattedPostAge) + " years ago";
  };
  let relativeTime = getRelativeTime();

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
        <Link href={postLink}>{relativeTime}</Link> |{" "}
        <Link href={postLink}>{post.num_comments} comments</Link>
      </div>
    </li>
  );
}
