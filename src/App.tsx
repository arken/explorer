import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explorer from "./pages/Explorer";
import NotFound from "./pages/404";
import Gallery from "./pages/Gallery";
import { config } from "./explorer_config";

function App() {
  const { basePath } = config;
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            component={() => {
              window.location.href = "https://arken.io"; //This should be generalized
              return null;
            }}
          />
          <Route exact path={basePath}>
            <Explorer />
          </Route>
          <Route path={`${basePath}/:path`}>
            <Gallery />
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
