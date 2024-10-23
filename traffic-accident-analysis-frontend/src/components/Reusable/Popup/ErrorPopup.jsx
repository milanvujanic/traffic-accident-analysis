import PropTypes from "prop-types";

const ErrorPopup = ({ content }) => {
  let defaultKey = 1;

  return (
    <div>
      {content.map((record) => (
        <div key={record.property ? record.property : defaultKey++}>
          <p>{record.property ? record.property : ""}</p>
          <ul>
            {record.messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

ErrorPopup.propTypes = {
  content: PropTypes.arrayOf({
    property: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ErrorPopup;
