import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { ApiConstants } from "../../constants/ApiConstants";
import { PathConstants } from "../../constants/PathConstants";
import { HeaderNameConstants } from "../../constants/HttpConstants";
import { LocalStorageConstants } from "../../constants/LocalStorageConstants";
import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  console.log("Rendering AuthienticationProvider...");

  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(
    localStorage.getItem(LocalStorageConstants.XSRF_TOKEN) || ""
  );
  const [errorMessage, setErrorMessage] = useState([]);

  const navigate = useNavigate();

  const signinAction = async (data) => {
    try {
      const response = await axiosConfig.post(ApiConstants.SIGNIN, {
        username: data.username,
        password: data.password,
      });

      if (response.data) {
        const currentUser = response.data;
        setUser(currentUser);
        const currentCsrfToken = response.headers.get(HeaderNameConstants.XSRF_TOKEN);
        setCsrfToken(currentCsrfToken);
        localStorage.setItem(LocalStorageConstants.XSRF_TOKEN, currentCsrfToken);
        setErrorMessage([]);
        navigate(PathConstants.SIGNOUT);
        return;
      }
    } catch (error) {
      setErrorMessage(parseErrorMessage(error));
    }
  };

  const signoutAction = async () => {
    try {
      const response = await axiosConfig.post(ApiConstants.SIGNOUT);

      if (
        response.data &&
        response.data.message === "You have been signed out!"
      ) {
        const currentUser = null;
        setUser(currentUser);
        const currentCsrfToken = "";
        setCsrfToken(currentCsrfToken);
        localStorage.removeItem(LocalStorageConstants.XSRF_TOKEN);
        setErrorMessage([]);
        navigate(PathConstants.SIGNIN);
      }
    } catch (error) {
      setErrorMessage(parseErrorMessage(error));
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        csrfToken,
        user,
        signinAction,
        signoutAction,
        errorMessage,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthenticationProvider;

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
