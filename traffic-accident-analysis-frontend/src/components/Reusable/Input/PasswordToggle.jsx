import PropTypes from "prop-types";
import { useState } from "react";

const PasswordToggle = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(<i className="fa-regular fa-eye-slash"></i>);

  const toggleShowPassword = () => {
    let currentShowPassword = !showPassword;
    setShowPassword(currentShowPassword);
    setEyeIcon(
      currentShowPassword ? (
        <i className="fa-regular fa-eye"></i>
      ) : (
        <i className="fa-regular fa-eye-slash"></i>
      )
    );
    onToggle(currentShowPassword ? "text" : "password");
  };

  return <span onClick={toggleShowPassword}>{eyeIcon}</span>;
};

PasswordToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default PasswordToggle;
