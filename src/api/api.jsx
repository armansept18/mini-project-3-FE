import axios from "axios";

const api = axios.create({
  baseURL: "https://api-mini-project-3.nazhifsetya.site/",
});

export default api;
