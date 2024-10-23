import PropTypes from "prop-types";
import styles from "./PopupSuccessMessages.module.css";
import { useState, useEffect } from "react";

const PopupSuccessMessages = ({ successMessage }) => {
  const [currentSuccessMessage, setCurrentSuccessMessage] =
    useState(successMessage);

  useEffect(() => {
    setCurrentSuccessMessage(successMessage);
  }, [successMessage]);

  const handleHideSuccessMessage = () => {
    setCurrentSuccessMessage("");
  };

  return (
    currentSuccessMessage && (
      <div className={styles.wrapper}>
        <i
          className="fa-solid fa-rectangle-xmark"
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
  successMessage: PropTypes.string,
};

export default PopupSuccessMessages;
