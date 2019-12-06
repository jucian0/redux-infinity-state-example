import "./styles.css";
import React,{ useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store";
import {actions} from "./store/todos/reducer";

const TodoList = () => {

  const [inputText, setInputText] = useState('');
  const todos = useSelector((state:AppState) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.add(inputText))
    setInputText('');
  };



  return (
    <section>
      <h2>Redux Infinity State</h2>
      <form onSubmit={handleSubmit}>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="submit">Novo</button>
        <button type="button" onClick={() =>dispatch(actions.fetch())}>Async Promise</button>
        <button type="button" onClick={() =>dispatch(actions.fetchRxjs())}>Async Observable</button>
        <button type="button" onClick={() => dispatch(actions.reset())}>RESET</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.complete ? <s>{todo.text}</s> : todo.text}
            <div>
              <button onClick={() => dispatch(actions.toggle(todo.id))}>Toggle</button>
              <button onClick={() => dispatch(actions.remove(todo.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;


