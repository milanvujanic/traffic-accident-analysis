import axios from "axios"
import { useRef, useState, useEffect } from 'react'

const HomeComponent = () => {

  const message = useRef("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
       const response = await axios
            .post("http://localhost:8080/api/home", {}, 
            {
              withCredentials: true,
              headers: {
                "xsrf_token": localStorage.getItem("xsrf_token"),
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data) {
            message.current = response.data.message;
            console.log("messsage.current: " + message.current);
          }

        } catch (error) {
          setError(error.response.data.message);
        }
  }

  useEffect(() => {
    fetchData();
  }, [message]);

  return (
    <div>
        {message.current}
    </div>
  )
}

export default HomeComponent