import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState(localStorage.getItem("csrf_token") || "");
    const navigator = useNavigate();
    const [errorData, setErrorData] = useState({});

    const onSubmit = async (data) => {
        try {
          const response = await axios
            .post("http://localhost:8080/api/auth/signin", 
              {
                username: data.username,
                password: data.password,
              }
            );

          if (response.data) {
            setCsrfToken(response.headers.csrf_token);
            setUser(response.data);
          }

          console.log(response);
          console.log(csrfToken);
    
          navigator("/signup");
        } catch (error) {
          setErrorData(error.response.data);
        }
    };

    return <AuthenticationContext.Provider>{children}</AuthenticationContext.Provider>
};

export default AuthenticationProvider;

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
}