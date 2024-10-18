import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { PathConstants } from "../../constants/PathConstants";
import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";

const HomeComponent = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axiosConfig.post(
          PathConstants.HOME,
          {},
          {
            signal: controller.signal,
          }
        );

        if (response.data) {
          setMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage(parseErrorMessage(error));
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {
        message 
        ? message
        : errorMessage
        ? errorMessage.map(data => (
          <p key={data}>{data}</p>
        ))
        : ""
      }
      <button onClick={() => navigate(PathConstants.SIGNOUT)}>
        Go to signout...
      </button>
    </div>
  );
};

export default HomeComponent;
