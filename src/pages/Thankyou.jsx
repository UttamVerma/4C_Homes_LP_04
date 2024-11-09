import { useNavigate } from "react-router-dom";
import styles from "../styles/Thankyou.module.css";
import logo from "../assets/logo.png";

let Thankyou = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.thankYouSection}>
      <div className={styles.thankYouContentSection}>
        <img src={logo} loading="lazy" />
        <p>
          We are pleased to inform you that our team is readily available to
          connect with you in the immediate future. Your message has been
          received and acknowledged, and we are keen to establish communication
          with you at the soonest possible time.
        </p>
        <a href="mailto:sales@4chomes.com" target="_blank">
          <button>Email Immediately</button>
        </a>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          Move back
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
