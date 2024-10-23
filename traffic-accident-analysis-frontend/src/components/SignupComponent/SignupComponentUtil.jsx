import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";
import { PathConstants } from "../../constants/PathConstants";
import { ApiConstants } from "../../constants/ApiConstants";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupComponentUtil = () => {
  const [errorMessages, setErrorMessages] = useState(new Map());
  const navigator = useNavigate();
  const hanldeSignup = async (data) => {
    console.log(data);
    try {
      await axiosConfig.post(ApiConstants.SIGNUP, {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: [],
      });
      const successMessage = "You have successfully signed up!";
      navigator(PathConstants.SIGNIN, { state : { successMessage }});
    } catch (error) {
      setErrorMessages(parseErrorMessage(error));
      setErrorFieldFocus(error.response.data.messages);
    }
  };

  const setErrorFieldFocus = (errorMessages) => {
    const values = Object.values(errorMessages).flat(Infinity); 
    values.map(value => {
      if (value.includes("Username")) {
        document.getElementById("username").focus();
      } else if (value.includes("Email")) {
        document.getElementById("email").focus();
      } else if (value.includes("Password")) {
        document.getElementById("password").focus();
      } else if (value.includes("Passwords")) {
        document.getElementById("confirmPassword").focus();
      }
    })
  };

  return { errorMessages, hanldeSignup };
};

export default SignupComponentUtil;
