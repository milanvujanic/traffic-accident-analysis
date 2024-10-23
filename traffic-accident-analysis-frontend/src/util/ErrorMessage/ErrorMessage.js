import { ErrorConstants } from "../../constants/ErrorConstants";

export const parseErrorMessage = (error) => {
    if (!error.response) {
      return;
    }

    const statusCode = error.response.data.statusCode;
    const errorMessagePayload = error.response.data.messages;

    const errorMap = new Map();
    if (statusCode === ErrorConstants.CODE_400 || statusCode === ErrorConstants.CODE_401) {
      for (const [value, key] of Object.entries(errorMessagePayload)) {
        errorMap.set(value, key);
      }
    }
    return errorMap;
  };