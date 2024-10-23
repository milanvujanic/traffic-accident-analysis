import PropTypes from "prop-types";
import styles from "./PopupErrorMessages.module.css";
import { useState, useEffect } from "react";

const ErrorMessages = ({ errorMessages }) => {
  const [currentErrorMessages, setCurrentErrorMessages] =
    useState(errorMessages);
  let currentProperty = "";
  let propertyChanged = false;

  useEffect(() => {
    setCurrentErrorMessages(errorMessages);
  }, [errorMessages]);

  const handleHideErrorMessages = () => {
    setCurrentErrorMessages(new Map());
  };

  return (
    currentErrorMessages.size > 0 && (
      <div className={styles.wrapper}>
        <i
          className="fa-solid fa-rectangle-xmark"
          onClick={() => handleHideErrorMessages()}
        ></i>
        {Array.from(errorMessages.entries()).map(([property, messages]) => {
          if (currentProperty !== property) {
            currentProperty = property;
            propertyChanged = true;
          } else {
            propertyChanged = false;
          }

          return (
            <div key={property} className={styles.errorContent}>
              <p
                className={
                  propertyChanged
                    ? (styles.error, styles.errorProperty)
                    : styles.hidden
                }
              >
                {property}:
              </p>
              {messages.map((message) => (
                <p
                  key={message}
                  className={
                    messages.length > 0
                      ? property
                        ? (styles.error, styles.errorText)
                        : (styles.error, styles.errorText, styles.noLeftPadding)
                      : styles.hidden
                  }
                >
                  {message}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    )
  );
};

ErrorMessages.propTypes = {
  errorMessages: PropTypes.instanceOf(Map).isRequired,
};

export default ErrorMessages;
