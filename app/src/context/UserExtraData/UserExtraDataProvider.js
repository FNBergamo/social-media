import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { UserExtraDataContext } from './UserExtraDataContext'
import { useUser } from '../../hooks/api/useUser'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function UserExtraDataProvider({ children }) {
  const [userDetails, setUserDetails] = useState({})
  const { userInfo } = useAuth()
  const navigate = useNavigate()

  const userHook = useUser()

  useEffect(() => {
    async function getUserDetails() {
      const { data } = await userHook.getUser({ id: userInfo?.userId })
      setUserDetails(data)
    }

    if (userInfo?.userId) {
      getUserDetails()
    } else {
      navigate('/login')
    }
  }, [userHook, userInfo?.userId, navigate])

  const contextValue = {
    userDetails,
  }

  return (
    <UserExtraDataContext.Provider value={contextValue}>{children}</UserExtraDataContext.Provider>
  )
}

UserExtraDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
