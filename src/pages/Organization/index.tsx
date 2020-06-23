import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import OrganizationOverview from "./OrganizationOverview";
import Media from "./Media";

const Organization = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <div className="container mb-4">
        <div className="row align-items-center position-relative">
          <div className="col-md-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Metropolitan_Museum_of_Art_logo.jpg"
              alt="THEMET"
              className="img-fluid"
            />
          </div>
          <div className="col-md-10">
            <h1>
              <Link className="stretched-link" to="/org/met">
                Metropolitan Museum of Art
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <Switch>
        <Route
          exact
          path={`${path}/:orgName`}
          component={OrganizationOverview}
        />
        <Route exact path={`${path}/:orgName/media`} component={Media} />
      </Switch>
    </div>
  );
};

export default Organization;
