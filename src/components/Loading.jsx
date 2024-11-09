import { useContext } from "react";
import styles from "../styles/Loading.module.css";
import { AuthContext } from "../context/AuthContextProvider";
let Loading = () => {
  let { showLoading, setShowLoading } = useContext(AuthContext);
  return (
    <div
      className={`${styles.loading} ${
        showLoading ? styles.showLoading : styles.hideLoading
      }`}
    >
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
