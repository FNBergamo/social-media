import React from 'react'

export const USER_EXTRA_DATA_CONTEXT_INITIAL_STATE = {
  userDetails: {},
}

export const UserExtraDataContext = React.createContext(USER_EXTRA_DATA_CONTEXT_INITIAL_STATE)
