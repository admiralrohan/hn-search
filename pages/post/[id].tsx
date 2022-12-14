import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Comments from "../../src/components/Comments";
import Header from "../../src/components/Header";
import { BASE_URL } from "../../src/constants";
import { PostDetail } from "../../src/interfaces/post-detail";
import { getFormattedDate } from "../../src/utils/get-formatted-time";
import styles from "../../styles/Post.module.css";

interface IPostProps {
  data: PostDetail;
}

export default function Post({ data: post }: IPostProps) {
  const [isPageRendered, setIsPageRendered] = useState<boolean>(false);

  useEffect(() => {
    setIsPageRendered(true);
  }, []);

  return (
    <div className={styles.container}>
      <Header showSearchBox={false} />

      <main className={styles.main}>
        <div className={styles.post__title}>
          {post.title &&
            (post.url ? (
              <>
                <Link href={post.url} className={styles.post__name}>
                  {post.title}
                </Link>{" "}
                <Link
                  href={post.url}
                  target="_blank"
                  className={styles.post__url}
                >
                  {post.url}
                </Link>
              </>
            ) : (
              <div className={styles.post__name}>{post.title}</div>
            ))}

          {/* Remove top and bottom margins if post has no title */}
          {post.text && (
            <div
              dangerouslySetInnerHTML={{ __html: post.text }}
              className={
                post.title
                  ? ["remove-margin", styles.post__body].join(" ")
                  : "remove-margin"
              }
            />
          )}
        </div>

        <div className={styles.post__subtitle}>
          {post.points} points by {post.author} on{" "}
          {getFormattedDate(post.created_at)} | {post.children.length} comments
        </div>

        {isPageRendered && (
          <Comments comments={post.children} isFirstComment={true} />
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id: objectID } = query;

  let result = await fetch(`${BASE_URL}/v1/items/${objectID}`);
  result = await result.json();

  return {
    props: {
      data: result,
    },
  };
};
