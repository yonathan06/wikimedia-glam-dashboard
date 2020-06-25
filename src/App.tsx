import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import InstitutionDashboard from "./pages/Institution";
import General from "./pages/General";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/inst/met" />
        </Route>
        <Route path="/inst" component={InstitutionDashboard}/>
        <Route path="/test" component={General} />
      </Switch>
    </Router>
  );
}

export default App;
