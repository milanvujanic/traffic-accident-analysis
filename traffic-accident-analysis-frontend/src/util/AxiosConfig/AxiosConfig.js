import axios from "axios";
import { ApiConstants } from "../../constants/ApiConstants";
import { HeaderNameConstants } from "../../constants/HttpConstants";
import { LocalStorageConstants } from "../../constants/LocalStorageConstants";
import { ErrorConstants } from "../../constants/ErrorConstants";

const axiosConfig = axios.create({
  baseURL: ApiConstants.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const excludedEndpoints = [
  ApiConstants.SIGNIN,
  ApiConstants.SIGNUP,
  ApiConstants.FORGOT_PASSWORD,
];

axiosConfig.interceptors.request.use(
  (config) => {
    if (excludedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      return config;
    }

    config.headers[HeaderNameConstants.XSRF_TOKEN] = localStorage.getItem(
      LocalStorageConstants.XSRF_TOKEN
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      excludedEndpoints.some((endpoint) => error.config.url.includes(endpoint))
    ) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (
      error.response.data.statusCode === ErrorConstants.CODE_401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await axiosConfig.post(ApiConstants.REFRESH_TOKEN);
      if (res.data) {
        let refreshedCrsfToken = res.headers.get(
          HeaderNameConstants.XSRF_TOKEN
        );
        localStorage.setItem(
          LocalStorageConstants.XSRF_TOKEN,
          refreshedCrsfToken
        );
        return axiosConfig(originalRequest);
      }
      return Promise.reject(error);
    }
  }
);

export default axiosConfig;
