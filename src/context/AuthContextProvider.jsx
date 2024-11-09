import { createContext, useState } from "react";

export let AuthContext = createContext();
let AuthContextProvider = ({ children }) => {
  let [showForm, setShowForm] = useState(false);
  let [formSubmitted, setFormSubmitted] = useState(false);
  let [showLoading, setShowLoading] = useState(false);
  let [showThankYouSection, setShowThankYouSection] = useState(false);
  let obj = {
    showForm,
    setShowForm,
    showLoading,
    setShowLoading,
    showThankYouSection,
    setShowThankYouSection,
    formSubmitted,
    setFormSubmitted,
  };
  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
