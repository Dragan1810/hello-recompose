import React from "react";
import ReactDOM from "react-dom";
import { componentFromStream, createEventHandler } from "recompose";
import { map, startWith, tap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import User from "./User/index";

import "./styles.css";
import "./observableConfig";

const App = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler();

  const value$ = stream.pipe(
    map(e => e.target.value),
    startWith("")
  );

  return combineLatest(prop$, value$).pipe(
    tap(console.warn),
    map(([props, value]) => (
      <div>
        <input placeholder="GitHub username" onChange={handler} />
        <User user={value} />
      </div>
    ))
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
