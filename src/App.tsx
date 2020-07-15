import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlamDashboard from "./pages/Glam";
import { ReactQueryDevtools } from "react-query-devtools";
import CssBaseline from "@material-ui/core/CssBaseline";

const General = React.lazy(() => import('./pages/General')); 

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/glam/met" />
            </Route>
            <Route path="/glam/:glamId" component={GlamDashboard} />
            <Route path="/test" component={General} />
          </Switch>
        </Suspense>
      </Router>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export default App;
