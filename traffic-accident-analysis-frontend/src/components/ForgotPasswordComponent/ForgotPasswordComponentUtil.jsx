import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";
import { ApiConstants } from "../../constants/ApiConstants";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { useState } from "react";

const ForgotPasswordComponentUtil = () => {
  const [errorMessages, setErrorMessages] = useState(new Map());
  const [successMessages, setSuccessMessages] = useState("");

  const hanldeForgotPassword = async (data) => {
    try {
      setSuccessMessages("Sending email...");
      const response = await axiosConfig.post(ApiConstants.FORGOT_PASSWORD, {
        email: data.email,
      });
      setSuccessMessages(response.data.message);
    } catch (error) {
      setSuccessMessages("");
      setErrorMessages(parseErrorMessage(error));
      setErrorFieldFocus(error.response.data.messages);
    }
  };

  const setErrorFieldFocus = (errorMessages) => {
    const values = Object.values(errorMessages).flat(Infinity);
    values.map((value) => {
      if (value.includes("email")) {
        document.getElementById("email").focus();
      }
    });
  };

  return [
    successMessages,
    setSuccessMessages,
    errorMessages,
    hanldeForgotPassword,
  ];
};

export default ForgotPasswordComponentUtil;
