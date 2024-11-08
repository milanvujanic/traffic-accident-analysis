import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";
import { PathConstants } from "../../constants/PathConstants";
import { ApiConstants } from "../../constants/ApiConstants";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordComponentUtil = (state) => {
  console.log("Inside ResetPasswordComponentUtil, token: " + state.token);
  const [errorMessages, setErrorMessages] = useState(new Map());
  const navigator = useNavigate();
  const hanldeResetPassword = async (data) => {
    try {
      await axiosConfig.post(ApiConstants.FORGOT_CHANGE_PASSWORD, {
        password: data.password,
        resetPasswordToken: state.token,
      });
      const successMessages = "Password changed successfully!";
      navigator(PathConstants.SIGNIN, { state : { successMessages }});
    } catch (error) {
      setErrorMessages(parseErrorMessage(error));
      setErrorFieldFocus(error.response.data.messages);
    }
  };

  const setErrorFieldFocus = (errorMessages) => {
    const values = Object.values(errorMessages).flat(Infinity); 
    values.map(value => {
      if (value.includes("Password")) {
        document.getElementById("password").focus();
      } else if (value.includes("Passwords")) {
        document.getElementById("confirmPassword").focus();
      }
    })
  };

  return { errorMessages, hanldeResetPassword };
};

export default ResetPasswordComponentUtil;
