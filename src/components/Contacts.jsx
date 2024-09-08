import React, { useEffect, useState } from "react";
import { contacts as contactsData } from "../constants/contactsData";
import SearchBox from "./SearchBox";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Modal from "./Modal";
import styles from "./Contacts.module.css";
import { FaPlus } from "react-icons/fa";
import { v4 } from "uuid";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [operation, setOperation] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noContactsFound, setNoContactsFound] = useState(false);

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  const addOrUpdateContactHandler = (contact) => {
    if (contactToEdit) {
      setContacts((prev) =>
        prev.map((item) =>
          item.id === contactToEdit.id
            ? { ...contact, id: contactToEdit.id }
            : item
        )
      );
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
    }
  };

  const deleteContactHandler = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    setIsModalOpen(false);
  };

  const handleDeleteMultipleContacts = (ids) => {
    setContacts((prev) => prev.filter((contact) => !ids.includes(contact.id)));
    setIsModalOpen(false);
  };

  const editContactHandler = (contact) => {
    setContactToEdit(contact);
    setIsFormOpen(true);
  };

  const confirmDelete = (id) => {
    setOperation({ type: "delete", id });
    setIsModalOpen(true);
  };

  const confirmDeleteMultiple = (ids) => {
    setOperation({ type: "deleteMultiple", ids });
    setIsModalOpen(true);
  };

  const modalConfirmHandler = () => {
    if (operation.type === "delete") {
      deleteContactHandler(operation.id);
    } else if (operation.type === "deleteMultiple") {
      handleDeleteMultipleContacts(operation.ids);
    }
    setOperation({});
  };

  const searchHandler = () => {
    if (search) {
      const newContacts = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase())
      );
      if (newContacts.length) {
        setContacts(newContacts);
        setNoContactsFound(false); // Reset the no contacts found state
      } else {
        setContacts([]); // Clear contacts
        setNoContactsFound(true); // Set no contacts found state
      }
    } else {
      setContacts(contactsData); // Reset to original contacts data
      setNoContactsFound(false); // Reset the no contacts found state
    }
  };

  return (
    <div className={styles.app}>
      <button className={styles.addContact} onClick={() => setIsFormOpen(true)}>
        <FaPlus />
      </button>
      <SearchBox
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <ContactList
        contacts={contacts}
        onDelete={confirmDelete}
        onEdit={editContactHandler}
        onDeleteMultiple={confirmDeleteMultiple}
        noContactsFound={noContactsFound}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalConfirmHandler}
        message="Are you sure you want to perform this?"
      />
      {isFormOpen && (
        <ContactForm
          onSubmit={addOrUpdateContactHandler}
          contactToEdit={contactToEdit}
          onClose={() => {
            setIsFormOpen(false);
            setContactToEdit(null);
          }}
        />
      )}
    </div>
  );
}

export default Contacts;
