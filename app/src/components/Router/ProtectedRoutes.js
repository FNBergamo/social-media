import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoutes({ element: Component, ...rest }) {
  const { userInfo } = useAuth()

  return userInfo?.userId ? <Outlet /> : <Navigate to='/login' />
}
