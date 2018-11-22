import React from "react";
import ReactDOM from "react-dom";
import { componentFromStream, createEventHandler } from "recompose";
import { map, startWith, tap, merge, mapTo, scan } from "rxjs/operators";
import { combineLatest } from "rxjs";
import User from "./components/User/index";

import "./styles.css";
import "./observableConfig";

const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler();

  const value$ = stream |> map(e => e.target.value) |> startWith("");

  return (
    combineLatest(prop$, value$)
    |> map(([props, value]) => (
      <div>
        <input placeholder="GitHub username" onChange={handler} />
        <h2>{props.msg}</h2>
        <User user={value} />
      </div>
    ))
  );
});

const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler();
  const { handler: decrement, stream: decrement$ } = createEventHandler();

  const count$ =
    merge(increment$ |> mapTo(1), decrement$ |> mapTo(-1))
    |> startWith(0)
    |> scan((count, n) => count + n, 0);

  return (
    combineLatest(props$, count$)
    |> map(([props, count]) => (
      <div {...props}>
        Count: {count}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    ))
  );
});

// SMisli nesto bolje

const Root = () => {
  return (
    <div>
      <App msg="hello_World" />
      <Counter />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
