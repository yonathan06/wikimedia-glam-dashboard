import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ItemsSettings from './ItemsSettings';
import ImportFromCategory from './ImportFromCategory';
import Login from './Login';
import { GlamAuthContext } from '../../../lib/glamAuth';

const Settings = () => {
  const { currentUser } = React.useContext(GlamAuthContext);
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Box mb={3}>
        <Typography variant='h4' component='h4'>
          Settings
        </Typography>
      </Box>
      <Switch>
        <Route exact path={path}>
          {currentUser ? <ItemsSettings /> : <Redirect to={`${url}/login`} />}
        </Route>
        <Route exact path={`${path}/login`}>
          {!currentUser ? <Login /> : <Redirect to={url} />}
        </Route>
        <Route path={`${path}/importcategory`}>
          {currentUser ? (
            <ImportFromCategory />
          ) : (
            <Redirect to={`${url}/login`} />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default Settings;
