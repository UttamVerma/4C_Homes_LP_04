import styles from "../styles/NotFound.module.css"

let NotFound = () => {
  return (
    <div className={styles.notFoundSection}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <a href="/">
        <button>Move Back</button>
      </a>
    </div>
  );
};

export default NotFound;
