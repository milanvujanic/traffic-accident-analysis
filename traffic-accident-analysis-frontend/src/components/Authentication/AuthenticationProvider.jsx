import { useRef, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const user = useRef(null);
    const csrf_token = useRef(localStorage.getItem("xsrf_token") || "");
    const navigator = useNavigate();
    const errorData = useRef({});

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
            const newUser = response.data;
            user.current = newUser;
            csrf_token.current = response.headers.get("xsrf_token");
            localStorage.setItem("xsrf_token", csrf_token.current);
            navigator("/home");
            return;
          }
    
        } catch (error) {
          errorData.current = error.response.data;
        }
    };

    const signoutAction = async () => {
      try {
        const response = await axios
          .post("http://localhost:8080/api/auth/signout");

        if (response.data === "You have been signed out!") {
          user.current = null;
          csrf_token.current = "";
          localStorage.removeItem("xsrf_token");
          navigator("/");
        }
      } catch(error) {
        errorData.current = error.response.data;
      }
    }

    return <AuthenticationContext.Provider value={{ csrf_token, user, signinAction, signoutAction, errorData }}>{children}</AuthenticationContext.Provider>
};

AuthenticationProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AuthenticationProvider;

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
}