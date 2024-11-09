import styles from "../styles/Homepage.module.css";
import topImage from "../assets/topBanner.jpg";
import whiteCircle from "../assets/whiteCircle.png";
import whyInvest from "../assets/whyInvest.jpg";
import goldenVisa from "../assets/goldenVisaUSD.jpg";
import blackCircle from "../assets/blackCircle.png";
import sqaure from "../assets/squareImg.png";
import assistingImg from "../assets/assistingImg.jpg";
import whyChoose from "../assets/whyChoose.jpg";
import rightArrow from "../assets/rightArrow.png";
import downtownImg from "../assets/downtownDubai.jpg";
import palm from "../assets/palmImage.jpg";
import dubaiMariana from "../assets/dubaiMariana.jpg";
import cityWalk from "../assets/cityWalk.jpg";
import dubaiCreek from "../assets/dubaiCreek.jpg";
import marinaStar from "../assets/marianStar.webp";
import palmBeach from "../assets/palmBeach.webp";
import harburGate from "../assets/harbourGate1.jpg";
import garima from "../assets/garima.jpg";
import induKaur from "../assets/induKaur.jpg";
import suparana from "../assets/supernaBanerjee.jpg";
import joydeep from "../assets/joydeepSingh.jpg";
import majd from "../assets/majdNaseer.jpeg";
import flexible from "../assets/flexible.png";
import affordable from "../assets/affordable.png";
import reliable from "../assets/reliable.png";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Form from "../components/Form";
import { AuthContext } from "../context/AuthContextProvider";
import whatsapp from "../assets/whatsapp.png";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

let Homepage = () => {
  let navigate = useNavigate();
  // let [formForOneTime, setFormForOneTime] = useState(true);
  // let [showFormWhenScroll, setShowFormWhenScroll] = useState(false);
  let [propertyRedirect1, setPropertyRedirect1] = useState(false);
  let [propertyRedirect2, setPropertyRedirect2] = useState(false);
  let [propertyRedirect3, setPropertyRedirect3] = useState(false);
  let [downtownDubaiRedirect, setDowntownDubaiRedirect] = useState(false);
  let [palmJumeriahRedirect, setPalmJumeriahRedirect] = useState(false);
  let [dubaiMarinaRedirect, setDubaiMarinaRedirect] = useState(false);
  let [cityWalkRedirect, setCityWalkRedirect] = useState(false);
  let [dubaiCreekHarbourRedirect, setDubaiCreekHarbourRedirect] =
    useState(false);
  let [name2, setName2] = useState("");
  let [phoneNumber2, setPhoneNumber2] = useState("");
  let [country2, setCountry2] = useState("");
  let [countryCallingCode2, setCountryCallingCode2] = useState("");
  let [name, setName] = useState("");
  let [showSuccessMessage, setShowSuccessMessage] = useState(false);
  let [country, setCountry] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [lookingFor, setLookingFor] = useState("");
  let [priceRange, setPriceRange] = useState(120);
  let [countryCallingCode, setCountryCallingCode] = useState("");
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
  let [countryData, setCountryData] = useState([]);
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
      ".css-1xc3v61-indicatorContainer"
    );
    if (indicatorContainer) {
      indicatorContainer.remove();
    }
  }, []);
  useEffect(() => {
    let countryValue = document.getElementById("react-select-5-placeholder");
    let countryValue2 = document.getElementById("react-select-3-input");
    if (countryValue) {
      countryValue.style.position = "absolute";
      countryValue.style.top = "10px";
      countryValue.style.left = "5px";
    }
    if (countryValue2) {
      countryValue2.style.position = "absolute";
      countryValue2.style.top = "10px";
      countryValue2.style.left = "5px";
    }
  }, []);
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
              Subject: `Query from ${name} (Landing Page)`,
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
  let formHandler2 = (e) => {
    e.preventDefault();
    setShowLoading(true);
    if (!name2.trim() && !country2 && !phoneNumber2.trim()) {
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
              "https://chomes-lp-default-rtdb.asia-southeast1.firebasedatabase.app/reach_out_section.json",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name2,
                  country_code: countryCallingCode2,
                  phone_number: phoneNumber2,
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
              You got a form query from ${name2}. All the details regarding the query is listed below.<br>
              Name: ${name2}<br>
              Phone Number: ${countryCallingCode2} ${phoneNumber2}<br>
              `;
            Email.send({
              Host: "smtp.elasticemail.com",
              Username: "team.creativemonk@gmail.com",
              Password: "D1A332CCE6789B22FA17D1DE4F5E4FCB4C52",
              To: "team.creativemonk@gmail.com",
              From: "team.creativemonk@gmail.com",
              Subject: `Query from ${name} (Reach Out Section - Landing Page)`,
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
              loading="lazy"
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
    if (showLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLoading]);

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        showSuccessMessage(false);
      }, 2000);
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    let inputElement = document.getElementById("react-select-5-input");
    if (inputElement) {
      inputElement.style.width = "auto";
    }
  }, []);
  useEffect(() => {
    if (formSubmitted && propertyRedirect1) {
      window.location.href =
        "https://4chomes.com/property/1bedroom-apartment-for-sale-in-marina-star/";
    }
  }, [formSubmitted, propertyRedirect1]);

  useEffect(() => {
    if (formSubmitted && propertyRedirect2) {
      window.location.href =
        "https://4chomes.com/property/2bedroom-apartment-for-sale-in-palm-beach-tower-2/";
    }
  }, [formSubmitted, propertyRedirect2]);

  useEffect(() => {
    if (formSubmitted && propertyRedirect3) {
      window.location.href =
        "https://4chomes.com/property/2bedroom-apartment-for-sale-in-harbour-gate-1/";
    }
  }, [formSubmitted, propertyRedirect3]);

  useEffect(() => {
    if (formSubmitted && downtownDubaiRedirect) {
      window.location.href =
        "https://4chomes.com/property/1br-apartment-for-sale-in-azizi-aura/";
    }
  }, [formSubmitted, downtownDubaiRedirect]);

  useEffect(() => {
    if (formSubmitted && palmJumeriahRedirect) {
      window.location.href =
        "https://4chomes.com/property/2bedroom-apartment-for-sale-in-palm-beach-tower-2/";
    }
  }, [formSubmitted, palmJumeriahRedirect]);

  useEffect(() => {
    if (formSubmitted && dubaiMarinaRedirect) {
      window.location.href =
        "https://4chomes.com/property/1bedroom-apartment-for-sale-in-marina-star/";
    }
  }, [formSubmitted, dubaiMarinaRedirect]);

  useEffect(() => {
    if (formSubmitted && cityWalkRedirect) {
      window.location.href =
        "https://4chomes.com/property/studio-apartment-for-sale-in-uniset/";
    }
  }, [formSubmitted, cityWalkRedirect]);

  useEffect(() => {
    if (formSubmitted && dubaiCreekHarbourRedirect) {
      window.location.href =
        "https://4chomes.com/property/2bedroom-apartment-for-sale-in-harbour-gate-1/";
    }
  }, [formSubmitted, dubaiCreekHarbourRedirect]);

  // useEffect(() => {
  //   function handleScroll() {
  //     let totalHeight = document.body.scrollHeight;
  //     let pageHeightToDisplayForm = Math.floor(totalHeight / 2);
  //     let scroll = window.scrollY;
  //     if (scroll > pageHeightToDisplayForm) {
  //       setFormForOneTime(false);
  //       setShowFormWhenScroll(true);
  //     } else {
  //       setShowFormWhenScroll(false);
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (showFormWhenScroll) {
  //     setShowForm(true);
  //   }
  // }, [showFormWhenScroll]);
  return (
    <div>
      <div className="App">
        <div>
          <Navbar />
          <div
            className={styles.topSection}
            style={{
              backgroundImage: `linear-gradient(to right , rgba(0, 0, 0, 0.5) , rgba(0, 0, 0, 0.5)),url(${topImage})`,
            }}
            loading="lazy"
          >
            <div className={`${styles.container} ${styles.topContentSection}`}>
              <div className={styles.topHeadingSection}>
                <img src={whiteCircle} loading="lazy" />
                <h3>WELCOME TO 4CHOMES REAL ESTATE</h3>
                <h1>
                  Invest In Luxury Property In Dubai And Get 8-10% Net ROI
                </h1>
                <p>
                  Embark on Your Journey of Endless Opportunities with 4CHOMES
                  REAL ESTATE
                </p>
                <button onClick={() => setShowForm(true)}>Enquire Now</button>
              </div>
              <div className={styles.topFormSection}>
                <h3>Unlock Your Dubai Real Estate Investment With Us</h3>
                <p>Get the instant quotes from our sales representatives!</p>
                <form onSubmit={formHandler}>
                  <input
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={styles.countrySelectWithPhoneNumberSection}>
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
                      type="number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <select
                    className={styles.lookingForSelect}
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
                {showSuccessMessage ? (
                  <p
                    className={styles.successMessage}
                    style={{ color: "green" }}
                  >
                    Form Submitted Successfully!
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.whyInvestSection}>
            <div
              className={`${styles.container} ${styles.whyInvestContentSection}`}
            >
              <img src={whyInvest} loading="lazy" />
              <div className={styles.whyInvestHeadingSection}>
                <h3>Why Invest In Dubai ?</h3>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Amongst the Safest City in the World</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Strategically located with Worldwide Connectivity</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Outstanding Infrastructure</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Highly Competitive Price</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Fastest Growing Economy</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Freehold Ownership</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>High Capital Appreciation with 8-10% ROI on an Average</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>Long Term Golden Visa</p>
                </div>
                <div>
                  <svg
                    aria-hidden="true"
                    className="e-font-icon-svg e-far-arrow-alt-circle-right"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                  </svg>
                  <p>100% Tax Free Income</p>
                </div>
                <button onClick={() => setShowForm(true)}>Enquire Now</button>
              </div>
            </div>
          </div>
          <div className={styles.paymentPlansSection}>
            <div
              className={`${styles.container} ${styles.paymentPlansContentSection}`}
            >
              <h3>Your dream Investments - Our Payment Plans</h3>
              <p>
                Explore our variety of payment plans designed to suit your
                property investment needs. From straightforward options to
                tailored solutions, we offer flexibility to make your dream of
                property ownership a reality. Contact us today for personalized
                assistance and embark on your journey to owning a
                property hassle-free.
              </p>
              <div className={styles.paymentGridSection}>
                <div className={styles.paymentSingleSection}>
                  <img src={reliable} />
                  <h4>Reliable Plans</h4>
                </div>
                <div className={styles.paymentSingleSection}>
                  <img src={affordable} />
                  <h4>Affordable Prices</h4>
                </div>
                <div className={styles.paymentSingleSection}>
                  <img src={flexible} />
                  <h4>Flexible Payments</h4>
                </div>
              </div>
              <button
                className={styles.enquireNowBtn}
                onClick={() => setShowForm(true)}
              >
                Enquire Now
              </button>
            </div>
          </div>
          <div className={styles.goldenVisaSection}>
            <div
              className={`${styles.container} ${styles.goldenVisaContentSection}`}
            >
              <div className={styles.goldenVisaHeadingSection}>
                <img
                  src={sqaure}
                  className={styles.squareImg}
                  style={{ width: "150px", height: "150px", zIndex: 2 }}
                  loading="lazy"
                />
                <img
                  src={blackCircle}
                  className={styles.blackCircleImg}
                  style={{ width: "100px", height: "100px", zIndex: "2" }}
                  loading="lazy"
                />
                <h1>
                  Apply For UAE 10 Years Golden Visa With USD 603 K. Worth Of
                  Investments In Property.
                </h1>
                <p>
                  Dubai has been a hub of foreign investment for several years
                  now, and its real estate sector has been one of the major
                  factors driving this trend. The UAE government offers several
                  investment and residency programs for foreign investors, and
                  the real estate residency visa is one of the most popular
                  options.
                </p>
                <p>
                  The real estate residency visa allows investors to obtain
                  residency in Dubai by investing in the city’s lucrative
                  property market with a minimum of USD 191 K. where, foreign
                  investors can get residency permits for up to two years, which
                  can be renewed upon expiry. However, for investors seeking
                  long-term stability and security, the Golden Visa program is
                  an excellent option. It requires an investment of USD 603 K
                  and grants a ten-year residency permit, as well as a host of
                  other benefits.
                </p>
                <button onClick={() => setShowForm(true)}>Enquire Now</button>
              </div>
              <img src={goldenVisa} loading="lazy" />
            </div>
          </div>
          <div
            className={styles.assistingSection}
            style={{
              backgroundImage: `linear-gradient(to right , rgba(0, 0, 0, 0.6) , rgba(0, 0, 0, 0.6)),url(${assistingImg})`,
            }}
          >
            <div
              className={`${styles.container} ${styles.assistingContentSection}`}
            >
              <div className={styles.assistingHeadingSection}>
                <h1>
                  Assisting You In Discovering The Ideal Commercial Property.
                </h1>
              </div>
              <button onClick={() => setShowForm(true)}>Enquire Now</button>
            </div>
          </div>
          <div className={styles.whyChooseUsSection} id="whyChooseUs">
            <div
              className={`${styles.container} ${styles.whyChooseContentSection}`}
            >
              <div className={styles.whyChooseImgSection}>
                <img
                  src={sqaure}
                  className={styles.sqaure2}
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                  }}
                  loading="lazy"
                />
                <img
                  src={whyChoose}
                  className={styles.whyChooseImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.whyChooseHeadingSection}>
                <h1>Why Choose Us?</h1>
                <div>
                  <img src={rightArrow} className={styles.rightArrow} />
                  <p>
                    Substantial experience and knowledge of the Dubai real
                    estate market
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    A wide range of high-quality luxury properties available for
                    short and long-term investment
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    Professional and personalized service to cater to individual
                    needs and preferences
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    Transparent and fair pricing policies with no hidden fees or
                    charges
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    Proven track record of successful investments and satisfied
                    clients
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    Strong network and partnerships with reputable developers
                    and industry professionals
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    Commitment to ethical and responsible business practices.
                  </p>
                </div>
                <div>
                  <img
                    src={rightArrow}
                    className={styles.rightArrow}
                    loading="lazy"
                  />
                  <p>
                    In-house mortgage support team is always ready to assist you
                    with your finances in Dubai and ease your investment
                    process.
                  </p>
                </div>
                <button onClick={() => setShowForm(true)}>Enquire Now</button>
              </div>
            </div>
          </div>
          <div className={styles.primeLocationSection} id="primeLocations">
            <h1>Prime Locations in Dubai</h1>
            <div
              className={`${styles.container} ${styles.primeLocationContentSection}`}
            >
              <div className={styles.primeLocationHeadingSection}>
                <h2>Downtown Dubai</h2>
                <div>
                  <p>
                    Located at the heart of the city, Downtown Dubai is
                    synonymous with luxury and opulence. Home to architectural
                    marvels like the Burj Khalifa and the Dubai Mall, this
                    bustling district offers a lifestyle that blends
                    sophistication with convenience. With its iconic landmarks,
                    upscale shopping destinations, and gourmet dining options,
                    Downtown Dubai is the epitome of cosmopolitan living,
                    attracting residents and visitors alike from around the
                    world.
                  </p>
                  <p>
                    Situated amidst a vibrant urban landscape, Downtown Dubai
                    offers an unmatched array of amenities and attractions. From
                    exclusive residential towers offering panoramic views of the
                    city to vibrant cultural hubs like the Opera District, this
                    dynamic neighborhood caters to every lifestyle need. Whether
                    you’re strolling along the bustling boulevards or enjoying a
                    leisurely afternoon by the Dubai Fountain, Downtown Dubai
                    exudes an aura of elegance and excitement that truly defines
                    the essence of modern Dubai living.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDowntownDubaiRedirect(true);
                    setShowForm(true);
                  }}
                >
                  Check Properties
                </button>
              </div>
              <div className={styles.primeLocationImgSection}>
                <img src={downtownImg} loading="lazy" />
                <div>
                  <p>Prime Location</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.container} ${styles.primeLocationContentSection}`}
            >
              <div className={styles.primeLocationImgSection}>
                <img src={palm} loading="lazy" />
                <div>
                  <p>Prime Location</p>
                </div>
              </div>
              <div className={styles.primeLocationHeadingSection}>
                <h2>Palm Jumeirah</h2>
                <div>
                  <p>
                    An architectural marvel set against the backdrop of the
                    Arabian Gulf, Palm Jumeirah is a symbol of luxury and
                    exclusivity. Shaped like a palm tree, this man-made island
                    is home to some of the most prestigious residential
                    addresses in Dubai. From lavish waterfront villas to
                    luxurious beachfront apartments, Palm Jumeirah offers
                    residents an unparalleled lifestyle surrounded by pristine
                    beaches and turquoise waters.
                  </p>
                  <p>
                    Beyond its stunning residential properties, Palm Jumeirah
                    boasts a vibrant community atmosphere enriched by
                    world-class amenities and leisure facilities. Residents can
                    indulge in a plethora of recreational activities, from water
                    sports and beachfront dining to exclusive access to private
                    members’ clubs and luxury spas. With its unparalleled views
                    and lavish lifestyle offerings, Palm Jumeirah stands as a
                    testament to Dubai’s reputation as a global destination for
                    luxury living.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPalmJumeriahRedirect(true);
                    setShowForm(true);
                  }}
                >
                  Check Properties
                </button>
              </div>
            </div>
            <div
              className={`${styles.container} ${styles.primeLocationContentSection}`}
            >
              <div className={styles.primeLocationHeadingSection}>
                <h2>Dubai Marina</h2>
                <div>
                  <p>
                    Dubai Marina epitomizes modern urban living against a
                    backdrop of stunning waterfront vistas. This bustling
                    district is renowned for its sleek skyscrapers, bustling
                    promenades, and vibrant social scene. Offering a perfect
                    blend of luxury, convenience, and entertainment, Dubai
                    Marina is a sought-after destination for residents and
                    tourists alike.
                  </p>
                  <p>
                    From stylish residential towers offering panoramic views of
                    the marina to trendy cafes and upscale boutiques lining the
                    waterfront, Dubai Marina offers a lifestyle that is both
                    cosmopolitan and relaxed. Residents can enjoy a wide range
                    of leisure activities, including yacht cruises, waterside
                    dining, and access to exclusive beach clubs. With its
                    dynamic atmosphere and stunning surroundings, Dubai Marina
                    captures the essence of modern Dubai living, making it an
                    ideal choice for those seeking an urban lifestyle with a
                    touch of coastal charm.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDubaiMarinaRedirect(true);
                    setShowForm(true);
                  }}
                >
                  Check Properties
                </button>
              </div>
              <div className={styles.primeLocationImgSection}>
                <img src={dubaiMariana} loading="lazy" />
                <div>
                  <p>Prime Location</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.container} ${styles.primeLocationContentSection}`}
            >
              <div className={styles.primeLocationImgSection}>
                <img src={cityWalk} loading="lazy" />
                <div>
                  <p>Prime Location</p>
                </div>
              </div>
              <div className={styles.primeLocationHeadingSection}>
                <h2>City Walk</h2>
                <div>
                  <p>
                    City Walk is an ideal destination for investors seeking to
                    invest in a luxurious and modern lifestyle. With its prime
                    location in the heart of Dubai and its unique combination of
                    residential, commercial, and entertainment offerings, City
                    Walk has become an iconic destination for residents and
                    visitors alike. Investing in City Walk offers a wide range
                    of benefits and opportunities. Firstly, it offers a high
                    return on investment due to its strategic location and
                    growing demand for luxury properties in Dubai. Secondly, it
                    provides an opportunity to invest in a thriving community
                    with a unique blend of commercial, residential, and
                    entertainment offerings. City Walk promises an unparalleled
                    lifestyle experience with its premium amenities and modern
                    design. Its pedestrian-friendly streets, lush green spaces,
                    and vibrant cultural scene make it an ideal destination for
                    families, young professionals, and retirees seeking a
                    luxurious and cosmopolitan lifestyle.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCityWalkRedirect(true);
                    setShowForm(true);
                  }}
                >
                  Check Properties
                </button>
              </div>
            </div>
            <div
              className={`${styles.container} ${styles.primeLocationContentSection}`}
            >
              <div className={styles.primeLocationHeadingSection}>
                <h2>Dubai Creek Harbour</h2>
                <div>
                  <p>
                    Creek Harbour is one of the most sought-after investment
                    destinations in Dubai, offering a unique combination of
                    waterfront living, modern design, and unparalleled
                    amenities. Investing in Creek Harbour offers a multitude of
                    benefits and opportunities for investors seeking to invest
                    in a thriving community. Firstly, Creek Harbour offers high
                    rental yields due to its prime location and growing demand
                    for waterfront properties in Dubai. Secondly, it provides a
                    unique opportunity to invest in a master-planned community
                    with world-class infrastructure, cutting-edge technology,
                    and sustainable design. Creek Harbour promises an
                    exceptional lifestyle experience with its premium amenities,
                    including a yacht club, waterfront promenade, and a range of
                    retail and dining options. Its stunning views of Dubai Creek
                    and its close proximity to Dubai’s major landmarks make it
                    an ideal destination for families, young professionals, and
                    retirees seeking a luxurious and cosmopolitan lifestyle.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDubaiCreekHarbourRedirect(true);
                    setShowForm(true);
                  }}
                >
                  Check Properties
                </button>
              </div>
              <div className={styles.primeLocationImgSection}>
                <img src={dubaiCreek} loading="lazy" />
                <div>
                  <p>Prime Location</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.reachOutSection}>
            <div
              className={`${styles.container} ${styles.reactOutContentSection}`}
            >
              <h1>Reach Out To Us Now!!</h1>
              <form onSubmit={formHandler2}>
                <div className={styles.reachOutFormSection}>
                  <input
                    placeholder="Name"
                    required
                    className={styles.nameInput}
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                  />
                  <Select
                    options={options}
                    placeholder="Select Country"
                    className={styles.countrySelect2}
                    required
                    onChange={(e) => {
                      let childrenLength = e.label.props.children.length;
                      if (e.label.props.children[1]) {
                        setCountryCallingCode2(e.label.props.children[1]);
                      }
                      setCountry2(e.label.props.children[childrenLength - 1]);
                    }}
                  />
                  <input
                    placeholder="Phone Number"
                    required
                    className={styles.nameInput}
                    value={phoneNumber2}
                    onChange={(e) => setPhoneNumber2(e.target.value)}
                  />
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.latestPropertiesSection} id="properties">
            <div
              className={`${styles.container} ${styles.latestPropertiesContentSection}`}
            >
              <h1>Latest Properties Listed</h1>
              <div className={styles.latestPropertiesGridSection}>
                <div className={styles.propertyCard}>
                  <img src={marinaStar} loading="lazy" />
                  <div className={styles.forSaleSection}>
                    <p>For Sale</p>
                  </div>
                  <h3>1 BEDROOM APARTMENT FOR SALE IN MARINA STAR</h3>
                  <h4>Marina Star, Dubai Marina Dubai</h4>
                  <p className={styles.locationSpecs}>
                    Ready to Move | 687 Sq. Ft
                  </p>
                  <button
                    onClick={() => {
                      setPropertyRedirect1(true);
                      setShowForm(true);
                    }}
                  >
                    Download Brochure
                  </button>
                </div>
                <div className={styles.propertyCard}>
                  <img src={palmBeach} loading="lazy" />
                  <div className={styles.forSaleSection}>
                    <p>For Sale</p>
                  </div>
                  <h3>2 BEDROOM APARTMENT FOR SALE IN PALM BEACH TOWER 2</h3>
                  <h4>Palm Beach Tower, Palm Jumeirah Dubai</h4>
                  <p className={styles.locationSpecs}>Offplan | 1,535 Sq. Ft</p>
                  <button
                    onClick={() => {
                      setPropertyRedirect2(true);
                      setShowForm(true);
                    }}
                  >
                    Download Brochure
                  </button>
                </div>
                <div className={styles.propertyCard}>
                  <img src={harburGate} loading="lazy" />
                  <div className={styles.forSaleSection}>
                    <p>For Sale</p>
                  </div>
                  <h3>2 BEDROOM APARTMENT FOR SALE IN HARBOUR GATE 1</h3>
                  <h4>Harbour Gate 1, Dubai Creek Harbour, Dubai</h4>
                  <p className={styles.locationSpecs}>
                    Ready to Move | 1,152 Sq. Ft
                  </p>
                  <button
                    onClick={() => {
                      setPropertyRedirect3(true);
                      setShowForm(true);
                    }}
                  >
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.takeActionSection}
            style={{
              backgroundImage: `linear-gradient(to right , rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)),url(${assistingImg})`,
            }}
          >
            <div
              className={`${styles.container} ${styles.takectionContentSection}`}
            >
              <h1>
                Take Action In Real Estate Today And Watch Your Investment
                Flourish Tomorrow.
              </h1>
              <p>
                Real estate investment offers the potential for substantial
                returns over time. Property values tend to appreciate, creating
                opportunities for wealth accumulation. Strategic real estate
                decisions made today can secure financial stability for the
                future.
              </p>
              <button onClick={() => setShowForm(true)}>Contact Now</button>
            </div>
          </div>
          <div className={styles.teamSection} id="team">
            <div className={`${styles.container} ${styles.teamContentSection}`}>
              <h1>Team You Can Trust</h1>
              <p>
                The team of professionals at 4C Homes covers all major
                communities in Dubai. We have real estate experts who offer a
                wide range of services, including residential and commercial
                sales and leasing, off-plan investments, property management,
                and more. You can connect with our experts to navigate through
                the real estate buying process in Dubai with ease.
              </p>
              <div className={styles.teamGridSection}>
                <div>
                  <img src={garima} loading="lazy" />
                  <h3>Ms. Garima Saraswat</h3>
                </div>
                <div>
                  <img src={induKaur} loading="lazy" />
                  <h3>Ms. Indu Kaur</h3>
                </div>
                <div>
                  <img src={suparana} loading="lazy" />
                  <h3>Ms. Suparna Banerjee</h3>
                </div>
                <div>
                  <img src={joydeep} loading="lazy" />
                  <h3>Mr. Joydeep Singh</h3>
                </div>
                <div>
                  <img src={majd} loading="lazy" />
                  <h3>Mr. Majd Nasser</h3>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <Form />
          <div className={styles.whatsappSymbol} id="whatsappSymbol">
            <a href="https://wa.me/message/YQNHVNB46BU4K1" target="_blank">
              <img
                src={whatsapp}
                loading="lazy"
                className="whatsapp-contact"
                id="whatsapp-contact-section"
              />
            </a>
          </div>
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
