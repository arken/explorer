import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explorer from "./pages/Explorer";
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
            <Explorer />
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
