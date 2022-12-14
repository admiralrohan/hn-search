import Link from "next/link";
import styles from "../../styles/HomePostItem.module.css";
import { Hit } from "../interfaces/search-result";
import { getRelativeTime } from "../utils/get-relative-time";

/** Used in home page */
export default function HomePostItem({ post }: { post: Hit }) {
  const postLink = "/post/" + post.objectID;

  let relativeTime = getRelativeTime(post.created_at_i);

  return (
    <li className={styles.post}>
      <div className={styles.post__title}>
        <Link href={postLink} className={styles.post__name}>
          {post.title}
        </Link>{" "}
        {post.url && (
          <Link href={post.url} target="_blank" className={styles.post__url}>
            {post.url}
          </Link>
        )}
        {!post.title && (
          <div dangerouslySetInnerHTML={{ __html: post.story_text || "" }} />
        )}
      </div>

      <div className={styles.post__subtitle}>
        <Link href={postLink}>{post.points} points</Link> | {post.author} |{" "}
        <Link href={postLink}>{relativeTime}</Link> |{" "}
        <Link href={postLink}>{post.num_comments} comments</Link>
      </div>
    </li>
  );
}
