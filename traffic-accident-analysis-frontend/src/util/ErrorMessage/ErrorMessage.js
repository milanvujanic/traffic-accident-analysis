import { ErrorConstants } from "../../constants/ErrorConstants";

export const parseErrorMessage = (error) => {
    if (!error.response) {
      return;
    }

    const statusCode = error.response.data.statusCode;
    const errorMessagePayload = error.response.data.message;

    if (statusCode === ErrorConstants.CODE_400) {
      return [...errorMessagePayload];
    }

    return ["Something went wrong..."];
  };