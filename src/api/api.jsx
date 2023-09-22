import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_api_url,
});

export default api;
