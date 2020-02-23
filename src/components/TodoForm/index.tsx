import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/states/todos";

const TodoForm = () => {

    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(actions.add(inputText))
        setInputText('');
    };

    return (
        <>
            <h2>Redux Infinity State</h2>
            <form onSubmit={handleSubmit}>
                <input data-testid="todo-input" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <button data-testid="add-button" type="submit">Novo</button>
                <button data-testid="fetch-button" type="button" onClick={() => dispatch(actions.fetch())}>Async Promise</button>
                <button data-testid="reset-button" type="button" onClick={() => dispatch(actions.reset())}>RESET</button>
            </form>
        </>
    );
}

export default TodoForm;


