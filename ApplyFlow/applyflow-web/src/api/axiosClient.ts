import axios from "axios";

const response = await fetch("/config.json");
const config = await response.json();

console.log(config.apiBaseUrl);

export const axiosClient = axios.create({
  baseURL: config.apiBaseUrl,
});
