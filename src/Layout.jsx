import React from "react";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Contacts App</h1>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Masi ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
