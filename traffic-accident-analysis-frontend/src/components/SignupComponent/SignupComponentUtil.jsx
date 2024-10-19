import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";
import { PathConstants } from "../../constants/PathConstants";
import { ApiConstants } from "../../constants/ApiConstants";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { useState } from "react";

const SignupComponentUtil = () => {
  const [errorMessage, setErrorMessage] = useState([]);
  const hanldeSignup = async (data) => {
    try {
      await axiosConfig.post(ApiConstants.SIGNUP, {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: [],
      });

      navigator(PathConstants.SIGNIN);
    } catch (error) {
      setErrorMessage(parseErrorMessage(error));
      setErrorFieldFocus(error.response.data.message);
    }
  };

  const setErrorFieldFocus = (errorMessage) => {
    if (errorMessage.includes("Username")) {
      document.getElementById("username").focus();
    } else if (errorMessage.includes("Email")) {
      document.getElementById("email").focus();
    } else if (errorMessage.includes("Password")) {
      document.getElementById("password").focus();
    } else if (errorMessage.includes("Passwords")) {
      document.getElementById("confirmPassword").focus();
    }
  };

  return { errorMessage, hanldeSignup };
};

export default SignupComponentUtil;
