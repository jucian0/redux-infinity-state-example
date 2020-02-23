
import { createState, Method, Service } from 'redux-infinity-state'
import Axios from 'axios'

export interface User {
  name: string
  email: string
  password: string
  age: number
  phone: string
}

export interface UserState {
  users: Array<User>
  user: User
  error: any
}

export const INITIAL_STATE: UserState = {
  user: {
    name: '',
    email: '',
    password: '',
    age: 0,
    phone: ''
  },
  users: [],
  error: null
}

export type FieldKeys = keyof typeof INITIAL_STATE.user

export type Field = {
  [key: string]: any
}

const setField: Method<UserState, Field> = ({ state, payload }) => ({
  ...state,
  user: {
    ...state.user,
    ...payload
  }
})

const clearForm: Method<UserState> = ({ state }) => ({
  ...state,
  user: {
    ...INITIAL_STATE.user
  }
})

const clearField: Method<UserState, FieldKeys> = ({ state, payload }) => ({
  ...state,
  user: {
    ...state.user,
    [payload]: INITIAL_STATE.user[payload]
  }
})

const submit: Service<UserState> = ({ state }) =>
  Axios.post('your-api.com', state.user)//....


export const { reducer, actions } = createState({
  name: "User",
  state: INITIAL_STATE,
  methods: {
    setField,
    clearForm,
    clearField
  },
  services: {
    submit
  }
})