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
import GitHubIcon from '@material-ui/icons/GitHub';

export default function GlamDashboard() {
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
            <div>
              <Typography variant='body2' color='textSecondary' align='center'>
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
              <Typography variant='body2' color='textSecondary' align='center'>
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  color='inherit'
                  href='https://github.com/yonathan06/wikimedia-glam-dashboard'
                >
                  Open in Github <GitHubIcon style={{ fontSize: 'inherit' }} />
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
}
