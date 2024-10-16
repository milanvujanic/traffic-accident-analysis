import axios from "axios"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeComponent = () => {

  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
          const response = await axios
          .post("http://localhost:8080/api/home", {},
          {
            signal: controller.signal,
            withCredentials: true,
            headers: {
              "xsrf_token": localStorage.getItem("xsrf_token"),
              "Content-Type": "application/json",
            },
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