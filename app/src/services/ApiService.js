import axios from 'axios'
import { API_URL } from '../constants/Endpoints'
// import { useAuth } from '../hooks/useAuth'

export function useHttp() {
  // const { accessToken } = useAuth()

  return axios.create({
    baseURL: API_URL,
  })
}

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})
