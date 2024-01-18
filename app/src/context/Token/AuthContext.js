import noop from 'lodash/noop'
import React from 'react'

export const AUTH_CONTEXT_INITIAL_STATE = {
  userInfo: {},
  login: noop,
  logout: noop,
  isLogged: false,
}

export const AuthContext = React.createContext(AUTH_CONTEXT_INITIAL_STATE)
