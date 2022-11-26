import Link from "next/link";
import { FormEventHandler } from "react";
import styles from "../../styles/Header.module.css";

interface IHeaderProps {
  searchTerm?: string;
  onSearchTermChange?: FormEventHandler<HTMLInputElement>;
  /** We are not showing search box on individual post page, so this option. Default to `true` as this is most common option. */
  showSearchBox?: boolean;
}

export default function Header({
  searchTerm,
  onSearchTermChange,
  showSearchBox = true,
}: IHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>HN Search</Link>
      </div>

      {showSearchBox && (
        <div className={styles.searchbox}>
          <input
            type="text"
            placeholder="Search stories by title, url, or author"
            value={searchTerm}
            onInput={onSearchTermChange}
          />
        </div>
      )}
    </header>
  );
}
