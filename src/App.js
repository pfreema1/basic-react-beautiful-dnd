import React, { Component } from "react";
import { createStore } from "redux";
import "./App.css";

const initialState = {};

/**********
 * Reducer
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

let store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

class App extends Component {
  render() {
    return <div>poo</div>;
  }
}

export default App;
