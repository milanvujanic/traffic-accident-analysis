import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { ApiConstants } from "../../constants/ApiConstants";
import { PathConstants } from "../../constants/PathConstants";
import { HeaderNameConstants } from "../../constants/HeaderConstants";
import { LocalStorageConstants } from "../../constants/LocalStorageConstants";

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  console.log("Rendering AuthienticationProvider...");

  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(
    localStorage.getItem(LocalStorageConstants.XSRF_TOKEN) || ""
  );
  const [errorData, setErrorData] = useState({});

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
        navigate(PathConstants.SIGNOUT);
        return;
      }
    } catch (error) {
      setErrorData(error.response.data);
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
        navigate(PathConstants.SIGNIN);
      }
    } catch (error) {
      setErrorData(error.response.data);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        csrfToken,
        user,
        signinAction,
        signoutAction,
        errorData,
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
