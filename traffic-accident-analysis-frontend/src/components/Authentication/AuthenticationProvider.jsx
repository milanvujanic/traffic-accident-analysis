import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    console.log("Rendering AuthienticationProvider...");

    const [user, setUser] = useState(null);
    let currentUser = user;
    
    const [csrfToken, setCsrfToken] = useState(localStorage.getItem("xsrf_token") || "");
    let currentCsrfToken = csrfToken;

    const [errorData, setErrorData] = useState({});
    let currentErrorData = errorData;

    const navigate = useNavigate();

    const signinAction = async (data) => {
        try {
          const response = await axios
            .post("http://localhost:8080/api/auth/signin", 
              {
                username: data.username,
                password: data.password,
              },
            );

          if (response.data) {
            currentUser = response.data;
            setUser(currentUser);
            currentCsrfToken = response.headers.get("xsrf_token");
            setCsrfToken(currentCsrfToken);
            localStorage.setItem("xsrf_token", currentCsrfToken);
            navigate("/home");
            return;
          }
    
        } catch (error) {
          currentErrorData = error.response.data;
          setErrorData(currentErrorData);
        }
    };

    const signoutAction = async () => {
      try {
        const response = await axios
          .post("http://localhost:8080/api/auth/signout", {},
            {
              withCredentials: true,
              headers: {
                "xsrf_token": localStorage.getItem("xsrf_token"),
                "Content-Type": "application/json",
              }
            });
        console.log(response.data);
        if (response.data 
            && response.data.message === "You have been signed out!") {
          currentUser = null;
          setUser(currentUser);
          currentCsrfToken = "";
          setCsrfToken(currentCsrfToken);
          localStorage.removeItem("xsrf_token");
          console.log(localStorage.getItem("xsrf_token"));
          navigate("/");
        }
      } catch(error) {
          currentErrorData = error.response.data;
          setErrorData(currentErrorData);
      }
    }

    return <AuthenticationContext.Provider 
              value={{ currentCsrfToken, currentUser, signinAction, signoutAction, currentErrorData }}>{children}
            </AuthenticationContext.Provider>
};

AuthenticationProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AuthenticationProvider;

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
}