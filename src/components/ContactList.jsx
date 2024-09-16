import React, { useState } from "react";
import styles from "./ContactList.module.css";
import { FaUserTimes, FaRegUser } from "react-icons/fa";

import ContactItem from "./ContactItem";

const ContactList = ({
  contacts,
  onDelete,
  onEdit,
  onDeleteMultiple,
  noContactsFound,
}) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteMultiple = () => {
    onDeleteMultiple(selectedContacts);
    setSelectedContacts([]);
  };

  return (
    <div className={styles.contactListContainer}>
      {/* <h3>Contacts List</h3> */}

      <button
        onClick={handleDeleteMultiple}
        disabled={!selectedContacts.length}
        className={styles.deleteBtn}
      >
        <FaUserTimes /> Delete Selected Contacts
      </button>

      <ul className={styles.contactListHeader}>
        <li>
          <FaRegUser />
        </li>
        <li>Name</li>
        <li>Email</li>
        <li>Phone</li>
        <li>City</li>
        <li>Actions</li>
      </ul>
      {noContactsFound ? (
        <p className={styles.notFound}>No Contact Found!</p>
      ) : (
        <>
          {contacts.length ? (
            <div className={styles.ContactListBody}>
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  data={contact}
                  selectedContacts={selectedContacts}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  toggleSelect={toggleSelect}
                />
              ))}
            </div>
          ) : (
            <p className={styles.message}>No Contact Yet!</p>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
