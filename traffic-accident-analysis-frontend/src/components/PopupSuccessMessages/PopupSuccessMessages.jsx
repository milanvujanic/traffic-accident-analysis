import PropTypes from "prop-types";
import styles from "./PopupSuccessMessages.module.css";
import { useState, useEffect } from "react";

const PopupSuccessMessages = ({ successMessages, setSuccessMessages }) => {
  const [currentSuccessMessage, setCurrentSuccessMessage] =
    useState(successMessages);

  useEffect(() => {
    setCurrentSuccessMessage(successMessages);
  }, [successMessages]);

  const handleHideSuccessMessage = () => {
    setCurrentSuccessMessage("");
    if (setSuccessMessages !== undefined) {
      setSuccessMessages("");
    }
  };

  return (
    currentSuccessMessage && (
      <div className={styles.wrapper}>
        <i
          className={
            currentSuccessMessage !== "Sending email..."
              ? "fa-solid fa-rectangle-xmark"
              : ""
          }
          onClick={() => handleHideSuccessMessage()}
        ></i>

        <div className={styles.successContent}>
          <p
            className={
              currentSuccessMessage
                ? (styles.success, styles.successText)
                : styles.hidden
            }
          >
            {currentSuccessMessage}
          </p>
        </div>
      </div>
    )
  );
};

PopupSuccessMessages.propTypes = {
  successMessages: PropTypes.string,
  setSuccessMessages: PropTypes.func,
};

export default PopupSuccessMessages;
