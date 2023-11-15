import axios from "axios";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

// Before Send Request
apiFetch.interceptors.request.use(
  (request) => {
    request.headers["x-platform"] = "WEB";
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "application/json";
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.headers["x-access-login-application"] = "WEB";

    return request;
  },
  (error) => {
    console.log("errir inside", error);
    return Promise.reject(error);
  }
);

// Before Accept Response
apiFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {}
);
export default apiFetch;
