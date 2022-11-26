/**
 * Used in post list, to show how old the post is
 *
 * @param createdAt Post creation time in seconds
 * @returns How much time is gone since that time, in human readable format
 */
export const getRelativeTime = (createdAt: number): string => {
  const postAge = +new Date() - createdAt * 1000;

  let formattedPostAge = postAge / 1000 / 60;
  if (formattedPostAge < 1) return "Just posted";
  if (formattedPostAge < 60)
    return Math.round(formattedPostAge) + " minutes ago";

  formattedPostAge /= 60;
  if (formattedPostAge < 24) return Math.round(formattedPostAge) + " hours ago";

  formattedPostAge /= 24;
  if (formattedPostAge < 30) return Math.round(formattedPostAge) + " days ago";

  formattedPostAge /= 30;
  if (formattedPostAge < 12)
    return Math.round(formattedPostAge) + " months ago";

  formattedPostAge /= 12;
  return Math.round(formattedPostAge) + " years ago";
};
