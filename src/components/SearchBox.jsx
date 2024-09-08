import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, searchHandler }) {
  return (
    <div className={styles.searchContaineer}>
      <input
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <button onClick={searchHandler} className={styles.button}>
        <IoSearchSharp />
      </button>
    </div>
  );
}

export default SearchBox;
