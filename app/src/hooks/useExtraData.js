import { useContext } from 'react'
import { UserExtraDataContext } from '../context/UserExtraData/UserExtraDataContext'

const useExtraData = () => useContext(UserExtraDataContext)

export { useExtraData }
