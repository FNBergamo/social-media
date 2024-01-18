import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('userInfo')))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLogged && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isLogged, navigate, location.pathname])

  function login({ accessToken, refreshToken, userId }) {
    const userInfo = {
      accessToken,
      refreshToken,
      userId,
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    setUserInfo(userInfo)
    setIsLogged(true)
  }

  function logout() {
    localStorage.removeItem('userInfo')
    setIsLogged(false)
  }

  const contextValue = {
    userInfo,
    login,
    logout,
    isLogged,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
