import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./styles.css";

const App = () => (
  <Provider store={store}>
    <section>
      <TodoForm />
      <TodoList />
    </section>
  </Provider>
);

export default App;
