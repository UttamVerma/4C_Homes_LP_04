import styles from "../styles/Navbar.module.css";
import logo from "../assets/logo.png";
import { Link as ScrollLink } from "react-scroll";
import hamburger from "../assets/hamburger.png";
import { useEffect, useState } from "react";

let Navbar = () => {
  let [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  return (
    <>
      <div className={`${styles.container} ${styles.navbar}`}>
        <div className={styles.logoSection}>
          <img src={logo} />
        </div>
        <div className={styles.optionsSection}>
          <ScrollLink to="properties" smooth={true} duration={500}>
            <div>Properties</div>
          </ScrollLink>
          <ScrollLink to="whyChooseUs" smooth={true} duration={500}>
            <div>Why Choose Us</div>
          </ScrollLink>
          <ScrollLink to="primeLocations" smooth={true} duration={500}>
            <div>Prime Locations</div>
          </ScrollLink>
          <ScrollLink to="team" smooth={true} duration={500}>
            <div>Team</div>
          </ScrollLink>
        </div>
        <div className={styles.callSection}>
          <a href="tel: +971 50 525 0476" target="_blank">
            <svg
              aria-hidden="true"
              className="e-font-icon-svg e-fas-headphones-alt"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="gold"
            >
              <path d="M160 288h-16c-35.35 0-64 28.7-64 64.12v63.76c0 35.41 28.65 64.12 64 64.12h16c17.67 0 32-14.36 32-32.06V320.06c0-17.71-14.33-32.06-32-32.06zm208 0h-16c-17.67 0-32 14.35-32 32.06v127.88c0 17.7 14.33 32.06 32 32.06h16c35.35 0 64-28.71 64-64.12v-63.76c0-35.41-28.65-64.12-64-64.12zM256 32C112.91 32 4.57 151.13 0 288v112c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16V288c0-114.67 93.33-207.8 208-207.82 114.67.02 208 93.15 208 207.82v112c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16V288C507.43 151.13 399.09 32 256 32z"></path>
            </svg>
            <p>+971 50 525 0476</p>
          </a>
        </div>
        <div
          className={styles.hamburgerSection}
          onClick={() => {
            if(showHamburgerMenu){
              setShowHamburgerMenu(false);
            }
            else{
              setShowHamburgerMenu(true);
            }
          }}
        >
          <img src={hamburger} />
        </div>
      </div>
      {/* <div
        className={`${styles.nestedMobileMenu} ${
          showHamburger ? styles.showNestedMobileMenu : ""
        }`}
        ref={nestedMobileMenuRef}
      ></div> */}
      <div
        className={`${styles.hamburgerMenuSection} 
      ${showHamburgerMenu ? styles.showHamburgerMenu : null}`}
      >
        <div>
          <ScrollLink
            to="properties"
            smooth={true}
            duration={500}
            onClick={() => setShowHamburgerMenu(false)}
          >
            Properties
          </ScrollLink>
        </div>
        <div>
          <ScrollLink
            to="whyChooseUs"
            smooth={true}
            duration={500}
            onClick={() => setShowHamburgerMenu(false)}
          >
            Why Choose Us
          </ScrollLink>
        </div>
        <div>
          <ScrollLink
            to="primeLocations"
            smooth={true}
            duration={500}
            onClick={() => setShowHamburgerMenu(false)}
          >
            Prime Locations
          </ScrollLink>
        </div>
        <div>
          <ScrollLink
            to="team"
            smooth={true}
            duration={500}
            onClick={() => setShowHamburgerMenu(false)}
          >
            Team
          </ScrollLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
