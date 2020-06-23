import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Organization from "./pages/Organization";
import General from "./pages/General";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/org/met" />
        </Route>
        <Route path="/org" component={Organization}/>
        <Route path="/test" component={General} />
      </Switch>
    </Router>
  );
}

export default App;
