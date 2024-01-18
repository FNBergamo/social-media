// import { useEffect } from 'react'
// import { axiosPrivate } from '../../services/ApiService'
// import { useAuth } from '../useAuth'

// const useAxiosPrivate = () => {
//   const { userInfo } = useAuth()

//   useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//       (config) => {
//         if (!config.headers['Authorization']) {
//           config.headers['Authorization'] = `Bearer ${userInfo?.accessToken}`
//         }
//         return config
//       },
//       (error) => {
//         Promise.reject(error)
//       },
//     )

//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//           prevRequest.sent = true
//           prevRequest.headers['Authorization'] = `Bearer ${userInfo?.refreshToken}`
//           return axiosPrivate(prevRequest)
//         }
//         return Promise.reject(error)
//       },
//     )

//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept)
//       axiosPrivate.interceptors.response.eject(responseIntercept)
//     }
//   }, [userInfo])

//   return axiosPrivate
// }

// export default useAxiosPrivate

import { useEffect } from 'react'
import { axiosPrivate } from '../../services/ApiService'
import { useAuth } from '../useAuth'
import { useNavigate } from 'react-router-dom'

const useAxiosPrivate = () => {
  const { userInfo, login, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${userInfo?.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          try {
            const refreshed = await axiosPrivate.post('/auth/refresh', {
              refreshToken: userInfo?.refreshToken,
            })
            const { accessToken, refreshToken } = refreshed.data
            login({ accessToken, refreshToken, userId: userInfo.userId })
            prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
            return axiosPrivate(prevRequest)
          } catch (e) {
            console.log('Failed to refresh token:', e)
            logout()
            if (isMounted) {
              navigate('/login')
            }
            return Promise.reject(e)
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      isMounted = false // Atualiza o estado do componente ao desmontar
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [userInfo, navigate, logout])

  return axiosPrivate
}

export default useAxiosPrivate
