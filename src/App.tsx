import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/explorer"}>
            <Main />
          </Route>
          <Route></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
