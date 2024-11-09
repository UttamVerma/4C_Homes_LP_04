import styles from "../styles/Form.module.css";
import close from "../assets/close.png";
import logo from "../assets/logo.png";
import Select from "react-select";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
let Form = () => {
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
    showForm,
    setShowForm,
    showLoading,
    setShowLoading,
    showThankYouSection,
    setShowThankYouSection,
    formSubmitted,
    setFormSubmitted,
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
              setFormSubmitted(true);
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
  useEffect(() => {
    let indicatorContainer = document.querySelector(
      ".css-1hb7zxy-IndicatorsContainer"
    );
    if (indicatorContainer) {
      indicatorContainer.remove();
    }
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

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        showSuccessMessage(false);
      }, 2000);
    }
  }, [showSuccessMessage]);
  return (
    <>
      <div
        className={`${styles.form} ${
          showForm ? styles.showForm : styles.hideForm
        }`}
      >
        <div
          className={`${styles.formContentSection} ${
            showForm
              ? styles.showFormContentSection
              : styles.hideFormContentSection
          }`}
        >
          <div className={styles.closeSection}>
            <img src={close} onClick={() => setShowForm(false)} />
          </div>
          <div className={styles.formHeadingSection}>
            <img src={logo} />
            <h1>Unlock your Dubai Real Estate Investment with us</h1>
            <p>Get the instant quotes from our sales representatives!</p>
            <form onSubmit={formHandler}>
              <input
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div>
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
              </div>
              <select
                required
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
              >
                <option value="">Looking for</option>
                <option value="Ready Property">Ready Property</option>
                <option value="Under-construction Property">
                  Under-construction Property
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

export default Form;
