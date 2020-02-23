import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import configureMockStore from 'redux-mock-store'

import React from "react"
import { asyncActionMiddleware } from "redux-infinity-state"
import { Provider } from "react-redux"
import { actions, Todo } from "../../store/states/todos"
import TodoList from "."

const mockState: Array<Todo> = [
    {
        id: 121212,
        text: 'Todo Test',
        complete: false
    }
]

describe("<TodoList/>", () => {
    const middleware = [asyncActionMiddleware]
    const mockStore = configureMockStore(middleware)

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("Should show correct data", () => {

        const store = mockStore({
            todos: mockState
        })

        const { getByText } = render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        )

        expect(getByText('Todo Test')).toBeTruthy()
    })

    it("Should dispatch toggleTodo", () => {

        const store = mockStore({
            todos: mockState
        })

        const { getByTestId } = render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        )

        userEvent.click(getByTestId('toggle-button'))
        const actionExpected = (actions as any).toggle().type
        const actionReceived = store.getActions()[0].type

        expect(actionReceived).toEqual(actionExpected)
    })

    it("Should dispatch removeTodo and remove item", () => {

        const store = mockStore({
            todos: mockState
        })

        const { getByTestId } = render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        )

        userEvent.click(getByTestId('remove-button'))
        const actionExpected = (actions as any).remove().type
        const actionReceived = store.getActions()[0].type

        expect(actionReceived).toEqual(actionExpected)
    })


})