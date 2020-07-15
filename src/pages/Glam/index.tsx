import React, { useState } from 'react';
import clsx from 'clsx';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppDrawer from './components/Drawer';
import Overview from './Overview';
import AppToolbar from './components/Toolbar';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core';
import { AuthProvider } from '../../lib/glamAuth';

const MediaItem = React.lazy(() => import('./MediaItem'));
const Settings = React.lazy(() => import('./Settings'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function GlamDashboard() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  let { path, params } = useRouteMatch<{ glamId: string }>();
  return (
    <AuthProvider glamId={params.glamId}>
      <div className={classes.root}>
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
              <Route path={`${path}/settings`} component={Settings} />
            </Switch>
            <Box pt={4}>
              <div>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  align='center'
                >
                  {'An open source project sponsored by '}
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    color='inherit'
                    href='https://wikimedia.org.il/about-us/'
                  >
                    Wikimedia Israel
                  </Link>
                </Typography>
              </div>
              <Box mt={2}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  align='center'
                >
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    color='inherit'
                    href='https://github.com/yonathan06/wikimedia-glam-dashboard'
                  >
                    Open in Github{' '}
                    <GitHubIcon style={{ fontSize: 'inherit' }} />
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </main>
      </div>
    </AuthProvider>
  );
}
