import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import UserFormWithState from "./components/UserFormWithState";
import UserFormUncontrolled from './components/UserFormUncontrolled'
import "./styles.css";

const App = () => (
  <Provider store={store}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <UserFormWithState />
        </div>
        <div className="col-lg-6 col-md-6">
          <UserFormUncontrolled />
        </div>
      </div>
    </div>
  </Provider>
);

export default App;
