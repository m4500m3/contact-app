import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onConfirm} className={styles.confirmButton}>
          Confirm
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
