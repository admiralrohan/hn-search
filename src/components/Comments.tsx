import { PostDetail } from "../interfaces/post-detail";
import styles from "../../styles/Comments.module.css";
import { getFormattedDate } from "../utils/get-formatted-date";

interface ICommentsProps {
  comments: PostDetail[];
  /** Is this comment list is first of the page? \
   * In other words, does this comment has any parent comment? */
  isFirstComment?: boolean;
}
interface ICommentProps {
  comment: PostDetail;
}

export default function Comments({
  comments,
  isFirstComment = false,
}: ICommentsProps) {
  return (
    <ol
      className={`${styles.comment} ${
        isFirstComment ? styles.comment__first : ""
      }`}
    >
      {comments.map((commentInner) => (
        <Comment key={commentInner.id} comment={commentInner} />
      ))}
    </ol>
  );
}

export function Comment({ comment }: ICommentProps) {
  if (!comment.text) return null;

  return (
    <li key={comment.id}>
      <div className={styles.comment__title}>
        <span dangerouslySetInnerHTML={{ __html: "&#8594;" }} />{" "}
        {comment.author} on {getFormattedDate(comment.created_at)}
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.text || "" }} />

      <Comments comments={comment.children} isFirstComment={false} />
    </li>
  );
}
