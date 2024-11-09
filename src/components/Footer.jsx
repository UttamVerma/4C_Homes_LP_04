import styles from "../styles/Footer.module.css";
import facebook from "../assets/facebook.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import { Link as ScrollLink } from "react-scroll";
import location from "../assets/location.png";
import email from "../assets/email.png";
import call from "../assets/call.png";
import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
let Footer = () => {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [showSuccessMessage, setShowSuccessMessage] = useState(false);
  let [country, setCountry] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [lookingFor, setLookingFor] = useState("");
  let [priceRange, setPriceRange] = useState(120);
  let [countryCallingCode, setCountryCallingCode] = useState("");
  let [countryData, setCountryData] = useState([]);
  let {
    showLoading,
    setShowLoading,
    showThankYouSection,
    setShowThankYouSection,
  } = useContext(AuthContext);
  let formHandler = (e) => {
    e.preventDefault();
    setShowLoading(true);
    if (
      !name.trim() &&
      !country &&
      !phoneNumber.trim() &&
      !lookingFor &&
      !priceRange.trim()
    ) {
      return;
    } else {
      let myHeaders = new Headers();
      myHeaders.append("apikey", "tLNTAoLNGcfiRRQZ6QHU2K6wjAh008rw");
      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };
      fetch(
        `https://api.apilayer.com/number_verification/validate?number=${countryCallingCode}${phoneNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setShowLoading(false);
          if (result.valid == false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Entered Mobile Number is not Valid.",
              width: "300px",
            });
          } else {
            fetch(
              "https://chomes-lp-default-rtdb.asia-southeast1.firebasedatabase.app/form_data.json",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                  looking_for_which_property: lookingFor,
                  country_code: countryCallingCode,
                  phone_number: phoneNumber,
                  price_range: `Upto $ ${priceRange}K USD`,
                  date: new Date().toDateString(),
                  time_HH_MM_SS: new Date().toLocaleTimeString(),
                }),
              }
            )
              .then((res) => {
                return res.json();
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Entered Mobile Number is not Valid.",
                  width: "300px",
                });
              });
            let emailBody = `
            Hi there,<br>
            You got a form query from ${name}. All the details regarding the query is listed below.<br>
            Name: ${name}<br>
            Interested in: ${lookingFor}<br>
            Phone Number: ${countryCallingCode} ${phoneNumber}<br>
            Price Range: From $120K USD to $ ${priceRange}K USD<br>
            `;
            Email.send({
              Host: "smtp.elasticemail.com",
              Username: "team.creativemonk@gmail.com",
              Password: "D1A332CCE6789B22FA17D1DE4F5E4FCB4C52",
              To: "team.creativemonk@gmail.com",
              From: "team.creativemonk@gmail.com",
              Subject: `Query from ${name}`,
              Body: emailBody,
            }).then(() => {
              setShowLoading(false);
              navigate("/message");
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCountryData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let options = countryData
    .map((country) => {
      let suffixes = country.idd.suffixes ? country.idd.suffixes.join(" ") : "";
      let iddRoot = country.idd.root ? `(${country.idd.root}${suffixes})` : "";
      return {
        value: country.name.common,
        label: (
          <div className={styles.countryOption}>
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{ width: "20px", marginRight: "5px" }}
            />
            {iddRoot} {country.name.common}
          </div>
        ),
      };
    })
    .sort((a, b) => {
      let nameA = a.value.toLowerCase();
      let nameB = b.value.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <div>
            <h2>
              <span className={styles.downWord}>4</span>CHomes
            </h2>
            <p>
              Our real estate services cover all aspects, from property buying
              to selling, renting, and financing. Backed by expert knowledge and
              a commitment to your satisfaction, we ensure a seamless real
              estate journey.
            </p>
            <div className={styles.socialSection}>
              <a
                href="https://www.facebook.com/4chomesrealestate/"
                target="_blank"
              >
                <div>
                  <img src={facebook} />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/4chomes/"
                target="_blank"
              >
                <div>
                  <img src={linkedin} />
                </div>
              </a>
              <a href="https://www.instagram.com/4c.homes/" target="_blank">
                <div>
                  <img src={instagram} />
                </div>
              </a>
            </div>
          </div>
          <div>
            <h2>Useful Links</h2>
            <ScrollLink to="properties" smooth={true} duration={500}>
              <p>Properties</p>
            </ScrollLink>
            <ScrollLink to="whyChooseUs" smooth={true} duration={500}>
              <p>Why Choose Us</p>
            </ScrollLink>
            <ScrollLink to="primeLocations" smooth={true} duration={500}>
              <p>Prime Locations</p>
            </ScrollLink>
            <ScrollLink to="team" smooth={true} duration={500}>
              <p>Team</p>
            </ScrollLink>
          </div>
          <div>
            <h2>Get in Touch</h2>
            <a href="tel: +971 50 525 0476" target="_blank">
              <img src={call} />
              <p>+971 50 525 0476</p>
            </a>
            <a>
              <img src={location} />
              <p>
                Office # 48, 3rd Floor, Oasis Centre, Sheikh Sayed Road, Dubai,
                P.O.Box 128975, Dubai, UAE
              </p>
            </a>
            <a href="mailto:sales@4chomes.com" target="_blank">
              <img src={email} />
              <p>sales@4chomes.com</p>
            </a>
          </div>
          <div className={styles.footerForm}>
            <form onSubmit={formHandler}>
              <h3>Express Your Interest!</h3>
              <input
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                options={options}
                className={styles.countrySelect}
                placeholder="Select Country"
                required
                onChange={(e) => {
                  let childrenLength = e.label.props.children.length;
                  if (e.label.props.children[1]) {
                    setCountryCallingCode(e.label.props.children[1]);
                  }
                  setCountry(e.label.props.children[childrenLength - 1]);
                }}
              />
              <input
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <select
                required
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
              >
                <option value="">Looking for</option>
                <option value="Ready Property">Ready Property</option>
                <option value="Under-contruction Property">
                  Under-contruction Property
                </option>
              </select>
              <p className={styles.priceRangeValue}>
                Price Range:{" "}
                <span className={styles.priceRangeValueDigit}>
                  ${priceRange}K USD
                </span>
              </p>
              <input
                className={styles.priceRangeInput}
                placeholder="Price Range"
                required
                value={priceRange}
                type="range"
                min={120}
                max={10000}
                step={80}
                style={{ outline: "none" }}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
              />
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
      <Loading />
    </>
  );
};

export default Footer;
