import { INITIAL_STATE, actions, reducer } from "."
import Axios from "axios"
import { asyncActionMiddleware } from "redux-infinity-state/build/main/lib/asyncActionMiddleware"
import configureMockStore, { MockStore } from 'redux-mock-store'
import { AnyAction } from "redux"

describe("Test Methods Todos Context", () => {
    const todoText = "Todo Test"

    it("Test AddTodo", () => {

        const initialState = INITIAL_STATE
        const addTodoResult = reducer(initialState, actions.add(todoText))
        const result = addTodoResult.some(todo => todo.text === todoText)

        expect(result).toBeTruthy()
    })

    it("Test removeTodo", () => {

        const todoId = 123456

        const initialState = [
            ...INITIAL_STATE,
            {
                id: todoId,
                text: todoText,
                complete: false
            }
        ]

        const hasTodo = initialState.some(todo => todo.id === todoId)
        expect(hasTodo).toBeTruthy()

        const removeTodoResult = reducer(initialState, actions.remove(todoId))
        const hastTodo = removeTodoResult.some(todo => todo.id === todoId)
        expect(hastTodo).toBeFalsy()
    })

    it("Test toggleTodo", () => {

        const todoId = 654321

        const initialState = [
            ...INITIAL_STATE,
            {
                id: todoId,
                text: todoText,
                complete: false
            }
        ]

        const hasTodo = initialState
            .filter(todo => todo.id === todoId)
            .some(todo => todo.complete)

        expect(hasTodo).toBeFalsy()

        const removeTodoResult = reducer(initialState, actions.toggle(todoId))

        const hastTodo = removeTodoResult
            .filter(todo => todo.id === todoId)
            .some(todo => todo.complete)

        expect(hastTodo).toBeTruthy()
    })



})

const mockAxios = [
    {
        id: 44444,
        text: "Todos Mocked",
        complete: false
    }
]

jest.mock('axios')

describe("Test Services Todos Context", () => {

    const mockedAxios = Axios as jest.Mocked<typeof Axios>

    const middleware = [asyncActionMiddleware]
    const mockStore = configureMockStore(middleware)

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("Test fetchTodos", async () => {

        mockedAxios.get.mockReturnValueOnce(
            Promise.resolve({ data: mockAxios })
        )

        const store: MockStore = mockStore({ ...INITIAL_STATE })
        await store.dispatch(actions.fetch() as AnyAction)

        const expectedActions = [
            actions.fetch,
            actions.success
        ]
        const expectedTypes = expectedActions.map((action: any) => action().type)

        const receivedActions = store.getActions()
        const receivedTypes = receivedActions.map(action => action.type)

        expect(receivedTypes).toEqual(expectedTypes)
        expect(mockAxios).toEqual(receivedActions[1].payload)
    })

    it("Test failureTodos", async () => {

        mockedAxios.get.mockReturnValueOnce(
            Promise.reject({ status: 404 })
        )

        const store: MockStore = mockStore({ ...INITIAL_STATE })
        await store.dispatch(actions.fetch() as AnyAction)

        const expectedActions = [
            actions.fetch,
            actions.failure
        ]
        const expectedTypes = expectedActions.map((action: any) => action().type)

        const receivedTypes = store.getActions().map(action => action.type)

        expect(receivedTypes).toEqual(expectedTypes)
    })

})