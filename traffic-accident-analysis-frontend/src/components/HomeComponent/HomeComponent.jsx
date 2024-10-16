import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosConfig from "../../Util/AxiosConfig";

const HomeComponent = () => {

  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axiosConfig
        .post("/home", {},
          {
            signal: controller.signal,
          },
        );

        if (response.data) {
          setMessage(response.data.message);
        }

      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        }
      }
    }
    fetchData();

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div>
        {message ? message : error.message}
        <button onClick={() => navigate("/signout")}>Go to signout...</button>
    </div>
  )
}

export default HomeComponent