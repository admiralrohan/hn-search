import { GetServerSideProps } from "next";
import Link from "next/link";
import Comments from "../../src/components/Comments";
import Header from "../../src/components/Header";
import { BASE_URL } from "../../src/constants";
import { PostDetail } from "../../src/interfaces/post-detail";
import styles from "../../styles/Post.module.css";

interface IPostProps {
  data: PostDetail;
}

export default function Post({ data: post }: IPostProps) {
  console.log(post);
  const postLink = "/post/" + post.id;

  return (
    <div className={styles.container}>
      <Header showSearchBox={false} />

      <main className={styles.main}>
        <div className={styles.post__title}>
          <Link href={post.url || "#"} className={styles.post__name}>
            {post.title}
          </Link>{" "}
          {post.url && (
            <Link href={post.url} target="_blank" className={styles.post__url}>
              {post.url}
            </Link>
          )}
        </div>

        <div className={styles.post__subtitle}>
          {/* 180 points by jgrahamc on Oct 1, 2021 | hide | past | favorite | 143 comments */}
          {post.points} points by {post.author} on{" "}
          <Link href={postLink}>{post.created_at.toString()}</Link> |{" "}
          <Link href={postLink}>{post.children.length} comments</Link>
        </div>

        <Comments comments={post.children} isFirstComment={true} />
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
