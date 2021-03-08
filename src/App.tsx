import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/404";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            component={() => {
              window.location.href = "https://arken.io";
              return null;
            }}
          />
          <Route exact path={"/explorer"}>
            <Main />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
