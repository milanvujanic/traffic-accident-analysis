import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const excludedEndpoints = ['/auth/signin', '/auth/signup'];

axiosConfig.interceptors.request.use(
    config => {
        if (excludedEndpoints.some(endpoint => config.url.includes(endpoint))) {
            return config;
        }

        config.headers['xsrf_token'] = localStorage.getItem("xsrf_token");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosConfig;