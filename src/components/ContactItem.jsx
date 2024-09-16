import React from "react";
import CheckBox from "./CheckBox";
import styles from "./ContactItem.module.css";
import { FaUserEdit, FaTrash } from "react-icons/fa";

function ContactItem({
  data,
  selectedContacts,
  onEdit,
  onDelete,
  toggleSelect,
}) {
  // console.log(data);
  const { id, firstName, lastName, email, phone, city } = data;
  return (
    <ul className={styles.contactListItem}>
      <li>
        <CheckBox
          key={id}
          id={id}
          selectedContacts={selectedContacts}
          toggleSelect={toggleSelect}
        />
        {/* <label className={styles.contactCheckbox}>
          <input
            type="checkbox"
            checked={selectedContacts.includes(id)}
            onChange={() => toggleSelect(id)}
          />
          <span className="checkmark"></span>
        </label> */}
      </li>
      <li>{`${firstName} ${lastName}`}</li>
      <li>{email}</li>
      <li>{phone}</li>
      <li>{city}</li>
      <li>
        <button onClick={() => onEdit(data)} className={styles.actionButton}>
          <FaUserEdit />
        </button>
        <button onClick={() => onDelete(id)} className={styles.actionButton}>
          <FaTrash />
        </button>
      </li>
    </ul>
  );
}

export default ContactItem;
