import axios from "axios"
import { API_URL } from "../constants/Endpoints"

export const ApiService = axios.create({
  baseURL: API_URL,
  // Disabling xsrf cookie validation
  xsrfCookieName: null,
})
