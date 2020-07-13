import React, { useState } from 'react';
import clsx from 'clsx';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useStyles } from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppDrawer from './components/Drawer';
import Overview from './Overview';
import MediaItem from './MediaItem';
import AppToolbar from './components/Toolbar';
import Settings from './Settings';
import ImportFromCategory from './ImportFromCategory';

export default function InstitutionDashboard() {
  const drawerWidth = 240;
  const classes = useStyles({ drawerWidth });
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  let { path } = useRouteMatch();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <AppToolbar
          drawerWidth={drawerWidth}
          isDrawerOpen={isDrawerOpen}
          openDrawer={() => setIsDrawerOpen(true)}
        />
      </AppBar>
      <AppDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        drawerWidth={drawerWidth}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Switch>
            <Route exact path={path} component={Overview} />
            <Route
              exact
              path={`${path}/file/:filePath`}
              component={MediaItem}
            />
            <Route exact path={`${path}/settings`} component={Settings} />
            <Route
              exact
              path={`${path}/settings/importcategory`}
              component={ImportFromCategory}
            />
          </Switch>
          <Box pt={4}>
            <Typography variant='body2' color='textSecondary' align='center'>
              {'Copyright © '}
              <Link color='inherit' href='https://www.wikipedia.org/'>
                Wikimedia GLAM Dashboard
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
}
