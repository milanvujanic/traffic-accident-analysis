import PropTypes from "prop-types";
import { useState } from "react";
import PasswordToggle from "./PasswordToggle";

const FormInput = ({
  type = "text",
  id,
  icon,
  placeholder,
  register,
  errors,
  styles: { formControl, formData, error, hidden },
}) => {
  const isErrorPresent = () => {
    return errors !== undefined && errors.message !== undefined;
  };

  const [inputType, setInputType] = useState(type);

  const handleToggle = (newType) => {
    setInputType(newType);
    document.getElementById("password").focus();
  };

  return (
    <div className={formControl}>
      <div className={formData}>
        <label htmlFor={id}>{icon}</label>
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          {...register}
        />
        {id === "password" && <PasswordToggle onToggle={handleToggle} />}
      </div>
      <p className={isErrorPresent() ? error : hidden}>
        * {isErrorPresent() ? errors.message : ""}
      </p>
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  errors: PropTypes.object,
  styles: PropTypes.object.isRequired,
};

export default FormInput;
