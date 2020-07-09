import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import InstitutionDashboard from "./pages/Institution";
import General from "./pages/General";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/glam/met" />
          </Route>
          <Route path="/glam/:glamId" component={InstitutionDashboard} />
          <Route path="/test" component={General} />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
