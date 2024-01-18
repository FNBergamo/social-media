import { useContext } from 'react'
import { AuthContext } from '../context/Token/AuthContext'

const useAuth = () => useContext(AuthContext)

export { useAuth }
