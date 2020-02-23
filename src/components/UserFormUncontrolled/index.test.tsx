// import { render, fireEvent } from "@testing-library/react"
// import userEvent from '@testing-library/user-event'
// import configureMockStore from 'redux-mock-store'

// import TodoForm from "."
// import React from "react"
// import { asyncActionMiddleware } from "redux-infinity-state"
// import { Provider } from "react-redux"
// import { appState } from "../../store"
// import { actions } from "../../store/states/user"

// describe("<TodoForm/>", () => {
//     const middleware = [asyncActionMiddleware]
//     const mockStore = configureMockStore(middleware)

//     afterEach(() => {
//         jest.clearAllMocks()
//     })

//     it("Should dispatch addTodo", () => {
//         const store = mockStore(appState)
//         const { getByTestId } = render(
//             <Provider store={store}>
//                 <TodoForm />
//             </Provider>

//         )

//         fireEvent.change(getByTestId('todo-input'), {
//             target: {
//                 value: 'New Todo'
//             }
//         })

//         userEvent.click(getByTestId('add-button'))

//         const actionExpected = (actions as any).add().type
//         const actionReceived = store.getActions()[0].type

//         expect(actionReceived).toEqual(actionExpected)
//     })

//     it("Should dispatch resetTodos", () => {
//         const store = mockStore(appState)
//         const { getByTestId } = render(
//             <Provider store={store}>
//                 <TodoForm />
//             </Provider>

//         )

//         userEvent.click(getByTestId('reset-button'))

//         const actionExpected = (actions as any).reset().type
//         const actionReceived = store.getActions()[0].type

//         expect(actionReceived).toEqual(actionExpected)
//     })

//     it("Should dispatch fetchTodos", () => {
//         const store = mockStore(appState)
//         const { getByTestId } = render(
//             <Provider store={store}>
//                 <TodoForm />
//             </Provider>

//         )

//         userEvent.click(getByTestId('fetch-button'))

//         const actionExpected = (actions as any).fetch().type
//         const actionReceived = store.getActions()[0].type

//         expect(actionReceived).toEqual(actionExpected)
//     })

// })