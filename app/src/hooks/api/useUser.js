import { useMemo } from 'react'
import { useHttp } from '../../services/ApiService'
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT, USER_ENDPOINT } from '../../constants/Endpoints'
import useAxiosPrivate from './useAxiosPrivate'

export function useUser() {
  const http = useHttp()
  const axiosPrivate = useAxiosPrivate()

  async function login({ email, password }) {
    return await http.post(LOGIN_ENDPOINT, { email, password })
  }

  async function register({ name, password, username, email, profilePicture, birthdate }) {
    return await http.post(REGISTER_ENDPOINT, {
      name,
      password,
      username,
      email,
      profilePicture,
      birthdate,
    })
  }

  async function getUser({ id }) {
    return await axiosPrivate.get(`${USER_ENDPOINT}/${id}`)
  }

  return useMemo(
    () => ({
      login,
      register,
      getUser,
    }),
    [],
  )
}
