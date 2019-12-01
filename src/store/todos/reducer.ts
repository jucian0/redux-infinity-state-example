
import Axios from 'axios'
import {createState, Service, Method} from 'redux-infinity-state'

export interface Todo {
  id: number
  text: string
  complete: boolean
}

export interface Post {
  id: string
  slug: string
}

export type TodosState = Array<Todo>

const INITIAL_STATE: TodosState = []

const add: Method<TodosState, string> = (state, payload) =>
  [
    ...state,
    { id: Math.random(), text: payload, complete: false }
  ]

const toggle: Method<TodosState, number> = (state, payload) =>
  state.map(
    (todo: Todo) =>
      todo.id === payload ? { ...todo, complete: !todo.complete } : todo
  )

const remove: Method<TodosState, number> = (state, payload) =>
  state.filter((todo: Todo) => todo.id !== payload)


const fetchPromise: Service<TodosState, undefined> = (state, payload, dispatch) =>
  Axios.get('http://www.hackintoshworld.com/wp-json/wp/v2/posts')
    .then((resp): Array<Post> =>
      resp.data.filter((item: any) => item.slug !== "macos-10-13-4-update")
    )
    .then(data => dispatch(actions.success(data)))
    .catch(err => dispatch(actions.failure(err.data)))

const success:Method<TodosState, Array<any>> = (state, payload) =>
  [...state, ...payload.map((item: any) => ({
    id: item.id,
    text: item.slug,
    complete: false
  }))]

const failure: Method<TodosState, any> = (state) => state

const reset = () => INITIAL_STATE

export const { actions, reducer } = createState({
  state: INITIAL_STATE,
  name: "todo",
  methods: {
    reset,
    failure,
    success,
    remove,
    add,
    toggle
  },
  services: {
    fetchPromise
  }
})

