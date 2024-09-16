import React, { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { FaTimes } from "react-icons/fa";
import inputs from "../constants/inputs";
import citiesData from "../constants/cities.json";

const ContactForm = ({ onSubmit, contactToEdit, onClose }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [suggestedCity, setSuggestedCity] = useState("");

  useEffect(() => {
    if (contactToEdit) {
      setFormValues(contactToEdit);
    }
  }, [contactToEdit]);

  const validate = () => {
    const newErrors = {};

    if (formValues.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
    }

    if (formValues.lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(formValues.phone)) {
      newErrors.phone = "Please enter a valid 11-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      cityChangeHandler(e);
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
      onClose();
    }
  };

  // Capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Search the list of cities
  const findMatches = (wordToMatch, cities) => {
    return cities.filter((city) => {
      return city.startsWith(wordToMatch);
    });
  };

  const cityChangeHandler = (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setSuggestedCity("");
    } else {
      const matchedCities = findMatches(value, citiesData.cities);
      setSuggestedCity(matchedCities[0]); // the first matched city
    }
  };

  return (
    <div className={styles.contactForm}>
      <div className={styles.formContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>{contactToEdit ? "Edit Contact" : "Add Contact"}</h2>
        <form className={styles.form}>
          {inputs.map((input, index) => (
            <div className={styles.formGroup}>
              <div key={index}>
                {input.name === "city" ? (
                  <label htmlFor={input.name}>
                    {suggestedCity ? suggestedCity : ""}
                  </label>
                ) : null}
                <input
                  type={input.type}
                  id={input.name}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={capitalizeWords(formValues[input.name])}
                  onChange={changeHandler}
                />
                {errors[input.name] && (
                  <p className={styles.error}>{errors[input.name]}</p>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className={styles.submitBtn}
            onClick={submitHandler}
          >
            {contactToEdit ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
