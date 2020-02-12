import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { actions, Todo } from "../../store/states/todos";

const TodoList = () => {

  const todos = useSelector<AppState, Array<Todo>>(state => state.todos);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.complete ? <s>{todo.text}</s> : todo.text}
          <div>
            <button data-testid="toggle-button" onClick={() => dispatch(actions.toggle(todo.id))}>Toggle</button>
            <button data-testid="remove-button" onClick={() => dispatch(actions.remove(todo.id))}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;


