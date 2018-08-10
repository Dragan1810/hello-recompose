import React from "react";
import ReactDOM from "react-dom";
import { componentFromStream, createEventHandler } from "recompose";
import { map, startWith, tap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import User from "./components/User/index";

import "./styles.css";
import "./observableConfig";

const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler();

  const value$ = stream.pipe(
    map(e => e.target.value),
    startWith("")
  );

  return combineLatest(prop$, value$).pipe(
    map(([props, value]) => (
      <div>
        <input placeholder="GitHub username" onChange={handler} />
        <h2>{props.msg}</h2>
        <User user={value} />
      </div>
    ))
  );
});

const Root = () => {
  return <App msg="hello_World" />;
};

ReactDOM.render(<Root />, document.getElementById("root"));
