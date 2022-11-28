import styles from "../../styles/Pagination.module.css";

interface IPaginationProps {
  currentPage: number;
  setPage: (arg: number) => void;
  // `totalNoOfPages - 1`
  highestPossiblePage: number;
}

export default function Pagination({
  currentPage,
  setPage,
  highestPossiblePage,
}: IPaginationProps) {
  const startingIndex = currentPage - 5 >= 0 ? currentPage - 5 : 0;
  const endingIndex =
    currentPage + 5 <= highestPossiblePage
      ? currentPage + 5
      : highestPossiblePage;

  const pageNos: number[] = [];
  for (let i = startingIndex; i <= endingIndex; i++) {
    pageNos.push(i);
  }

  const changePage = (evt: any, pageNo: number) => {
    evt.preventDefault();
    setPage(pageNo);
  };

  return (
    <ol className={styles.pagination}>
      {currentPage > 0 && (
        <li onClick={(evt) => changePage(evt, 0)}>
          <a href="#" className={styles.page__item}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Go to first page</title>
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </a>
        </li>
      )}

      {pageNos.map((pageNo) => (
        <li key={pageNo} onClick={(evt) => changePage(evt, pageNo)}>
          <a
            href="#"
            className={
              currentPage === pageNo
                ? [styles.page__item, styles.active].join(" ")
                : styles.page__item
            }
          >
            {pageNo + 1}
          </a>
        </li>
      ))}

      {currentPage < highestPossiblePage && (
        <li onClick={(evt) => changePage(evt, highestPossiblePage)}>
          <a href="#" className={styles.page__item}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Go to last page</title>
              <polyline points="13 17 18 12 13 7"></polyline>
              <polyline points="6 17 11 12 6 7"></polyline>
            </svg>
          </a>
        </li>
      )}
    </ol>
  );
}
