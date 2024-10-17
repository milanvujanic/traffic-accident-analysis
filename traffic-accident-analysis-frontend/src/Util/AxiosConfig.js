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

axiosConfig.interceptors.response.use(
    response => {
        console.log(response);
        return response;
    },
    async error => {
        if (excludedEndpoints.some(endpoint => error.config.url.includes(endpoint))) {
            return error;
        }

        const originalRequest = error.config;
        console.log("Error: " + error.response.data);
        if (error.response.data.statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await axiosConfig.post("/auth/refresh-token");
            if (res.data) {
                let refreshedCrsfToken = res.headers.get("xsrf_token");
                localStorage.setItem("xsrf_token", refreshedCrsfToken);
                return axiosConfig(originalRequest);
            }
            return Promise.reject(error);
        }
    }
);

export default axiosConfig;