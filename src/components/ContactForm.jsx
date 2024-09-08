import React, { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { FaTimes } from "react-icons/fa";
import inputs from "../constants/inputs";

const ContactForm = ({ onSubmit, contactToEdit, onClose }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

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
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
      onClose();
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
              {/* <label>{input.placeholder}</label> */}
              <input
                key={index}
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                value={formValues[input.name]}
                onChange={changeHandler}
              />
              {errors[input.name] && (
                <p className={styles.error}>{errors[input.name]}</p>
              )}
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
