import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = ({ id, selectedContacts, toggleSelect }) => {
  return (
    <label className={styles.contactCheckbox}>
      <input
        type="checkbox"
        checked={selectedContacts.includes(id)}
        onChange={() => toggleSelect(id)}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
