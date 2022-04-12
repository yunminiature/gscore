import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {UsersType, UserType} from './types';
import {addUser} from './actions'

const initialState: UsersType = {
  users: [
    {
      id: 1,
      userName: "noname",
      email: "noname@noname.com",
      password: "12345",
    }
  ]
}

const usersReducer = createReducer<UsersType>(initialState, {
  [addUser.type]: (state, action: PayloadAction<UserType>) => {
    return {
      ...state.users, users: [...state.users,
        {
          id: state.users[state.users.length - 1].id + 1,
          userName: action.payload.userName,
          email: action.payload.email,
          password: action.payload.password
        }
      ]
    }
  }
})

export default usersReducer